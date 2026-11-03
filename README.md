<!--
  Questo README si rifà da solo: la Action «profilo» lancia profilo/genera.mjs ogni
  15 minuti e riscrive le parti fra i segni «nome:inizio» e «nome:fine». Tutto il
  resto si scrive a mano, e il generatore non lo tocca.
-->

<!-- testa:inizio -->
<a href="https://www.albertopecchini.it"><picture><source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/ygpzk/ygpzk@cd29d3103532/immagini/testa-scuro.svg"><img src="https://cdn.jsdelivr.net/gh/ygpzk/ygpzk@cd29d3103532/immagini/testa-chiaro.svg" alt="alberto pecchini — siti scritti a mano, un commit alla volta" width="100%"></picture></a>
<!-- testa:fine -->

<!-- tasti:inizio -->
<p align="center">
  <a href="https://www.albertopecchini.it"><picture><source media="(prefers-color-scheme: dark)" srcset="immagini/tasto-sito-scuro.svg?v=b3bf6bb1"><img src="immagini/tasto-sito-chiaro.svg?v=479ed5da" alt="albertopecchini.it" height="46"></picture></a>
  <a href="https://www.pzkko.it"><picture><source media="(prefers-color-scheme: dark)" srcset="immagini/tasto-pzkko-scuro.svg?v=8a840ca0"><img src="immagini/tasto-pzkko-chiaro.svg?v=2e4ed483" alt="pzkko.it" height="46"></picture></a>
  <a href="https://www.pzkko.it/wiki/"><picture><source media="(prefers-color-scheme: dark)" srcset="immagini/tasto-wiki-scuro.svg?v=57bd31ad"><img src="immagini/tasto-wiki-chiaro.svg?v=8c738dac" alt="pzkkopedia" height="46"></picture></a>
  <a href="mailto:pzkko@yahoo.com"><picture><source media="(prefers-color-scheme: dark)" srcset="immagini/tasto-scrivimi-scuro.svg?v=c9794fed"><img src="immagini/tasto-scrivimi-chiaro.svg?v=27894f73" alt="scrivimi" height="46"></picture></a>
</p>
<!-- tasti:fine -->

<br>

### ciao, sono alberto.

diplomato geometra a rivalta sul mincio, in provincia di mantova: rilevo e disegno edifici, scrivo siti web a mano, costruisco marchi. lo stesso metodo, la stessa cura.

