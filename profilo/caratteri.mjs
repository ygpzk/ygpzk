// I caratteri di albertopecchini.it (gli stessi pacchetti @fontsource del sito),
// trasformati in tracciati: dentro un <img> GitHub non carica font, e così ogni
// immagine è identica su qualsiasi schermo. Ogni lettera è un <path> in <defs>,
// scritto una volta sola nelle unità del carattere e richiamato con <use>.

import * as fontkit from 'fontkit'
import { decompress } from 'wawoff2'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const file = (pkg, name) => require.resolve(`@fontsource-variable/${pkg}/files/${name}`)

// le stesse impostazioni del sito: Fraunces leggero con la misura ottica a 144,
// Archivo stretto all'86% per il nome, Hanken per i testi, Geist Mono per i dati
const SPEC = {
  serif: { file: file('fraunces', 'fraunces-latin-opsz-normal.woff2'), axes: { wght: 330, opsz: 144 } },
  serifI: { file: file('fraunces', 'fraunces-latin-opsz-italic.woff2'), axes: { wght: 320, opsz: 144 } },
  serifPiccolo: { file: file('fraunces', 'fraunces-latin-opsz-normal.woff2'), axes: { wght: 380, opsz: 48 } },
  nome: { file: file('archivo', 'archivo-latin-wdth-normal.woff2'), axes: { wght: 600, wdth: 86 } },
  sans: { file: file('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2'), axes: { wght: 420 } },
  sansForte: { file: file('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2'), axes: { wght: 560 } },
  mono: { file: file('geist-mono', 'geist-mono-latin-wght-normal.woff2'), axes: { wght: 400 } },
}

// fontkit sa istanziare un carattere variabile solo da un TTF: dal woff2 perde le
// tabelle. Prima si scompatta (una volta per file), poi si fissano gli assi.
const ttf = {}
const fonts = {}
const font = (key) => {
  if (!fonts[key]) {
    const s = SPEC[key]
    fonts[key] = fontkit.create(ttf[s.file]).getVariation(s.axes)
  }
  return fonts[key]
}

/** Da chiamare (e attendere) prima di disegnare: scompatta i woff2. */
export async function caricaCaratteri() {
  for (const s of Object.values(SPEC)) ttf[s.file] ||= Buffer.from(await decompress(readFileSync(s.file)))
}

const r1 = (n) => Math.round(n * 10) / 10

/** Un registro di lettere per un SVG: `defs()` restituisce i tracciati usati. */
export function tipografo(prefix = 'g') {
  const glyphs = new Map()

  const id = (key, glyph) => {
    const k = `${key}:${glyph.id}`
    if (!glyphs.has(k)) {
      const d = glyph.path.toSVG().replace(/-?\d+\.\d+/g, (n) => String(Math.round(+n)))
      glyphs.set(k, { id: `${prefix}${glyphs.size.toString(36)}`, d })
    }
    return glyphs.get(k).id
  }

  /** Misura una riga: larghezza in px a quella grandezza. */
  const misura = (key, text, size, { tracking = 0 } = {}) => {
    const f = font(key)
    const run = f.layout(text)
    const k = size / f.unitsPerEm
    return run.positions.reduce((w, p) => w + p.xAdvance * k + tracking * size, 0) - (text.length ? tracking * size : 0)
  }

  /**
   * Una riga di testo come gruppo di <use>. `x`,`y` è la linea di base; `anchor`
   * start | middle | end; `tracking` in em (come letter-spacing). Con `gruppi`
   * ('lettere' o 'parole') ogni lettera o parola sta in un <g class="l|w"> con
   * l'indice in --i (da `i0`), per le animazioni: la trasformazione CSS va sul
   * gruppo, perché sul <use> cancellerebbe quella che lo mette al suo posto.
   */
  const riga = (key, text, size, { x = 0, y = 0, anchor = 'start', tracking = 0, fill, stroke, strokeWidth, cls, gruppi = null, i0 = 0, attrs = '' } = {}) => {
    const f = font(key)
    const run = f.layout(text)
    const k = size / f.unitsPerEm
    const width = misura(key, text, size, { tracking })
    let cx = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x
    const x0 = cx
    const uses = []
    const pezzi = [[]]
    let n = 0
    run.glyphs.forEach((g, i) => {
      const p = run.positions[i]
      if (g.path.commands.length) {
        const gx = r1(cx + (p.xOffset || 0) * k)
        const gy = r1(y - (p.yOffset || 0) * k)
        const use = `<use href="#${id(key, g)}" transform="translate(${gx} ${gy}) scale(${+k.toFixed(5)} ${-k.toFixed(5)})"/>`
        uses.push(use)
        if (gruppi === 'lettere') pezzi.push([use])
        else pezzi.at(-1).push(use)
        n++
      } else if (gruppi === 'parole' && g.codePoints.includes(32) && pezzi.at(-1).length) pezzi.push([])
      cx += p.xAdvance * k + tracking * size
    })
    const corpo = gruppi
      ? pezzi.filter((p) => p.length).map((p, j) => `<g class="${gruppi === 'lettere' ? 'l' : 'w'}" style="--i:${i0 + j}">${p.join('')}</g>`).join('')
      : uses.join('')
    const gruppiN = gruppi ? pezzi.filter((p) => p.length).length : 0
    const paint = [
      fill !== undefined ? `fill="${fill}"` : '',
      // il tratto passa per lo scale delle lettere: qui va nelle unità del carattere
      stroke ? `stroke="${stroke}" stroke-width="${+(strokeWidth / k).toFixed(1)}"` : '',
      cls ? `class="${cls}"` : '',
      attrs,
    ].filter(Boolean).join(' ')
    return { svg: `<g ${paint}>${corpo}</g>`, uses: uses.join(''), width, x: x0, letters: n, gruppi: gruppiN }
  }

  const defs = () => [...glyphs.values()].map((g) => `<path id="${g.id}" d="${g.d}"/>`).join('')

  return { riga, misura, defs }
}

/** Metriche verticali (in px a quella grandezza) per allineare a occhio. */
export function metriche(key, size) {
  const f = font(key)
  const k = size / f.unitsPerEm
  return { ascent: f.ascent * k, descent: f.descent * k, xHeight: (f.xHeight || 0) * k, capHeight: (f.capHeight || 0) * k }
}
