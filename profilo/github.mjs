// Cosa succede su GitHub: gli ultimi commit (da tutti i repository e da tutti i
// rami in cui Alberto ha fatto push di recente), i repository, i linguaggi e il
// calendario dei contributi. Basta il GITHUB_TOKEN della Action: è tutto pubblico.

const API = 'https://api.github.com'
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || ''

async function gh(path, { optional = false } = {}) {
  const res = await fetch(path.startsWith('http') ? path : API + path, {
    headers: {
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
      'user-agent': 'ygpzk-profilo',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) {
    if (optional) return null
    throw new Error(`GitHub ${res.status} su ${path}: ${(await res.text()).slice(0, 200)}`)
  }
  return res.json()
}

async function graphql(query, variables) {
  if (!token) return null
  const res = await fetch(`${API}/graphql`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'ygpzk-profilo' },
    body: JSON.stringify({ query, variables }),
  })
  const json = await res.json().catch(() => null)
  if (!res.ok || !json || json.errors) {
    console.warn('graphql non è andato:', res.status, JSON.stringify(json?.errors || '').slice(0, 300))
    return null
  }
  return json.data
}

// I commit che non contano come «cosa ho cambiato»: le catture dei siti, che una
// Action rifà ogni ora, e i giri di questo stesso profilo.
export const automatico = (c) =>
  /^Catture aggiornate/i.test(c.titolo) || /^profilo:/i.test(c.titolo) || /\[bot\]$/.test(c.autore || '')

/** I commit recenti di `login`, dal più nuovo, senza merge né doppioni. */
export async function commitRecenti(login, { quanti = 200 } = {}) {
  const events = []
  for (let page = 1; page <= 3; page++) {
    const batch = await gh(`/users/${login}/events/public?per_page=100&page=${page}`, { optional: true })
    if (!batch?.length) break
    events.push(...batch)
    if (batch.length < 100) break
  }

  // ogni ramo in cui c'è stato un push, una volta sola, nell'ordine dei push
  const rami = []
  const visti = new Set()
  for (const e of events) {
    if (e.type !== 'PushEvent' || !e.payload?.ref?.startsWith('refs/heads/')) continue
    const repo = e.repo.name
    const ramo = e.payload.ref.slice('refs/heads/'.length)
    const k = `${repo}@${ramo}`
    if (visti.has(k)) continue
    visti.add(k)
    rami.push({ repo, ramo })
  }

  // se gli eventi sono vuoti (90 giorni senza push) si guarda il ramo principale dei repository
  if (!rami.length) {
    const repos = (await gh(`/users/${login}/repos?per_page=100&sort=pushed`)) || []
    for (const r of repos.filter((r) => !r.fork).slice(0, 5)) rami.push({ repo: r.full_name, ramo: r.default_branch })
  }

  const commits = new Map()
  for (const { repo, ramo } of rami.slice(0, 12)) {
    const list = await gh(`/repos/${repo}/commits?sha=${encodeURIComponent(ramo)}&per_page=100`, { optional: true })
    for (const c of list || []) {
      const mio = [c.author?.login, c.committer?.login].some((l) => l?.toLowerCase() === login.toLowerCase())
      if (!mio || c.parents.length > 1 || commits.has(c.sha)) continue
      const [titolo, ...resto] = c.commit.message.split('\n')
      commits.set(c.sha, {
        sha: c.sha,
        repo,
        ramo,
        titolo: titolo.trim(),
        corpo: resto.join('\n').trim(),
        data: c.commit.committer?.date || c.commit.author?.date,
        autore: c.author?.login || c.commit.author?.name,
        url: c.html_url,
      })
    }
  }
  return [...commits.values()].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, quanti)
}

/** I file di un commit, con lo stato (added/modified/removed/renamed) e le righe. */
export async function dettaglio(c) {
  const files = []
  let stats = null
  for (let page = 1; page <= 10; page++) {
    const d = await gh(`/repos/${c.repo}/commits/${c.sha}?per_page=300&page=${page}`)
    stats ||= d.stats
    files.push(...(d.files || []))
    if (!d.files || d.files.length < 300) break
  }
  return {
    ...c,
    stats,
    files: files.map((f) => ({ nome: f.filename, prima: f.previous_filename, stato: f.status, piu: f.additions, meno: f.deletions })),
  }
}

/** I repository pubblici (senza fork) e i loro linguaggi, in byte. */
export async function repository(login) {
  const repos = ((await gh(`/users/${login}/repos?per_page=100&sort=pushed`)) || []).filter((r) => !r.fork && !r.archived)
  const lingue = {}
  for (const r of repos) {
    if (r.name.toLowerCase() === login.toLowerCase()) continue // il profilo non fa testo
    const l = (await gh(`/repos/${r.full_name}/languages`, { optional: true })) || {}
    for (const [k, v] of Object.entries(l)) lingue[k] = (lingue[k] || 0) + v
  }
  return {
    repos: repos.map((r) => ({
      nome: r.name,
      completo: r.full_name,
      descrizione: r.description || '',
      sito: r.homepage || '',
      lingua: r.language || '',
      stelle: r.stargazers_count,
      push: r.pushed_at,
      url: r.html_url,
      ramo: r.default_branch,
    })),
    lingue,
  }
}

/**
 * Il calendario dei contributi dell'ultimo anno: con il token da GraphQL, se no
 * dalla pagina pubblica dei contributi (la stessa che GitHub mostra nel profilo).
 */
export async function calendario(login) {
  const data = await graphql(
    `query($login: String!) { user(login: $login) { createdAt followers { totalCount }
      contributionsCollection { totalCommitContributions restrictedContributionsCount
        contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } } } } }`,
    { login },
  )
  const u = data?.user
  if (u) {
    const giorni = u.contributionsCollection.contributionCalendar.weeks.flatMap((w) => w.contributionDays).map((d) => ({ data: d.date, n: d.contributionCount }))
    return { giorni, totale: u.contributionsCollection.contributionCalendar.totalContributions, commit: u.contributionsCollection.totalCommitContributions, follower: u.followers.totalCount, dal: u.createdAt }
  }

  const html = await (await fetch(`https://github.com/users/${login}/contributions`, { headers: { 'user-agent': 'ygpzk-profilo' } })).text()
  const conti = {}
  for (const m of html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = m[2].match(/^(\d[\d,.]*|No) contribution/)
    if (n) conti[m[1]] = n[1] === 'No' ? 0 : parseInt(n[1].replace(/[,.]/g, ''), 10)
  }
  const giorni = [...html.matchAll(/<td[^>]*data-date="(\d{4}-\d\d-\d\d)"[^>]*id="([^"]+)"[^>]*>/g)]
    .map((m) => ({ data: m[1], n: conti[m[2]] ?? 0 }))
    .sort((a, b) => a.data.localeCompare(b.data))
  return { giorni, totale: giorni.reduce((s, d) => s + d.n, 0), commit: null, follower: null, dal: null }
}
