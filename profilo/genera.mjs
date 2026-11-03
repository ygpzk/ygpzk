// Rifà il profilo: legge GitHub, ridisegna le immagini in immagini/ e riscrive
// nel README.md le parti fra <!-- nome:inizio --> e <!-- nome:fine -->. Il resto
// del README si scrive a mano e qui non si tocca.
//
//   node profilo/genera.mjs          (con GH_TOKEN o GITHUB_TOKEN, se c'è)
//
// Lo lancia la Action «profilo» ogni 15 minuti: se non è cambiato niente, non
// c'è niente da committare.

import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { caricaCaratteri } from './caratteri.mjs'
import { commitRecenti, dettaglio, repository, calendario, automatico } from './github.mjs'
import { testa, tasto, numeri, TEMI } from './svg.mjs'

const LOGIN = 'ygpzk'
const REPO = `${LOGIN}/${LOGIN}`
const SITO = 'https://www.albertopecchini.it'
const radice = new URL('..', import.meta.url)
const percorso = (p) => new URL(p, radice)

// I progetti, a parole mie; un repository nuovo che non è qui compare lo stesso,
// con la descrizione di GitHub.
const PROGETTI = {
  AP: { titolo: 'albertopecchini.it', sito: SITO, cosa: 'il portfolio, **pzkko.it** (il muro con i social, la scena 3D, i giochi, il cercapersone zero e la pzkkopedia) e la parodia **bettercallpekko.it**: siti statici scritti a mano, con Vite e niente framework' },
  rivaltasulmincio: { titolo: 'rivaltasulmincio.it', sito: 'https://www.rivaltasulmincio.it', cosa: 'il sito della Pro Loco di Rivalta sul Mincio: notizie, eventi, fotografie e il borgo nel Parco del Mincio' },
  cascinafontana: { titolo: 'cascinafontana.xyz', sito: 'https://www.cascinafontana.xyz', cosa: 'la Società Agricola Cascina Fontana: i prodotti, la galleria e i contatti' },
  'dariodonelli-': { titolo: 'ing. dario donelli', sito: 'https://dariodonelli.vercel.app', cosa: 'lo studio di ingegneria di Dario Donelli' },
  ygpzk: { titolo: 'questo profilo', sito: `https://github.com/${LOGIN}`, cosa: 'il README che stai leggendo: si riscrive da solo, con le immagini disegnate nei caratteri del sito' },
}

// i tipi dei commit (conventional commits), detti in italiano
const TIPI = {
  feat: ['✨', 'novità'],
  fix: ['🔧', 'riparazione'],
  chore: ['🧹', 'manutenzione'],
  docs: ['📝', 'documenti'],
  style: ['🎨', 'ritocco'],
  refactor: ['♻️', 'riordino'],
  perf: ['⚡', 'più veloce'],
  test: ['🧪', 'prove'],
  build: ['📦', 'build'],
  ci: ['⚙️', 'automazione'],
  revert: ['↩️', 'marcia indietro'],
}

