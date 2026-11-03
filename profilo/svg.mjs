// Le immagini del profilo, nel vestito di albertopecchini.it: carta e inchiostro,
// il blu #007acc, Archivo per il nome, Fraunces per i titoli, Hanken per i testi,
// Geist Mono per etichette e dati, tutto minuscolo. Ognuna esce in due temi
// (chiaro e scuro), come il sito; il README le sceglie con <picture>.

import { tipografo, metriche } from './caratteri.mjs'
import { aragostaSvg, beccuccio } from './aragosta.mjs'

// i token di src/styles/tokens.css
export const TEMI = {
  chiaro: {
    bg: '#f8f6f0', card: '#faf9f5', fg: '#1a1b1a', muted: '#525252', line: 'rgba(26,27,26,.12)', soft: '#f1ede1',
    accent: '#007acc', accentDeep: '#005c9e', accentSoft: '#cfe6f8', onAccent: '#ffffff', live: '#2f9e5b',
  },
  scuro: {
    bg: '#0a0a0a', card: '#171717', fg: '#f8f6f0', muted: '#a3a3a3', line: 'rgba(248,246,240,.14)', soft: '#262626',
    accent: '#3b9ee8', accentDeep: '#007acc', accentSoft: '#12324a', onAccent: '#0a0a0a', live: '#3fbf72',
  },
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)' // --ease-silk

