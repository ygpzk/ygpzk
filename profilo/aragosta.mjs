// L'aragosta di fiume di albertopecchini.it, montata in SVG. I pezzi e le misure
// vengono da AP (src/data/aragosta.js e aragosta-pezzi.js, le immagini da
// public/media/aragosta/, qui al 60% per stare leggere); le matrici sono quelle di
// src/client/ink.js. Sul sito si sveglia se il visitatore sta fermo: qui recita
// la scena una volta sola, appena l'immagine si apre.

import { readFileSync } from 'node:fs'

export const aragosta = {
  ground: 284,
  pivot: [250, 284],
  parti: {
    corpo: {},
    antenna2: { parent: 'corpo', at: [150, 62], scale: 0.8, flip: true },
    antenna: { parent: 'corpo', at: [118, 70], scale: 0.84, flip: true },
    coda: { parent: 'corpo', at: [362, 124], scale: 0.9 },
    chela: { parent: 'corpo', at: [90, 158], scale: 0.93 },
    annaffiatoio: { parent: 'chela', at: [60, 110], pin: [190, 60], scale: 0.7 },
    chela2: { parent: 'corpo', at: [205, 200], scale: 0.78 },
  },
  ordine: ['antenna2', 'antenna', 'coda', 'chela', 'chela2', 'corpo', 'annaffiatoio', 'presa'],
  presa: { pezzo: 'chela', clip: [0, 0, 118, 156] },
  spout: { tip: [21, 131], dir: [-0.72, -0.69] },
  pose: {
    dorme: { r: 1.5, coda: 7, chela: 8, annaffiatoio: -9.5, chela2: 0, antenna: 12, antenna2: 9, lid: 1 },
    sveglia: { r: -2, coda: -5, chela: 16, annaffiatoio: -14, chela2: 6, antenna: -4, antenna2: -7, lid: 0 },
    versa: { r: -4, coda: 0, chela: 24, annaffiatoio: -75, chela2: 3, antenna: -2, antenna2: -5, lid: 0.1 },
    guarda: { r: -4, coda: 2, chela: 21, annaffiatoio: -17, chela2: 2, antenna: 2, antenna2: -2, lid: 0 },
  },
  pezzi: {
    corpo: { w: 422, h: 296, pin: null, eyes: [{ x: 78.3, y: 41, rx: 21.5, ry: 22.3, skin: '#c42d14' }, { x: 170.5, y: 44.8, rx: 21.3, ry: 22, skin: '#d82a0f' }] },
    coda: { w: 454, h: 204, pin: [35.8, 66] },
    chela: { w: 268, h: 156, pin: [231.3, 98.8] },
    annaffiatoio: { w: 286, h: 290, pin: [185.8, 31.3] },
    chela2: { w: 408, h: 196, pin: [370.8, 85.3] },
    antenna: { w: 666, h: 186, pin: [634.8, 105.3] },
    antenna2: { w: 572, h: 174, pin: [541.5, 143.3] },
  },
}

// ── matrici, come in ink.js ──
const mul = (m, n) => [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]]
const T = (x, y) => [1, 0, 0, 1, x, y]
const Rd = (deg) => {
  const r = (deg * Math.PI) / 180
  return [Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0]
}
const Sc = (x, y = x) => [x, 0, 0, y, 0, 0]
const at = (m, [x, y]) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]

const parti = () => {
  const out = {}
  for (const [id, p] of Object.entries(aragosta.parti)) {
    const img = aragosta.pezzi[id]
    out[id] = { id, ...img, ...p, pin: p.parent ? p.pin || img.pin : [0, 0], scale: p.scale || 1 }
  }
  return out
}

/** La catena dal corpo al pezzo: [corpo, …, pezzo]. */
const catena = (P, id) => {
  const c = []
  for (let p = P[id]; p; p = p.parent ? P[p.parent] : null) c.unshift(p)
  return c
}

/** Dove sta la bocca del beccuccio, e dove punta, in una posa (coordinate della scena). */
export function beccuccio({ X, Y, S }, posa) {
  const P = parti()
  const pose = aragosta.pose[posa]
  const [px, py] = aragosta.pivot
  let M = mul(mul(mul(mul(T(X, Y), Sc(S)), T(px, py)), Rd(pose.r)), T(-px, -py))
  for (const p of catena(P, 'annaffiatoio').slice(1)) {
    const k = p.scale / P[p.parent].scale
    M = mul(M, mul(mul(mul(T(...p.at), Rd(pose[p.id] || 0)), Sc(p.flip ? -k : k, k)), T(-p.pin[0], -p.pin[1])))
  }
  const tip = at(M, aragosta.spout.tip)
  const [dx, dy] = aragosta.spout.dir
  const dir = [M[0] * dx + M[2] * dy, M[1] * dx + M[3] * dy]
  const l = Math.hypot(...dir)
  return { tip, dir: [dir[0] / l, dir[1] / l] }
}

