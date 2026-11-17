// Le due schede nuove: pzkko su Discord, dal vivo, e quando lavora alberto.
// Stesso vestito delle altre immagini (svg.mjs): testo in tracciati, due temi.

import { tipografo, pulisci } from './caratteri.mjs'
import { TEMI, doc, EASE, giorno } from './svg.mjs'

// ── Il testo che va a capo ──────────────────────────────────────────────────

function tronca(tp, key, text, size, maxW) {
  if (tp.misura(key, text, size) <= maxW) return text
  let t = text.replace(/…$/, '')
  while (t && tp.misura(key, `${t}…`, size) > maxW) t = t.slice(0, -1)
  return `${t.trimEnd()}…`
}

/** Le righe di un testo largo al massimo `maxW`; se avanza, l'ultima finisce con «…». */
function aCapo(tp, key, text, size, maxW, maxRighe = 2) {
  const righe = []
  let r = ''
  for (const w of text.split(' ')) {
    const t = r ? `${r} ${w}` : w
    if (!r || tp.misura(key, t, size) <= maxW) r = t
    else {
      righe.push(r)
      r = w
    }
  }
  if (r) righe.push(r)
  if (righe.length <= maxRighe) return righe.map((x) => tronca(tp, key, x, size, maxW))
  const tenute = righe.slice(0, maxRighe)
  tenute[maxRighe - 1] = tronca(tp, key, `${tenute[maxRighe - 1]}…`, size, maxW)
  return tenute
}

// ── pzkko su Discord ────────────────────────────────────────────────────────

/** Due colori mescolati: `t` è quanto pesa il secondo. */
function mescola(a, b, t) {
  const x = parseInt(a.slice(1), 16)
  const y = parseInt(b.slice(1), 16)
  return `#${[16, 8, 0].map((s) => Math.round(((x >> s) & 255) * (1 - t) + ((y >> s) & 255) * t).toString(16).padStart(2, '0')).join('')}`
}

// il velo che Discord stende sui colori del tema: bianco all'80% nel tema chiaro,
// nero al 60% in quello scuro
const DISCORD = {
  chiaro: { velo: '#ffffff', forza: 0.8, fg: '#11140f', muted: '#4c5248', box: 'rgba(255,255,255,.55)', riga: 'rgba(17,20,15,.1)', bolla: '#fbfdf2' },
  scuro: { velo: '#000000', forza: 0.6, fg: '#f2f3f5', muted: '#b5bac1', box: 'rgba(0,0,0,.3)', riga: 'rgba(255,255,255,.1)', bolla: '#1d1f1a' },
}
const STATI_DC = { online: ['#23a55a', 'online'], idle: ['#f0b232', 'inattivo'], dnd: ['#f23f43', 'non disturbare'], offline: ['#80848e', 'offline'] }
const ATTIVITA = { 0: 'sta giocando a', 1: 'in diretta', 3: 'sta guardando', 5: 'in gara a' }
const COLLEGAMENTI = { domain: 'sito', github: 'github', steam: 'steam', twitch: 'twitch', spotify: 'spotify', youtube: 'youtube', instagram: 'instagram', tiktok: 'tiktok', reddit: 'reddit', twitter: 'x', xbox: 'xbox', playstation: 'playstation', battlenet: 'battle.net', riotgames: 'riot' }

/** Un cristallo a sei facce che cresce da (x, y) verso l'alto, ruotato di `a` gradi. */
function cristallo(x, y, w, h, a, grad, i) {
  const f = (n) => n.toFixed(1)
  const pts = [[-w / 2, 0], [-w / 2, -h * 0.72], [0, -h], [w / 2, -h * 0.72], [w / 2, 0]].map(([px, py]) => `${f(px)},${f(py)}`).join(' ')
  return `<g transform="translate(${x} ${y}) rotate(${a})"><g class="cr" style="--i:${i}"><polygon points="${pts}" fill="url(#${grad})" stroke="rgba(255,255,255,.7)" stroke-width="1.4" stroke-linejoin="round"/><path d="M0 ${f(-h)}V0M${f(-w / 2)} ${f(-h * 0.72)}L0 ${f(-h * 0.45)}L${f(w / 2)} ${f(-h * 0.72)}" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.1"/></g></g>`
}