const doc = (w, h, title, defs, style, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${title}"><title>${title}</title><defs>${defs}</defs><style>${style}</style>${body}</svg>\n`

// ── L'hero ──────────────────────────────────────────────────────────────────

/**
 * La testa del profilo: la stessa dell'home di albertopecchini.it. Le pillole,
 * il nome (alberto pieno, pecchini a contorno), il titolo in Fraunces; sulla
 * seconda pillola dorme l'aragosta, che si sveglia e riempie pecchini di blu.
 */
export function testa(nome) {
  const c = TEMI[nome]
  const tp = tipografo('t')
  const W = 1200
  const H = 600
  const DUR = 10
  const out = []

  // ── le pillole ──
  const pillY = 124
  const pillH = 40
  const mono = 16
  const p1 = 'rivalta sul mincio · 45°14′n · 10°41′e'
  const p2 = 'disponibile per nuovi incarichi'
  const w1 = tp.misura('mono', p1, mono) + 36
  const w2 = tp.misura('mono', p2, mono) + 36 + 18
  const gap = 12
  const px0 = (W - (w1 + gap + w2)) / 2
  const base = pillY + pillH / 2 + 5.4
  const pill = (x, w, i, inner) =>
    `<g class="su" style="--d:40ms;--i:${i}"><rect x="${x + 0.5}" y="${pillY + 0.5}" width="${w - 1}" height="${pillH - 1}" rx="${pillH / 2}" fill="${c.card}" stroke="${c.line}"/>${inner}</g>`
  out.push(pill(px0, w1, 0, tp.riga('mono', p1, mono, { x: px0 + 18, y: base, fill: c.muted }).svg))
  const x2 = px0 + w1 + gap
  const dotX = x2 + 22
  const dotY = pillY + pillH / 2
  out.push(
    pill(x2, w2, 1, `<circle cx="${dotX}" cy="${dotY}" r="9" fill="${c.live}" opacity=".45" class="alone"/><circle cx="${dotX}" cy="${dotY}" r="4.5" fill="${c.live}"/>${tp.riga('mono', p2, mono, { x: x2 + 36, y: base, fill: c.muted }).svg}`),
  )

  // ── il nome ──
  const ns = 158
  const track = -0.055
  const nameY = 322
  const wA = tp.misura('nome', 'alberto ', ns, { tracking: track }) + track * ns
  const wB = tp.misura('nome', 'pecchini', ns, { tracking: track })
  const nx = (W - (wA + wB)) / 2
  const A = tp.riga('nome', 'alberto', ns, { x: nx, y: nameY, tracking: track, fill: c.fg, gruppi: 'lettere' })
  const B = tp.riga('nome', 'pecchini', ns, { x: nx + wA, y: nameY, tracking: track, fill: 'none', stroke: c.fg, strokeWidth: 1.6, gruppi: 'lettere', i0: A.gruppi })
  const m = metriche('nome', ns)
  const topB = nameY - m.ascent * 0.82
  const botB = nameY - m.descent + 4

  // ── l'aragosta, sulla seconda pillola, verso la fine ──
  const S = 0.27
  const X = x2 + w2 - 26 - 250 * S
  const Y = pillY - 284 * S + 3
  const tempi = [0, 2.4, 2.9, 3.5, 4.1, 6.9, 7.5, 9.0, 9.8, DUR]
  const sequenza = ['dorme', 'dorme', 'sveglia', 'sveglia', 'versa', 'versa', 'guarda', 'guarda', 'dorme', 'dorme']
  const ar = aragostaSvg({ X, Y, S, dur: DUR, tempi, sequenza, uid: `ar${nome[0]}` })

  // il getto: dalla bocca del beccuccio (posa «versa») giù fino a pecchini
  const { tip, dir } = beccuccio({ X, Y, S }, 'versa')
  const ctrl = [tip[0] + dir[0] * 34, tip[1] + dir[1] * 34]
  const end = [ctrl[0] - 4, topB + 26]
  const kt = (...ts) => ts.map((t) => +(t / DUR).toFixed(4)).join(';')
  const getto = `<path d="M${tip[0].toFixed(1)} ${tip[1].toFixed(1)} Q${ctrl[0].toFixed(1)} ${(ctrl[1] + 10).toFixed(1)} ${end[0].toFixed(1)} ${end[1].toFixed(1)}" pathLength="100" fill="none" stroke="${c.accent}" stroke-width="5" stroke-linecap="round" stroke-dasharray="100 120" stroke-dashoffset="100">
      <animate attributeName="stroke-dashoffset" values="100;100;0;0;-102;-102" keyTimes="${kt(0, 4.05, 4.45, 6.85, 7.3, DUR)}" dur="${DUR}s" fill="freeze"/>
    </path>`
  // le gocce che rimbalzano dove il getto entra nella parola
  const gocce = [-1, 1, 0.4]
    .map((s, i) => {
      const gx = end[0] + s * 16
      return `<circle cx="${end[0].toFixed(1)}" cy="${end[1].toFixed(1)}" r="${3 - i * 0.6}" fill="${c.accent}" opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="${kt(0, 4.4, 4.45, 6.9, 7.0, DUR)}" dur="${DUR}s" fill="freeze"/>
        <animate attributeName="cx" values="${end[0].toFixed(1)};${gx.toFixed(1)}" dur="${0.5 + i * 0.12}s" begin="${4.4 + i * 0.15}s" repeatCount="${Math.floor(2.5 / (0.5 + i * 0.12))}"/>
        <animate attributeName="cy" values="${end[1].toFixed(1)};${(end[1] - 14 - i * 4).toFixed(1)};${(end[1] + 6).toFixed(1)}" keyTimes="0;.4;1" dur="${0.5 + i * 0.12}s" begin="${4.4 + i * 0.15}s" repeatCount="${Math.floor(2.5 / (0.5 + i * 0.12))}"/>
      </circle>`
    })
    .join('')

  // l'inchiostro sale dentro pecchini, con l'onda in cima
  const onda = 46
  const amp = 6
  const xa = B.x - onda * 2
  const xb = B.x + wB + onda * 3
  let wave = `M${xa} ${topB}`
  for (let x = xa; x < xb; x += onda) wave += ` q${onda / 4} ${-amp} ${onda / 2} 0 t${onda / 2} 0`
  wave += ` V${botB + 40} H${xa} Z`
  const sale = botB - topB + amp + 24
  // una maschera e non un clipPath: col clipPath fatto di <use> Chromium riempie
  // anche l'occhio della «e»
  const inchiostro = `<mask id="pecchini-${nome}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><g fill="#fff">${B.uses}</g></mask>
    <g mask="url(#pecchini-${nome})"><g transform="translate(0 ${sale})">
      <animateTransform attributeName="transform" type="translate" values="0 ${sale};0 ${sale};0 ${sale * 0.55};0 -14;0 -14" keyTimes="${kt(0, 4.35, 5.6, 7.4, DUR)}" keySplines=".4 0 .6 1;.3 0 .4 1;.2 0 .2 1;0 0 1 1" calcMode="spline" dur="${DUR}s" fill="freeze"/>
      <path d="${wave}" fill="${c.accent}"><animateTransform attributeName="transform" type="translate" values="0 0;${-onda} 0" dur="1.1s" repeatCount="indefinite"/></path>
    </g></g>`

  // quando l'inchiostro arriva in cima il contorno si tinge dello stesso blu:
  // pecchini resta pieno, senza il bordo scuro, come sul sito a parola riempita
  const tinta = `<animate attributeName="stroke" values="${c.fg};${c.fg};${c.accent};${c.accent}" keyTimes="${kt(0, 6.7, 7.5, DUR)}" dur="${DUR}s" fill="freeze"/>`
  const pecchini = B.svg.replace(/^<g [^>]*>/, (g) => g + tinta)

  // gli zzz di chi dorme: si fermano quando si sveglia e tornano alla fine
  const testaAr = [X + 150 * S, Y + 8]
  const zzz = [13, 17, 22]
    .map((s, i) => `<g class="z" style="--i:${i}">${tp.riga('mono', 'z', s, { x: testaAr[0] + i * 12, y: testaAr[1] - i * 15, fill: c.muted }).svg}</g>`)
    .join('')

  // ── il titolo ──
  const ts = 88
  const tt = -0.028
  const l1a = 'siti scritti '
  const l1b = 'a mano,'
  const l2 = 'un commit alla volta.'
  const w1a = tp.misura('serif', l1a, ts, { tracking: tt }) + tt * ts
  const w1b = tp.misura('serifI', l1b, ts, { tracking: tt })
  const t1x = (W - (w1a + w1b)) / 2
  const T1 = tp.riga('serif', l1a, ts, { x: t1x, y: 458, tracking: tt, fill: c.fg, gruppi: 'parole' })
  const T2 = tp.riga('serifI', l1b, ts, { x: t1x + w1a, y: 458, tracking: tt, fill: c.accent, gruppi: 'parole', i0: T1.gruppi })
  const T3 = tp.riga('serif', l2, ts, { x: W / 2, y: 548, anchor: 'middle', tracking: tt, fill: c.fg, gruppi: 'parole', i0: T1.gruppi + T2.gruppi })

  const style = `
    .su{animation:su 1s ${EASE} backwards;animation-delay:calc(var(--d) + var(--i) * 90ms)}
    .nome .l{animation:su 1.1s ${EASE} backwards;animation-delay:calc(160ms + var(--i) * 38ms)}
    .titolo .w{animation:su 1.1s ${EASE} backwards;animation-delay:calc(620ms + var(--i) * 70ms)}
    .ar{animation:fade 1.2s ${EASE} 900ms backwards}
    .alone{transform-box:fill-box;transform-origin:center;animation:alone 2.4s ease-out infinite}
    .zz{animation:zz ${DUR}s linear forwards}
    .z{animation:z 2.4s ease-out infinite;animation-delay:calc(var(--i) * 520ms)}
    @keyframes su{from{opacity:0;transform:translateY(34px)}}
    @keyframes fade{from{opacity:0}}
    @keyframes alone{0%{transform:scale(.5);opacity:.6}80%,100%{transform:scale(1.5);opacity:0}}
    @keyframes zz{0%,22%{opacity:1}25%,95%{opacity:0}100%{opacity:1}}
    @keyframes z{0%{opacity:0;transform:translate(-5px,8px)}25%{opacity:1}100%{opacity:0;transform:translate(9px,-16px)}}
    @media (prefers-reduced-motion:reduce){.su,.nome .l,.titolo .w,.ar,.alone,.z,.zz{animation:none}}`

  const body = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="28" fill="${c.bg}" stroke="${c.line}"/>
  ${out.join('')}
  <g class="nome">${A.svg}${inchiostro}${pecchini}</g>
  <g class="ar">${getto}${gocce}${ar.svg}<g class="zz">${zzz}</g></g>
  <g class="titolo">${T1.svg}${T2.svg}${T3.svg}</g>`

  const defs = tp.defs() + ar.defs
  return {
    svg: doc(W, H, 'alberto pecchini — siti scritti a mano, un commit alla volta', defs, style, body),
    debug: { tip, end, B: [B.x, B.x + wB], topB, botB },
  }
}

// ── I tasti ─────────────────────────────────────────────────────────────────

/** Una pillola come quelle del sito: piena (blu) o a contorno, con la freccia. */
export function tasto(nome, testo, { pieno = false } = {}) {
  const c = TEMI[nome]
  const tp = tipografo('k')
  const size = 19
  const H = 52
  const tw = tp.misura('sansForte', testo, size, { tracking: -0.01 })
  const W = Math.ceil(26 + tw + 14 + 16 + 24)
  const fg = pieno ? c.onAccent : c.fg
  const t = tp.riga('sansForte', testo, size, { x: 26, y: H / 2 + 6.6, tracking: -0.01, fill: fg })
  const ax = 26 + tw + 14
  const freccia = `<path d="M${ax} ${H / 2}h15M${ax + 9} ${H / 2 - 6}l6 6-6 6" fill="none" stroke="${fg}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
  const fondo = pieno
    ? `<rect width="${W}" height="${H}" rx="${H / 2}" fill="${c.accent}"/>`
    : `<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="${(H - 1.5) / 2}" fill="${c.bg}" stroke="${nome === 'chiaro' ? 'rgba(26,27,26,.28)' : 'rgba(248,246,240,.3)'}" stroke-width="1.5"/>`
  return doc(W, H, testo, tp.defs(), '', `${fondo}${t.svg}${freccia}`)
}

// ── I numeri ────────────────────────────────────────────────────────────────

// i linguaggi: un colore fisso per linguaggio (mai per posizione), validato con
// lo script della skill dataviz sui due fondi; il resto va in «altro», grigio
const LINGUE = {
  chiaro: { JavaScript: '#007acc', HTML: '#c4532d', CSS: '#7a5cc2', TypeScript: '#b07a12', altro: '#c9c5bb' },
  scuro: { JavaScript: '#2a8ad0', HTML: '#cc6440', CSS: '#8f78d6', TypeScript: '#b8892a', altro: '#3a3a38' },
}

const it = (n) => n.toLocaleString('it-IT')
const giorno = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}.${m}.${y}`
}

/**
 * La scheda dei numeri: quattro cifre grandi in Fraunces, gli ultimi 30 giorni
 * a barre e i linguaggi in una barra sola. `n` arriva da genera.mjs.
 */
export function numeri(nome, n) {
  const c = TEMI[nome]
  const tp = tipografo('n')
  const W = 1200
  const H = 668
  const L = 64
  const R = W - 64
  const out = []

  out.push(tp.riga('mono', 'i numeri · ultimi 12 mesi', 15, { x: L, y: 72, fill: c.muted }).svg)
  out.push(tp.riga('mono', `aggiornati al ${giorno(n.oggi)}`, 15, { x: R, y: 72, anchor: 'end', fill: c.muted }).svg)
  out.push(`<path d="M${L} 98H${R}" stroke="${c.line}"/>`)

  const col = (R - L) / 4
  n.cifre.forEach((s, i) => {
    const x = L + i * col
    const v = tp.riga('serif', s.valore, 104, { x, y: 222, tracking: -0.03, fill: s.accento ? c.accent : c.fg })
    out.push(`<g class="su" style="--i:${i}">${v.svg}${tp.riga('sans', s.etichetta, 20, { x: x + 2, y: 266, fill: c.fg }).svg}${tp.riga('mono', s.nota, 14, { x: x + 2, y: 294, fill: c.muted }).svg}</g>`)
    if (i) out.push(`<path d="M${x - 24} 140V300" stroke="${c.line}"/>`)
  })

  // ── gli ultimi 30 giorni ──
  const top = 360
  const base = 486
  out.push(tp.riga('mono', 'gli ultimi 30 giorni', 15, { x: L, y: top - 18, fill: c.muted }).svg)
  const giorni = n.trenta
  const gap = 6
  const bw = (R - L - gap * (giorni.length - 1)) / giorni.length
  const max = Math.max(1, ...giorni.map((d) => d.n))
  const hmax = base - top - 24
  giorni.forEach((d, i) => {
    const x = +(L + i * (bw + gap)).toFixed(1)
    const oggi = i === giorni.length - 1
    if (!d.n) {
      out.push(`<rect x="${x}" y="${base - 3}" width="${bw.toFixed(1)}" height="3" rx="1.5" fill="${c.line}"/>`)
      return
    }
    const h = Math.max(6, (d.n / max) * hmax)
    // la barra: angoli tondi di 4px in cima, piatta sulla linea di base
    const y = base - h
    const r = Math.min(4, bw / 2)
    const fill = oggi ? c.accentDeep : c.accent
    out.push(`<path class="bar" style="--i:${i}" d="M${x} ${base}V${(y + r).toFixed(1)}q0 -${r} ${r} -${r}h${(bw - 2 * r).toFixed(1)}q${r} 0 ${r} ${r}V${base}Z" fill="${fill}"/>`)
    if (d.n === max || oggi) out.push(tp.riga('mono', String(d.n), 13, { x: x + bw / 2, y: y - 8, anchor: 'middle', fill: c.muted }).svg)
  })
  out.push(`<path d="M${L} ${base + 0.5}H${R}" stroke="${c.line}"/>`)
  out.push(tp.riga('mono', giorno(giorni[0].data), 13, { x: L, y: base + 24, fill: c.muted }).svg)
  out.push(tp.riga('mono', `oggi, ${giorno(giorni.at(-1).data)}`, 13, { x: R, y: base + 24, anchor: 'end', fill: c.muted }).svg)

  // ── i linguaggi ──
  const ly = 588
  const pal = LINGUE[nome]
  const tot = n.lingue.reduce((s, l) => s + l.byte, 0) || 1
  const voci = []
  let altro = 0
  for (const l of n.lingue) (pal[l.nome] && voci.length < 4 ? voci.push({ ...l, colore: pal[l.nome] }) : (altro += l.byte))
  if (altro) voci.push({ nome: 'altro', byte: altro, colore: pal.altro })
  let x = L
  const lw = R - L
  // 2px di fondo fra un pezzo e l'altro, come chiede la skill
  const pezzi = voci.map((v, i) => {
    const w = Math.max(3, (v.byte / tot) * lw - (i < voci.length - 1 ? 2 : 0))
    const r = `<rect x="${x.toFixed(1)}" y="${ly}" width="${w.toFixed(1)}" height="14" fill="${v.colore}"/>`
    x += w + 2
    return r
  })
  out.push(`<clipPath id="lingue-${nome}"><rect x="${L}" y="${ly}" width="${lw}" height="14" rx="7"/></clipPath><g clip-path="url(#lingue-${nome})">${pezzi.join('')}</g>`)
  out.push(tp.riga('mono', 'i linguaggi, per byte di codice', 15, { x: L, y: ly - 18, fill: c.muted }).svg)
  let lx = L
  voci.forEach((v) => {
    const pct = (v.byte / tot) * 100
    const label = `${v.nome.toLowerCase()} ${pct < 1 ? '<1' : Math.round(pct)}%`
    out.push(`<rect x="${lx}" y="${ly + 34}" width="12" height="12" rx="3" fill="${v.colore}"/>`)
    out.push(tp.riga('mono', label, 14, { x: lx + 20, y: ly + 45, fill: c.fg }).svg)
    lx += 20 + tp.misura('mono', label, 14) + 30
  })

  const style = `
    .su{animation:su 1s ${EASE} backwards;animation-delay:calc(var(--i) * 90ms)}
    .bar{transform-box:fill-box;transform-origin:50% 100%;animation:bar .9s ${EASE} backwards;animation-delay:calc(400ms + var(--i) * 22ms)}
    @keyframes su{from{opacity:0;transform:translateY(18px)}}
    @keyframes bar{from{transform:scaleY(0)}}
    @media (prefers-reduced-motion:reduce){.su,.bar{animation:none}}`
  const body = `<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="28" fill="${c.bg}" stroke="${c.line}"/>${out.join('')}`
  return doc(W, H, `i numeri di ygpzk: ${n.cifre.map((s) => `${s.valore} ${s.etichetta}`).join(', ')}`, tp.defs(), style, body)
}