const img64 = (id) => `data:image/webp;base64,${readFileSync(new URL(`./aragosta/${id}.webp`, import.meta.url)).toString('base64')}`

/**
 * L'aragosta in SVG, con la scena. `tempi` sono gli istanti (in s) delle pose,
 * in coppia con `sequenza`; `dur` la durata della scena. Restituisce { defs, svg }.
 */
export function aragostaSvg({ X, Y, S, dur, tempi, sequenza, uid = 'ar' }) {
  const P = parti()
  const [px, py] = aragosta.pivot
  const keyTimes = tempi.map((t) => +(t / dur).toFixed(4)).join(';')
  const splines = tempi.slice(1).map(() => '.45 0 .25 1').join(';')
  const anima = (valori) =>
    `<animateTransform attributeName="transform" type="rotate" values="${valori.join(';')}" keyTimes="${keyTimes}" calcMode="spline" keySplines="${splines}" dur="${dur}s" fill="freeze"/>`
  const angoli = (id) => sequenza.map((posa) => (id === 'root' ? aragosta.pose[posa].r : aragosta.pose[posa][id] || 0))

  const defs = Object.keys(P).map((id) => `<image id="${uid}-${id}" width="${P[id].w}" height="${P[id].h}" href="${img64(id)}"/>`)
  defs.push(`<clipPath id="${uid}-presa"><rect x="${aragosta.presa.clip[0]}" y="${aragosta.presa.clip[1]}" width="${aragosta.presa.clip[2]}" height="${aragosta.presa.clip[3]}"/></clipPath>`)

  // gli occhi: la palpebra del colore del guscio scende dentro l'ellisse dell'occhio
  const occhi = P.corpo.eyes.map((e, i) => {
    const lids = sequenza.map((posa) => aragosta.pose[posa].lid)
    const ty = lids.map((l) => `0 ${(-(1 - l) * e.ry * 2.1).toFixed(1)}`).join(';')
    const piega = lids.map((l) => (l > 0.5 ? 1 : 0)).join(';')
    defs.push(`<clipPath id="${uid}-occhio${i}"><ellipse cx="${e.x}" cy="${e.y}" rx="${e.rx}" ry="${e.ry}"/></clipPath>`)
    return `<g clip-path="url(#${uid}-occhio${i})">
      <rect x="${e.x - e.rx - 2}" y="${e.y - e.ry - 2}" width="${e.rx * 2 + 4}" height="${e.ry * 2 + 4}" fill="${e.skin}">
        <animateTransform attributeName="transform" type="translate" values="${ty}" keyTimes="${keyTimes}" calcMode="spline" keySplines="${splines}" dur="${dur}s" fill="freeze"/>
      </rect>
      <path d="M${e.x - e.rx * 0.8} ${e.y + e.ry * 0.1} Q${e.x} ${e.y + e.ry * 0.75} ${e.x + e.rx * 0.8} ${e.y + e.ry * 0.1}" fill="none" stroke="#5c1407" stroke-width="3.2" stroke-linecap="round" opacity="1">
        <animate attributeName="opacity" values="${piega}" keyTimes="${keyTimes}" calcMode="discrete" dur="${dur}s" fill="freeze"/>
      </path>
    </g>`
  })

  const nodo = (voce) => {
    const presa = voce === 'presa'
    const id = presa ? aragosta.presa.pezzo : voce
    let inner = `<use href="#${uid}-${id}"${presa ? ` clip-path="url(#${uid}-presa)"` : ''}/>`
    if (id === 'corpo') inner += occhi.join('')
    for (const p of catena(P, id).slice(1).reverse()) {
      const k = +(p.scale / P[p.parent].scale).toFixed(4)
      inner = `<g transform="translate(${p.at[0]} ${p.at[1]})"><g transform="rotate(${angoli(p.id)[0]})">${anima(angoli(p.id))}<g transform="scale(${p.flip ? -k : k} ${k}) translate(${-p.pin[0]} ${-p.pin[1]})">${inner}</g></g></g>`
    }
    return `<g transform="rotate(${angoli('root')[0]})">${anima(angoli('root'))}<g transform="translate(${-px} ${-py})">${inner}</g></g>`
  }

  const svg = `<g transform="translate(${X} ${Y}) scale(${S}) translate(${px} ${py})">${aragosta.ordine.map(nodo).join('')}</g>`
  return { defs: defs.join(''), svg }
}