/** Una stellina a quattro punte. */
function stellina(x, y, r, i, colore) {
  const k = r * 0.12
  return `<g transform="translate(${x} ${y})"><path class="st" style="--i:${i}" d="M0 ${-r}C${k} ${-k} ${k} ${-k} ${r} 0C${k} ${k} ${k} ${k} 0 ${r}C${-k} ${k} ${-k} ${k} ${-r} 0C${-k} ${-k} ${-k} ${-k} 0 ${-r}Z" fill="${colore}"/></g>`
}

/**
 * La scheda di pzkko come il suo profilo Discord: il tema (#ccff00 → #9d00ff
 * sotto il velo di Discord), il banner, l'avatar con lo stato, lo stato
 * personalizzato nella nuvoletta, la targhetta del server, i badge, cosa sta
 * facendo e quattro numeri. Sopra, i cristalli verdi del suo effetto del
 * profilo, ridisegnati qui. Niente ore né secondi, così l'immagine cambia solo
 * quando cambia davvero qualcosa.
 */
export function discordCard(nome, d) {
  const c = DISCORD[nome]
  const tp = tipografo('d')
  const W = 1200
  const TOP = 56 // lo spazio sopra la scheda, per i cristalli
  const H = 700 + TOP
  const R = 28
  const [p1, p2] = d.tema
  const alto = mescola(p1, c.velo, c.forza)
  const basso = mescola(p2, c.velo, c.forza)
  const u = `dc${nome[0]}`
  const out = []
  const card = (y) => y + TOP

  // ── il banner ──
  const BH = 250
  out.push(
    d.banner
      ? `<image href="${d.banner}" x="0" y="${TOP}" width="${W}" height="${BH}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${u}-card)"/>`
      : `<rect x="0" y="${TOP}" width="${W}" height="${BH}" fill="url(#${u}-tema)" clip-path="url(#${u}-card)"/>`,
  )

  // ── l'avatar, con l'anello del colore della scheda e lo stato ──
  const ax = 150
  const ay = card(BH)
  const ar = 88
  const anello = mescola(alto, basso, BH / 700)
  out.push(`<circle cx="${ax}" cy="${ay}" r="${ar + 10}" fill="${anello}"/>`)
  out.push(d.avatar ? `<image href="${d.avatar}" x="${ax - ar}" y="${ay - ar}" width="${ar * 2}" height="${ar * 2}" clip-path="url(#${u}-av)"/>` : `<circle cx="${ax}" cy="${ay}" r="${ar}" fill="${p1}"/>`)
  const [colStato, parolaStato] = STATI_DC[d.stato] || STATI_DC.offline
  const sx = +(ax + ar * 0.72).toFixed(1)
  const sy = +(ay + ar * 0.72).toFixed(1)
  out.push(`<circle cx="${sx}" cy="${sy}" r="25" fill="${anello}"/><circle cx="${sx}" cy="${sy}" r="17" fill="${colStato}"/>`)
  if (d.stato === 'idle') out.push(`<circle cx="${sx - 7}" cy="${sy - 7}" r="10" fill="${anello}"/>`)
  if (d.stato === 'dnd') out.push(`<rect x="${sx - 10}" y="${sy - 3.5}" width="20" height="7" rx="3.5" fill="${anello}"/>`)
  if (d.stato === 'offline') out.push(`<circle cx="${sx}" cy="${sy}" r="8" fill="${anello}"/>`)

  // ── lo stato personalizzato, nella nuvoletta ──
  const personale = d.personale ? pulisci('sans', d.personale.testo) : ''
  if (personale) {
    const bx = 300
    const by = card(266)
    const righe = aCapo(tp, 'sans', personale, 21, 500, 2)
    const bw = Math.max(...righe.map((r) => tp.misura('sans', r, 21))) + 44
    const bh = 26 + righe.length * 29
    out.push(`<circle cx="${bx - 34}" cy="${by + 18}" r="6" fill="${c.bolla}"/><circle cx="${bx - 16}" cy="${by + 6}" r="10" fill="${c.bolla}"/>`)
    out.push(`<rect x="${bx}" y="${by - 12}" width="${bw.toFixed(1)}" height="${bh}" rx="22" fill="${c.bolla}"/>`)
    righe.forEach((r, i) => out.push(tp.riga('sans', r, 21, { x: bx + 22, y: by + 20 + i * 29, fill: c.fg }).svg))
  }

  // ── il nome, l'utente, la targhetta, i badge ──
  const nx = 56
  out.push(tp.riga('discord', pulisci('discord', d.nome) || d.utente, 80, { x: nx, y: card(424), fill: c.fg }).svg)
  const ut = tp.riga('sans', d.utente, 21, { x: nx, y: card(466), fill: c.muted })
  out.push(ut.svg)
  if (d.tag) {
    const tx = nx + ut.width + 16
    const tw = tp.misura('mono', d.tag.testo, 15) + (d.tag.img ? 46 : 22)
    out.push(`<rect x="${tx.toFixed(1)}" y="${card(444)}" width="${tw.toFixed(1)}" height="30" rx="8" fill="${c.box}" stroke="${c.riga}"/>`)
    if (d.tag.img) out.push(`<image href="${d.tag.img}" x="${(tx + 9).toFixed(1)}" y="${card(450)}" width="18" height="18"/>`)
    out.push(tp.riga('mono', d.tag.testo, 15, { x: tx + (d.tag.img ? 34 : 11), y: card(464), fill: c.fg }).svg)
  }
  if (d.badge.length) {
    const bw = d.badge.length * 42 + 14
    out.push(`<rect x="${nx}" y="${card(490)}" width="${bw}" height="46" rx="12" fill="${c.box}" stroke="${c.riga}"/>`)
    d.badge.forEach((b, i) => out.push(`<image href="${b.img}" x="${nx + 12 + i * 42}" y="${card(498)}" width="30" height="30"/>`))
  }

  // ── su discord dal… e i collegamenti, sotto il banner a destra ──
  const dal = new Date(`${d.dal}T12:00:00Z`).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
  out.push(tp.riga('mono', 'su discord dal', 14, { x: W - 56, y: card(290), anchor: 'end', fill: c.muted }).svg)
  out.push(tp.riga('sansForte', dal, 22, { x: W - 56, y: card(320), anchor: 'end', fill: c.fg }).svg)

  // ── cosa sta facendo ──
  const bx0 = 640
  const by0 = card(366)
  const bw0 = W - 56 - bx0
  out.push(`<rect x="${bx0}" y="${by0}" width="${bw0}" height="170" rx="18" fill="${c.box}" stroke="${c.riga}"/>`)
  const testa = (t) => tp.riga('mono', t, 14, { x: bx0 + 22, y: by0 + 32, fill: c.muted }).svg
  const quadro = (img, x, y, s) => (img ? `<image href="${img}" x="${x}" y="${y}" width="${s}" height="${s}" clip-path="url(#${u}-q)"/>` : `<rect x="${x}" y="${y}" width="${s}" height="${s}" rx="10" fill="${c.riga}"/>`)
  const testi = (righe) =>
    righe.filter(Boolean).forEach(([t, key, size, fill], i) => out.push(tp.riga(key, tronca(tp, key, pulisci(key, t), size, bw0 - 150), size, { x: bx0 + 130, y: by0 + 78 + i * 30, fill }).svg))
  if (d.spotify) {
    out.push(testa('sta ascoltando spotify'))
    out.push(quadro(d.spotify.img, bx0 + 22, by0 + 52, 90))
    testi([[d.spotify.canzone, 'sansForte', 22, c.fg], [`di ${d.spotify.artista}`, 'sans', 18, c.muted], [`in ${d.spotify.album}`, 'sans', 18, c.muted]])
  } else if (d.gioco) {
    out.push(testa(ATTIVITA[d.gioco.tipo] || 'sta facendo'))
    out.push(quadro(d.gioco.img, bx0 + 22, by0 + 52, 90))
    testi([[d.gioco.nome, 'sansForte', 22, c.fg], d.gioco.dettagli && [d.gioco.dettagli, 'sans', 18, c.muted], d.gioco.stato && [d.gioco.stato, 'sans', 18, c.muted]])
  } else {
    out.push(testa('adesso'))
    out.push(`<circle cx="${bx0 + 32}" cy="${by0 + 84}" r="9" fill="${colStato}"/>`)
    out.push(tp.riga('sansForte', parolaStato, 24, { x: bx0 + 52, y: by0 + 92, fill: c.fg }).svg)
    out.push(tp.riga('sans', d.dove.length ? `su ${d.dove.join(' e ')}, nessuna attività in corso` : 'nessuna attività in corso', 18, { x: bx0 + 22, y: by0 + 132, fill: c.muted }).svg)
  }

  // ── i numeri di pzkko ──
  out.push(`<path d="M56 ${card(568)}H${W - 56}" stroke="${c.riga}"/>`)
  const anni = Math.floor((Date.now() - new Date(d.dal)) / (365.2425 * 864e5))
  const cifre = [
    [String(anni), anni === 1 ? 'anno su discord' : 'anni su discord'],
    [String(d.badge.length), 'badge'],
    [String(d.collegamenti.length), d.collegamenti.length === 1 ? 'collegamento' : 'collegamenti'],
    [parolaStato, d.dove.length ? `adesso, su ${d.dove[0]}` : 'adesso'],
  ]
  const col = (W - 112) / 4
  cifre.forEach(([v, et], i) => {
    const x = 56 + i * col
    const dot = i === 3 ? `<circle cx="${x + 12}" cy="${card(622)}" r="10" fill="${colStato}"/>` : ''
    out.push(`<g class="su" style="--i:${i}">${dot}${tp.riga('discord', v, 58, { x: i === 3 ? x + 32 : x, y: card(642), fill: c.fg }).svg}${tp.riga('sans', et, 19, { x, y: card(676), fill: c.muted }).svg}</g>`)
    if (i) out.push(`<path d="M${(x - 20).toFixed(1)} ${card(594)}V${card(680)}" stroke="${c.riga}"/>`)
  })
  const coll = d.collegamenti.map((k) => `${COLLEGAMENTI[k.tipo] || k.tipo} ${k.nome}`).join(' · ')
  if (coll) out.push(tp.riga('mono', tronca(tp, 'mono', coll, 13, 540), 13, { x: W - 56, y: card(346), anchor: 'end', fill: c.muted }).svg)

  // ── l'effetto: cristalli verdi sul bordo in alto, e qualche stellina ──
  const cristalli = [
    [250, 34, 70, -16], [290, 26, 96, -6], [330, 22, 60, 14],
    [520, 30, 84, -12], [566, 40, 132, -3], [612, 32, 104, 9], [652, 24, 66, 22],
    [880, 26, 78, -10], [918, 34, 112, 4], [958, 22, 58, 18],
    [1110, 22, 64, -8], [1140, 18, 46, 14],
  ]
  const crist = cristalli.map(([x, w, h, a], i) => cristallo(x, TOP + 10, w, h, a, `${u}-cr`, i)).join('')
  const stelle = [[420, TOP - 20, 9], [760, TOP + 26, 12], [1040, TOP - 6, 8], [190, TOP + 40, 10], [690, TOP - 34, 7], [1170, TOP + 70, 9]]
    .map(([x, y, r], i) => stellina(x, y, r, i, i % 2 ? '#ffffff' : p1))
    .join('')

  const defs = `${tp.defs()}
    <linearGradient id="${u}-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${alto}"/><stop offset="1" stop-color="${basso}"/></linearGradient>
    <linearGradient id="${u}-tema" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p1}"/><stop offset="1" stop-color="${p2}"/></linearGradient>
    <linearGradient id="${u}-cr" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1f9d4c" stop-opacity=".92"/><stop offset=".55" stop-color="#5fe36a" stop-opacity=".82"/><stop offset="1" stop-color="#e6ffa6" stop-opacity=".9"/></linearGradient>
    <clipPath id="${u}-card"><rect x="0" y="${TOP}" width="${W}" height="${H - TOP}" rx="${R}"/></clipPath>
    <clipPath id="${u}-av"><circle cx="${ax}" cy="${ay}" r="${ar}"/></clipPath>
    <clipPath id="${u}-q" clipPathUnits="objectBoundingBox"><rect width="1" height="1" rx=".11"/></clipPath>
    <filter id="${u}-luce" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>`
  const style = `
    .su{animation:su 1s ${EASE} backwards;animation-delay:calc(var(--i) * 90ms)}
    .cr{animation:cr 4.8s ease-in-out infinite;animation-delay:calc(var(--i) * -370ms)}
    .st{transform-box:fill-box;transform-origin:center;animation:st 3.2s ease-in-out infinite;animation-delay:calc(var(--i) * 530ms)}
    @keyframes su{from{opacity:0;transform:translateY(18px)}}
    @keyframes cr{0%,100%{opacity:.86}50%{opacity:1}}
    @keyframes st{0%,100%{opacity:0;transform:scale(.2) rotate(0)}45%{opacity:1;transform:scale(1) rotate(45deg)}70%{opacity:0;transform:scale(.4) rotate(90deg)}}
    @media (prefers-reduced-motion:reduce){.su,.cr,.st{animation:none}}`
  const body = `<rect x="0" y="${TOP}" width="${W}" height="${H - TOP}" rx="${R}" fill="url(#${u}-g)"/>
  ${out.join('')}
  <rect x=".75" y="${TOP + 0.75}" width="${W - 1.5}" height="${H - TOP - 1.5}" rx="${R}" fill="none" stroke="${c.riga}" stroke-width="1.5"/>
  <g filter="url(#${u}-luce)" opacity=".55">${crist}</g>${crist}${stelle}`
  const cosa = d.spotify ? ` · ascolta ${d.spotify.canzone} di ${d.spotify.artista}` : d.gioco ? ` · ${ATTIVITA[d.gioco.tipo] || ''} ${d.gioco.nome}` : ''
  const titolo = `pzkko su discord: ${parolaStato}${personale ? ` · «${personale}»` : ''}${cosa}`
  return doc(W, H, titolo.replace(/[<>&"]/g, ''), defs, style, body)
}

// ── Quando lavoro ───────────────────────────────────────────────────────────

const PROGETTI_COLORI = {
  chiaro: ['#007acc', '#c4532d', '#7a5cc2', '#b07a12', '#2f9e5b', '#c9c5bb'],
  scuro: ['#2a8ad0', '#cc6440', '#8f78d6', '#b8892a', '#3fbf72', '#3a3a38'],
}
const MESI = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic']
const GIORNI = ['lun', 'mar', 'mer', 'gio', 'ven', 'sab', 'dom']

/** Barre con la cima tonda, come nei numeri; `x(i)` è il centro della barra i. */
function barre(valori, { x0, x1, top, base, gap, colore, ultima, vuoto, cls = 'bar' }) {
  const out = []
  const n = valori.length
  const bw = (x1 - x0 - gap * (n - 1)) / n
  const max = Math.max(1, ...valori)
  const hmax = base - top
  const altezza = (v) => Math.max(6, (v / max) * hmax)
  valori.forEach((v, i) => {
    const x = +(x0 + i * (bw + gap)).toFixed(1)
    if (!v) {
      out.push(`<rect x="${x}" y="${base - 3}" width="${bw.toFixed(1)}" height="3" rx="1.5" fill="${vuoto}"/>`)
      return
    }
    const h = altezza(v)
    const r = Math.min(4, bw / 2)
    out.push(`<path class="${cls}" style="--i:${i}" d="M${x} ${base}V${(base - h + r).toFixed(1)}q0 -${r} ${r} -${r}h${(bw - 2 * r).toFixed(1)}q${r} 0 ${r} ${r}V${base}Z" fill="${ultima && i === n - 1 ? ultima : colore}"/>`)
  })
  return { svg: out.join(''), bw, max, altezza, x: (i) => x0 + i * (bw + gap) + bw / 2 }
}

/**
 * Quando lavora alberto: i contributi settimana per settimana nell'ultimo anno,
 * i giorni della settimana, le ore dei commit recenti e i progetti in cui vanno.
 * `a` arriva da genera.mjs.
 */
export function attivita(nome, a) {
  const c = TEMI[nome]
  const tp = tipografo('a')
  const W = 1200
  const H = 800
  const L = 64
  const R = W - 64
  const out = []
  const testo = (t, x, y, { size = 13, fill = c.muted, anchor, key = 'mono' } = {}) => out.push(tp.riga(key, t, size, { x, y, fill, anchor }).svg)

  testo('quando lavoro · ultimi 12 mesi', L, 72, { size: 15 })
  testo(`aggiornati al ${giorno(a.oggi)}`, R, 72, { size: 15, anchor: 'end' })
  out.push(`<path d="M${L} 98H${R}" stroke="${c.line}"/>`)

  // ── settimana per settimana ──
  testo('i commit, settimana per settimana', L, 146, { size: 15 })
  const sett = barre(a.settimane.map((s) => s.n), { x0: L, x1: R, top: 186, base: 330, gap: 4, colore: c.accent, ultima: c.accentDeep, vuoto: c.line })
  out.push(sett.svg, `<path d="M${L} 330.5H${R}" stroke="${c.line}"/>`)
  let mese = Number(a.settimane[0]?.data.slice(5, 7)) - 1
  a.settimane.forEach((s, i) => {
    const m = Number(s.data.slice(5, 7)) - 1
    if (i && m !== mese && i < a.settimane.length - 2) testo(MESI[m], sett.x(i), 354, { anchor: 'middle' })
    mese = m
  })
  const imax = a.settimane.findIndex((s) => s.n === sett.max)
  if (imax >= 0 && sett.max > 0) testo(String(sett.max), sett.x(imax), 330 - sett.altezza(sett.max) - 8, { anchor: 'middle', fill: c.fg })

  // ── i giorni della settimana ──
  const meta = (L + R) / 2
  testo('i giorni della settimana', L, 430, { size: 15 })
  const gs = barre(a.giorni, { x0: L, x1: meta - 40, top: 476, base: 610, gap: 14, colore: c.accent, vuoto: c.line, cls: 'bar b2' })
  out.push(gs.svg, `<path d="M${L} 610.5H${meta - 40}" stroke="${c.line}"/>`)
  GIORNI.forEach((g, i) => {
    testo(g, gs.x(i), 634, { anchor: 'middle' })
    if (a.giorni[i]) testo(String(a.giorni[i]), gs.x(i), 610 - gs.altezza(a.giorni[i]) - 8, { anchor: 'middle' })
  })

  // ── le ore ──
  testo('a che ora faccio i commit', meta + 40, 430, { size: 15 })
  testo(`su ${a.nCommit} commit, ora italiana`, R, 430, { anchor: 'end' })
  const os = barre(a.ore, { x0: meta + 40, x1: R, top: 476, base: 610, gap: 5, colore: c.accent, vuoto: c.line, cls: 'bar b3' })
  out.push(os.svg, `<path d="M${meta + 40} 610.5H${R}" stroke="${c.line}"/>`)
  for (const h of [0, 6, 12, 18, 23]) testo(`${h}`, os.x(h), 634, { anchor: 'middle' })
  const picco = a.ore.indexOf(Math.max(...a.ore))
  if (a.ore[picco] > 0) testo(`${picco}:00`, os.x(picco), 610 - os.altezza(a.ore[picco]) - 8, { anchor: 'middle', fill: c.fg })

  // ── i progetti ──
  const ly = 708
  testo('in quali progetti', L, ly - 18, { size: 15 })
  const pal = PROGETTI_COLORI[nome]
  const tot = a.progetti.reduce((s, p) => s + p.n, 0) || 1
  const voci = a.progetti.slice(0, 5).map((p, i) => ({ ...p, colore: pal[i] }))
  const resto = a.progetti.slice(5).reduce((s, p) => s + p.n, 0)
  if (resto) voci.push({ nome: 'altro', n: resto, colore: pal[5] })
  let x = L
  const lw = R - L
  const pezzi = voci.map((v, i) => {
    const w = Math.max(3, (v.n / tot) * lw - (i < voci.length - 1 ? 2 : 0))
    const r = `<rect x="${x.toFixed(1)}" y="${ly}" width="${w.toFixed(1)}" height="14" fill="${v.colore}"/>`
    x += w + 2
    return r
  })
  out.push(`<clipPath id="progetti-${nome}"><rect x="${L}" y="${ly}" width="${lw}" height="14" rx="7"/></clipPath><g clip-path="url(#progetti-${nome})">${pezzi.join('')}</g>`)
  let lx = L
  voci.forEach((v) => {
    const label = `${v.nome.toLowerCase()} ${v.n}`
    out.push(`<rect x="${lx}" y="${ly + 34}" width="12" height="12" rx="3" fill="${v.colore}"/>`)
    out.push(tp.riga('mono', label, 14, { x: lx + 20, y: ly + 45, fill: c.fg }).svg)
    lx += 20 + tp.misura('mono', label, 14) + 30
  })

  const style = `
    .bar{transform-box:fill-box;transform-origin:50% 100%;animation:bar .9s ${EASE} backwards;animation-delay:calc(200ms + var(--i) * 12ms)}
    .b2{animation-delay:calc(500ms + var(--i) * 40ms)}
    .b3{animation-delay:calc(600ms + var(--i) * 20ms)}
    @keyframes bar{from{transform:scaleY(0)}}
    @media (prefers-reduced-motion:reduce){.bar{animation:none}}`
  const body = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="28" fill="${c.bg}" stroke="${c.line}"/>${out.join('')}`
  return doc(W, H, `quando lavora alberto: ${a.nCommit} commit nell’ultimo anno, il picco alle ${picco}:00`, tp.defs(), style, body)
}