const fuso = { timeZone: 'Europe/Rome' }
const quando = (iso) => new Date(iso).toLocaleString('it-IT', { ...fuso, day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
const data = (iso) => new Date(iso).toLocaleDateString('it-IT', { ...fuso, day: 'numeric', month: 'short', year: 'numeric' })
const giornoCorto = (iso) => new Date(iso).toLocaleDateString('it-IT', { ...fuso, day: 'numeric', month: 'short' })
const oggiISO = () => new Date().toLocaleDateString('sv-SE', fuso) // AAAA-MM-GG
const it = (n) => n.toLocaleString('it-IT')
const pl = (n, uno, tanti) => `${it(n)} ${n === 1 ? uno : tanti}`
const md = (s) => s.replace(/([\\`*_[\]<>|])/g, '\\$1')

/** «feat(tempo): la macchina…» → { tipo, ambito, testo } */
function leggi(titolo) {
  const m = titolo.match(/^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/)
  if (m && TIPI[m[1].toLowerCase()]) return { tipo: m[1].toLowerCase(), ambito: m[2] || '', testo: m[3] }
  return { tipo: '', ambito: '', testo: titolo }
}

/** Il primo paragrafo del corpo del commit, senza le firme. */
function spiegazione(corpo) {
  const p = corpo
    .split(/\n\s*\n/)
    .map((s) => s.replace(/\s*\n\s*/g, ' ').trim())
    .find((s) => s && !/^(Co-Authored-By|Signed-off-by|🤖)/i.test(s))
  if (!p) return ''
  return p.length > 320 ? `${p.slice(0, 317).replace(/\s+\S*$/, '')}…` : p
}

// ── I due commit ────────────────────────────────────────────────────────────

const STATI = {
  modified: { segno: '!', parola: ['modificato', 'modificati'], ordine: 0 },
  changed: { segno: '!', parola: ['modificato', 'modificati'], ordine: 0 },
  added: { segno: '+', parola: ['aggiunto', 'aggiunti'], ordine: 1 },
  copied: { segno: '+', parola: ['aggiunto', 'aggiunti'], ordine: 1 },
  renamed: { segno: '!', parola: ['spostato', 'spostati'], ordine: 2 },
  removed: { segno: '-', parola: ['rimosso', 'rimossi'], ordine: 3 },
}

const cartella = (f) => (f.includes('/') ? f.slice(0, f.lastIndexOf('/') + 1) : './')

function prefissoComune(nomi) {
  let p = nomi[0]?.includes('/') ? cartella(nomi[0]) : ''
  for (const n of nomi) while (p && !n.startsWith(p)) p = p.slice(0, p.slice(0, -1).lastIndexOf('/') + 1)
  return p
}

/** Le righe del blocco ```diff: i file, o la cartella se sono tanti nello stesso posto. */
function righeDiff(files, max = 14) {
  const righe = []
  const perStato = {}
  for (const f of files) (perStato[STATI[f.stato]?.ordine ?? 0] ||= []).push(f)
  for (const k of Object.keys(perStato).sort()) {
    const gruppi = new Map()
    for (const f of perStato[k]) {
      const c = cartella(f.nome)
      if (!gruppi.has(c)) gruppi.set(c, [])
      gruppi.get(c).push(f)
    }
    for (const [c, fs] of gruppi) {
      const s = STATI[fs[0].stato] || STATI.modified
      if (fs.length >= 4) {
        righe.push(`${s.segno} ${c}  (${pl(fs.length, 'file', 'file')} ${s.parola[1]})`)
        continue
      }
      for (const f of fs) {
        const conti = f.piu || f.meno ? `  +${it(f.piu)} −${it(f.meno)}` : ''
        const nome = f.stato === 'renamed' && f.prima ? `${f.prima} → ${f.nome.split('/').pop()}` : f.nome
        righe.push(`${s.segno} ${nome}${conti}`)
      }
    }
  }
  if (righe.length > max) {
    const resto = righe.length - (max - 1)
    return [...righe.slice(0, max - 1), `# … e altre ${it(resto)} righe come queste`]
  }
  return righe
}

/** «~ 2 modificati + 12 aggiunti − 8 rimossi», nell'ordine in cui lo si dice. */
function conto(files) {
  const n = [0, 0, 0, 0]
  for (const f of files) n[(STATI[f.stato] || STATI.modified).ordine]++
  const parole = [STATI.modified, STATI.added, STATI.renamed, STATI.removed].map((s) => s.parola)
  // il primo termine va da sé, gli altri col loro segno: chi toglie fa «−»
  return (
    n
      .map((k, i) => (k ? { k, i } : null))
      .filter(Boolean)
      .map(({ k, i }, j) => `${j ? (i === 3 ? ' − ' : ' + ') : ''}<b>${it(k)}</b> ${parole[i][k === 1 ? 0 : 1]}`)
      .join('') || 'nessun file'
  )
}

function schedaCommit(c, i) {
  const { tipo, ambito, testo } = leggi(c.titolo)
  const [icona, parola] = TIPI[tipo] || ['◆', 'commit']
  const corto = c.sha.slice(0, 7)
  const repoUrl = `https://github.com/${c.repo}`
  const spieg = spiegazione(c.corpo)
  const s = c.stats || { additions: 0, deletions: 0 }
  // la cartella che hanno in comune tutti i file va in testa, una volta sola
  const p = prefissoComune(c.files.flatMap((f) => [f.nome, f.prima].filter(Boolean)))
  const togli = (n) => (n && n.startsWith(p) ? n.slice(p.length) : n)
  const diff = [...(p ? [`@@ ${p} @@`] : []), ...righeDiff(c.files.map((f) => ({ ...f, nome: togli(f.nome), prima: togli(f.prima) })))]
  return [
    `### ${['①', '②', '③'][i] || i + 1}&nbsp; ${md(testo)}`,
    '',
    `${icona} **${parola}**${ambito ? ` in \`${ambito}\`` : ''} · [${c.repo.split('/')[1]}](${repoUrl}) su \`${c.ramo}\` · ${quando(c.data)} · [\`${corto}\`](${c.url})`,
    '',
    spieg ? `${md(spieg)}\n` : '',
    `> **i file:** ${conto(c.files)} &nbsp;·&nbsp; **le righe:** <b>+${it(s.additions)}</b> in più, <b>−${it(s.deletions)}</b> in meno`,
    '',
    '```diff',
    ...diff,
    '```',
  ]
    .filter((r, j, a) => !(r === '' && a[j - 1] === ''))
    .join('\n')
}

// ── Le novità ───────────────────────────────────────────────────────────────

function novita(commits) {
  const feat = commits.filter((c) => leggi(c.titolo).tipo === 'feat').slice(0, 6)
  const settimana = commits.filter((c) => Date.now() - new Date(c.data) < 7 * 864e5)
  const ambiti = {}
  for (const c of settimana) {
    const a = leggi(c.titolo).ambito || c.repo.split('/')[1]
    ambiti[a] = (ambiti[a] || 0) + 1
  }
  const top = Object.entries(ambiti).sort((a, b) => b[1] - a[1]).slice(0, 4)
  const righe = []
  if (settimana.length)
    righe.push(`**negli ultimi 7 giorni** ${pl(settimana.length, 'commit', 'commit')}, soprattutto su ${top.map(([a, n]) => `\`${a}\` (${n})`).join(', ')}.`, '')
  for (const c of feat) {
    const { ambito, testo } = leggi(c.titolo)
    righe.push(`- **${giornoCorto(c.data)}** · ${ambito ? `**${ambito}** — ` : ''}${md(testo)} · [${c.repo.split('/')[1]}↗](${c.url})`)
  }
  return righe.join('\n') || '_niente di nuovo, per ora._'
}

// ── Il cantiere ─────────────────────────────────────────────────────────────

function cantiere(repos) {
  const righe = ['| progetto | cos’è | ultimo push |', '|:--|:--|--:|']
  const ordinati = [...repos].sort((a, b) => (a.nome === LOGIN) - (b.nome === LOGIN) || new Date(b.push) - new Date(a.push))
  for (const r of ordinati) {
    const p = PROGETTI[r.nome]
    const titolo = p ? `**[${p.titolo}](${p.sito})**` : `**${md(r.nome)}**`
    const cosa = p ? p.cosa : md(r.descrizione || '—')
    righe.push(`| ${titolo}<br><sub>[${r.completo}](${r.url})</sub> | ${cosa} | ${data(r.push)} |`)
  }
  return righe.join('\n')
}

// ── I numeri ────────────────────────────────────────────────────────────────

function calcolaNumeri(cal, repos, lingue) {
  const giorni = cal.giorni.filter((d) => d.data <= oggiISO())
  // la serie: un giorno senza contributi la spezza, ma oggi conta solo se c'è già qualcosa
  let attuale = 0
  for (let i = giorni.length - 1; i >= 0; i--) {
    if (giorni[i].n) attuale++
    else if (i === giorni.length - 1) continue
    else break
  }
  let record = 0
  let run = 0
  for (const d of giorni) record = Math.max(record, (run = d.n ? run + 1 : 0))
  const top = giorni.reduce((m, d) => (d.n > m.n ? d : m), { n: 0, data: giorni.at(-1)?.data })
  const pubblici = repos.length
  const stelle = repos.reduce((s, r) => s + r.stelle, 0)
  const breve = (iso) => iso.split('-').reverse().map(Number).join('.')
  return {
    oggi: oggiISO(),
    cifre: [
      { valore: it(cal.totale), etichetta: 'contributi', nota: `dal ${breve(giorni[0]?.data || oggiISO())}` },
      { valore: it(attuale), etichetta: attuale === 1 ? 'giorno di fila' : 'giorni di fila', nota: `il record è ${pl(record, 'giorno', 'giorni')}`, accento: true },
      { valore: it(top.n), etichetta: 'in un giorno solo', nota: `il ${breve(top.data)}` },
      { valore: it(pubblici), etichetta: 'repository', nota: `${pl(stelle, 'stella', 'stelle')} · ${it(cal.giorni.filter((d) => d.n).length)} giorni attivi` },
    ],
    trenta: giorni.slice(-30),
    lingue: Object.entries(lingue).map(([nome, byte]) => ({ nome, byte })).sort((a, b) => b.byte - a.byte),
  }
}

// ── Il README ───────────────────────────────────────────────────────────────

const impronta = (s) => createHash('sha1').update(s).digest('hex').slice(0, 8)

function scrivi(nome, svg) {
  mkdirSync(percorso('immagini/'), { recursive: true })
  writeFileSync(percorso(`immagini/${nome}`), svg)
  return `immagini/${nome}?v=${impronta(svg)}`
}

/**
 * L'hero contiene l'aragosta (immagini webp dentro l'SVG): raw.githubusercontent
 * le blocca, perché la sua Content-Security-Policy non ammette `img-src data:`.
 * Da jsDelivr invece GitHub la fa passare per camo, che le ammette. L'indirizzo
 * punta al commit in cui l'hero è cambiato l'ultima volta, così non invecchia
 * nelle cache; finché l'hero nuovo non è in un commit resta quello di prima, e
 * il giro dopo lo aggiorna.
 */
function urlTesta(file) {
  try {
    const sha = execFileSync('git', ['log', '-1', '--format=%H', '--', `immagini/${file}`], { cwd: radice, encoding: 'utf8' }).trim()
    if (sha) return `https://cdn.jsdelivr.net/gh/${REPO}@${sha.slice(0, 12)}/immagini/${file}`
  } catch {}
  return `immagini/${file}`
}

const picture = (chiaro, scuro, alt, attrs = '') =>
  `<picture><source media="(prefers-color-scheme: dark)" srcset="${scuro}"><img src="${chiaro}" alt="${alt}" ${attrs}></picture>`

function sostituisci(readme, nome, contenuto) {
  const re = new RegExp(`(<!-- ${nome}:inizio -->)[\\s\\S]*?(<!-- ${nome}:fine -->)`)
  if (!re.test(readme)) throw new Error(`nel README manca il segno <!-- ${nome}:inizio -->`)
  return readme.replace(re, `$1\n${contenuto}\n$2`)
}

async function main() {
  await caricaCaratteri()
  const [tutti, { repos, lingue }, cal] = await Promise.all([commitRecenti(LOGIN), repository(LOGIN), calendario(LOGIN)])
  const miei = tutti.filter((c) => !automatico(c))
  const due = await Promise.all(miei.slice(0, 2).map(dettaglio))

  // le immagini
  for (const t of Object.keys(TEMI)) scrivi(`testa-${t}.svg`, testa(t).svg)
  const TASTI = [
    { id: 'sito', testo: 'albertopecchini.it', url: SITO, pieno: true },
    { id: 'pzkko', testo: 'pzkko.it', url: 'https://www.pzkko.it' },
    { id: 'wiki', testo: 'pzkkopedia', url: 'https://www.pzkko.it/wiki/' },
    { id: 'scrivimi', testo: 'scrivimi', url: 'mailto:pzkko@yahoo.com' },
  ]
  const tasti = TASTI.map((k) => {
    const [chiaro, scuro] = ['chiaro', 'scuro'].map((t) => scrivi(`tasto-${k.id}-${t}.svg`, tasto(t, k.testo, { pieno: k.pieno })))
    return `<a href="${k.url}">${picture(chiaro, scuro, k.testo, 'height="46"')}</a>`
  })
  const n = calcolaNumeri(cal, repos, lingue)
  const [numChiaro, numScuro] = ['chiaro', 'scuro'].map((t) => scrivi(`numeri-${t}.svg`, numeri(t, n)))

  // il README
  let readme = readFileSync(percorso('README.md'), 'utf8')
  readme = sostituisci(readme, 'testa', `<a href="${SITO}">${picture(urlTesta('testa-chiaro.svg'), urlTesta('testa-scuro.svg'), 'alberto pecchini — siti scritti a mano, un commit alla volta', 'width="100%"')}</a>`)
  readme = sostituisci(readme, 'tasti', `<p align="center">\n  ${tasti.join('\n  ')}\n</p>`)
  readme = sostituisci(readme, 'commit', due.length ? due.map(schedaCommit).join('\n\n') : '_ancora nessun commit da mostrare._')
  readme = sostituisci(readme, 'novita', novita(miei))
  readme = sostituisci(readme, 'cantiere', cantiere(repos))
  readme = sostituisci(readme, 'numeri', picture(numChiaro, numScuro, `i numeri: ${n.cifre.map((s) => `${s.valore} ${s.etichetta}`).join(', ')}`, 'width="100%"'))
  readme = sostituisci(readme, 'piede', `<sub>ultimo commit letto: <a href="${due[0]?.url || '#'}"><code>${due[0]?.sha.slice(0, 7) || '—'}</code></a> del ${due[0] ? quando(due[0].data) : '—'} · il profilo si rifà da solo ogni 15 minuti</sub>`)
  writeFileSync(percorso('README.md'), readme)

  console.log(`profilo rifatto: ${due.map((c) => c.sha.slice(0, 7)).join(', ')} · ${n.cifre.map((s) => `${s.valore} ${s.etichetta}`).join(' · ')}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