qui c’è tutto il codice dei miei siti, dalla prima bozza alla produzione: html, css e javascript senza framework, build con vite, immagini preparate da script, un server in casa per i dati e github actions che rifotografano i siti ogni ora. lo scrivo insieme a [claude code](https://claude.com/claude-code), un commit alla volta — e qui sotto, aggiornato da solo, c’è l’ultima cosa che ho cambiato.

<br>

## ✦ cosa ho cambiato per ultimo

<sub>i due commit più recenti, da tutti i repository e da tutti i rami. si leggono così: <code>!</code> modificato · <code>+</code> aggiunto · <code>−</code> rimosso.</sub>

<!-- commit:inizio -->
### ①&nbsp; le versioni di oggi di albertopecchini.it e pzkko.it

🧹 **manutenzione** in `tempo` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 3 nov 2026, 23:53 · [`ad4fba1`](https://github.com/ygpzk/AP/commit/ad4fba1e6570af2650c4688da2525eedec9b7ae6)

Ricostruite, fotografate e congelate in istantanea dopo 85b7b32 (albertopecchini.it) e 733905a (pzkko.it); via le foto della versione di oggi di prima.

> **i file:** <b>4</b> modificati + <b>7</b> aggiunti + <b>2</b> spostati − <b>4</b> rimossi &nbsp;·&nbsp; **le righe:** <b>+4</b> in più, <b>−4</b> in meno

```diff
@@ albertopecchini.it/ @@
! public/tempo/albertopecchini.it/2026-11-03/pagina/index.html  +1 −1
! public/tempo/pzkko.it/2026-11-03/pagina/index.html  +1 −1
! src/data/tempo/ap.js  +1 −1
! src/data/tempo/pzkko.js  +1 −1
+ public/media/tempo/ap/85b7b32-m.webp
+ public/media/tempo/pzkko/733905a-d.webp
+ public/media/tempo/pzkko/733905a-m.webp
+ public/media/tempo/pzkko/733905a-t.webp
+ public/media/tempo/risorse/749cc0383805ca10.webp
+ public/media/tempo/risorse/7936a1f1a0bfb0c8.webp
+ public/media/tempo/risorse/db6b801e0d5a7ca2.webp
! public/media/tempo/ap/7afe6e5-d.webp → 85b7b32-d.webp
! public/media/tempo/ap/7afe6e5-t.webp → 85b7b32-t.webp
# … e altre 4 righe come queste
```

### ②&nbsp; la fine stimata del giro resta «—» finché non c'è una media

🔧 **riparazione** in `cruscotto` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 3 nov 2026, 23:52 · [`85b7b32`](https://github.com/ygpzk/AP/commit/85b7b32b4af4cb99b82b82d8d3f739b3e68d70cf)

> **i file:** <b>1</b> modificato &nbsp;·&nbsp; **le righe:** <b>+2</b> in più, <b>−1</b> in meno

```diff
@@ albertopecchini.it/tools/cruscotto/ @@
! vista.mjs  +2 −1
```
<!-- commit:fine -->

<br>

## ✦ novità

<!-- novita:inizio -->
**negli ultimi 7 giorni** 42 commit, soprattutto su `tempo` (14), `pzkko` (14), `albertopecchini.it` (6), `rivaltasulmincio` (5).

- **3 nov** · **cruscotto** — la regia vede tutte le sessioni di Claude, ognuna col suo stato · [AP↗](https://github.com/ygpzk/AP/commit/733905a92c4bdbce1209e17f12cac8ac8e35d6ad)
- **3 nov** · **tempo** — l'HTML vero di ogni giorno in un index leggero, e la regia di Claude per ogni lavoro · [AP↗](https://github.com/ygpzk/AP/commit/7afe6e5818208afe5800bda7cd81db7b285b91c7)
- **3 nov** · **tempo** — una pagina leggera per ogni cattura, con l'indirizzo suo · [AP↗](https://github.com/ygpzk/AP/commit/a1574d7ed1d6645a9484287f7847cfe58cf1f9b0)
- **3 nov** · **tempo** — la macchina del tempo di cinque siti, col selettore, le statistiche e i momenti · [AP↗](https://github.com/ygpzk/AP/commit/13ff3ecc49249c83c581284f80fedeac0fb8947b)
- **3 nov** · **mascotte** — torna la tartaruga col casco al posto della nutria · [AP↗](https://github.com/ygpzk/AP/commit/7d62c466a90d67254da1cb94330f6e4bed70aacc)
- **3 nov** · **tempo** — tutte le 108 versioni, a pagina intera · [AP↗](https://github.com/ygpzk/AP/commit/ca111d9d2002a7b88a8875ab5b9077bd8bc1ac26)
<!-- novita:fine -->

<br>

## ✦ in cantiere

<!-- cantiere:inizio -->
| progetto | cos’è | ultimo push |
|:--|:--|--:|
| **[albertopecchini.it](https://www.albertopecchini.it)**<br><sub>[ygpzk/AP](https://github.com/ygpzk/AP)</sub> | il portfolio, **pzkko.it** (il muro con i social, la scena 3D, i giochi, il cercapersone zero e la pzkkopedia) e la parodia **bettercallpekko.it**: siti statici scritti a mano, con Vite e niente framework | 3 nov 2026 |
| **[rivaltasulmincio.it](https://www.rivaltasulmincio.it)**<br><sub>[ygpzk/rivaltasulmincio](https://github.com/ygpzk/rivaltasulmincio)</sub> | il sito della Pro Loco di Rivalta sul Mincio: notizie, eventi, fotografie e il borgo nel Parco del Mincio | 3 nov 2026 |
| **[ing. dario donelli](https://dariodonelli.vercel.app)**<br><sub>[ygpzk/dariodonelli-](https://github.com/ygpzk/dariodonelli-)</sub> | lo studio di ingegneria di Dario Donelli | 9 ott 2026 |
| **[cascinafontana.xyz](https://www.cascinafontana.xyz)**<br><sub>[ygpzk/cascinafontana](https://github.com/ygpzk/cascinafontana)</sub> | la Società Agricola Cascina Fontana: i prodotti, la galleria e i contatti | 27 set 2026 |
| **[questo profilo](https://github.com/ygpzk)**<br><sub>[ygpzk/ygpzk](https://github.com/ygpzk/ygpzk)</sub> | il README che stai leggendo: si riscrive da solo, con le immagini disegnate nei caratteri del sito | 3 nov 2026 |
<!-- cantiere:fine -->

<br>

## ✦ i numeri

<!-- numeri:inizio -->
<picture><source media="(prefers-color-scheme: dark)" srcset="immagini/numeri-scuro.svg?v=f5904b4c"><img src="immagini/numeri-chiaro.svg?v=c772fffc" alt="i numeri: 1626 contributi, 4 giorni di fila, 53 in un giorno solo, 5 repository" width="100%"></picture>
<!-- numeri:fine -->

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="profile-3d-contrib/3d-scuro.svg">
  <img src="profile-3d-contrib/3d-chiaro.svg" alt="il calendario dei contributi in 3D" width="100%">
</picture>

<br>

## ✦ con cosa lavoro

<!-- nelle URL le virgole si scrivono %2C: GitHub taglia lo srcset del tema scuro alla prima virgola -->
<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=js%2Cts%2Chtml%2Ccss%2Cnodejs%2Cvite%2Cthreejs%2Cvercel%2Cgithubactions%2Cgit%2Cvscode%2Cfigma%2Cpy%2Cpowershell%2Ccloudflare&theme=dark&perline=15">
    <img src="https://skillicons.dev/icons?i=js%2Cts%2Chtml%2Ccss%2Cnodejs%2Cvite%2Cthreejs%2Cvercel%2Cgithubactions%2Cgit%2Cvscode%2Cfigma%2Cpy%2Cpowershell%2Ccloudflare&theme=light&perline=15" alt="javascript, typescript, html, css, node.js, vite, three.js, vercel, github actions, git, vs code, figma, python, powershell, cloudflare" width="100%">
  </picture>
</p>

<sub>e poi claude code, sharp, ffmpeg, puppeteer, resend, lighthouse e un server di casa dietro tailscale funnel.</sub>

<br><br>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="immagini/serpente-scuro.svg">
  <img src="immagini/serpente-chiaro.svg" alt="un serpente che mangia il calendario dei contributi" width="100%">
</picture>

<p align="center">
  <!-- piede:inizio -->
<sub>ultimo commit letto: <a href="https://github.com/ygpzk/AP/commit/ad4fba1e6570af2650c4688da2525eedec9b7ae6"><code>ad4fba1</code></a> del 3 nov 2026, 23:53 · il profilo si rifà da solo ogni 15 minuti</sub>
<!-- piede:fine -->
  <br>
  <sub>fatto a mano da <a href="https://www.albertopecchini.it">Alberto Pecchini</a> · <img src="https://komarev.com/ghpvc/?username=ygpzk&label=visite&color=007acc&style=flat-square" alt="visite" height="16" align="center"></sub>
</p>
