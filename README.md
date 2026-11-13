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
### ①&nbsp; /live/euro/, il € nero 3D che gira come livello web per Camo

✨ **novità** in `sito` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 13 nov 2026, 02:55 · [`828930f`](https://github.com/ygpzk/AP/commit/828930fbed9e7332a33329f06af83f6baf30f992)

WebP animata trasparente 640×640, loop di 8 s; ?verde per il fondo verde. Voce nuova in pzkkopedia: «Il € che gira».

> **i file:** <b>4</b> modificati + <b>2</b> aggiunti &nbsp;·&nbsp; **le righe:** <b>+512</b> in più, <b>−468</b> in meno

```diff
@@ albertopecchini.it/ @@
! pzkko/wiki/cronologia.js  +4 −4
! pzkko/wiki/stato.json  +5 −5
! pzkko/wiki/voci/dati.js  +459 −459
! pzkko/wiki/voci/dietro.js  +23 −0
+ public/live/euro/euro.webp
+ public/live/euro/index.html  +21 −0
```

### ②&nbsp; anche il manifesto della home col selfie in bianco e nero

🔧 **riparazione** in `sito` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 12 nov 2026, 02:53 · [`4aa3892`](https://github.com/ygpzk/AP/commit/4aa3892120473bbd8926df26b289b8090af7ea38)

La foto a colori con l'iPhone bianco non va più online: al suo posto lo stesso selfie di /studio/, tagliato al petto nello stesso formato (ritratto-bn-banner).

> **i file:** <b>6</b> modificati + <b>2</b> aggiunti &nbsp;·&nbsp; **le righe:** <b>+17</b> in più, <b>−14</b> in meno

```diff
@@ albertopecchini.it/ @@
! pzkko/wiki/cronologia.js  +3 −3
! pzkko/wiki/stato.json  +3 −3
! pzkko/wiki/voci/dati.js  +3 −3
! src/data/studio.js  +6 −4
! src/templates/pages/home.js  +1 −1
! tools/privacy.mjs  +1 −0
+ public/media/studio/ritratto-bn-banner-1600.webp
+ public/media/studio/ritratto-bn-banner-900.webp
```
<!-- commit:fine -->

<br>

## ✦ novità

<!-- novita:inizio -->
**negli ultimi 7 giorni** 38 commit, soprattutto su `wiki` (11), `pzkko` (7), `deutschland` (5), `sito` (4).

- **13 nov** · **sito** — /live/euro/, il € nero 3D che gira come livello web per Camo · [AP↗](https://github.com/ygpzk/AP/commit/828930fbed9e7332a33329f06af83f6baf30f992)
- **11 nov** · **pzk os, regia** — stato dei sistemi, agenti gratis, cruscotto con account e hosting · [AP↗](https://github.com/ygpzk/AP/commit/a3ba2913a317a0eb4960d99a34c7297fac443049)
- **10 nov** · **deutschland** — Deutschland 4, la macchinetta gialla di Stoccarda frontale sul suo muro · [AP↗](https://github.com/ygpzk/AP/commit/f46f86b8e1b72a4729e550843fdbd56cfd96e7cf)
- **10 nov** · **studio** — il selfie allo specchio sotto «Prima per curiosità, poi per mestiere» · [AP↗](https://github.com/ygpzk/AP/commit/39b80ef850ac5f88b3cdee96f08071110d49d3e4)
- **10 nov** · **deutschland** — Deutschland 3, il tavolo dei ricordi, i tasti veri della macchinetta e i pacchetti che aprono il loro album · [AP↗](https://github.com/ygpzk/AP/commit/c40dae80e1d7122597795165a5614a9d80bece21)
- **9 nov** · **deutschland** — i nomi nell'album e la storia di Deutschland nella wiki · [AP↗](https://github.com/ygpzk/AP/commit/18971d76151dccdb1fb4b14837664f246d31eb61)
<!-- novita:fine -->

<br>

## ✦ in cantiere

<!-- cantiere:inizio -->
| progetto | cos’è | ultimo push |
|:--|:--|--:|
| **[albertopecchini.it](https://www.albertopecchini.it)**<br><sub>[ygpzk/AP](https://github.com/ygpzk/AP)</sub> | il portfolio, **pzkko.it** (il muro con i social, la scena 3D, i giochi, il cercapersone zero e la pzkkopedia) e la parodia **bettercallpekko.it**: siti statici scritti a mano, con Vite e niente framework | 13 nov 2026 |
| **[ing. dario donelli](https://dariodonelli.vercel.app)**<br><sub>[ygpzk/dariodonelli-](https://github.com/ygpzk/dariodonelli-)</sub> | lo studio di ingegneria di Dario Donelli | 10 nov 2026 |
| **[rivaltasulmincio.it](https://www.rivaltasulmincio.it)**<br><sub>[ygpzk/rivaltasulmincio](https://github.com/ygpzk/rivaltasulmincio)</sub> | il sito della Pro Loco di Rivalta sul Mincio: notizie, eventi, fotografie e il borgo nel Parco del Mincio | 3 nov 2026 |
| **[cascinafontana.xyz](https://www.cascinafontana.xyz)**<br><sub>[ygpzk/cascinafontana](https://github.com/ygpzk/cascinafontana)</sub> | la Società Agricola Cascina Fontana: i prodotti, la galleria e i contatti | 27 set 2026 |
<!-- cantiere:fine -->

<br>

## ✦ i numeri

<!-- numeri:inizio -->
<picture><source media="(prefers-color-scheme: dark)" srcset="immagini/numeri-scuro.svg?v=530f75a8"><img src="immagini/numeri-chiaro.svg?v=e74fad38" alt="i numeri: 0 contributi, 0 giorni di fila, 0 in un giorno solo, 4 repository" width="100%"></picture>
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
<sub>ultimo commit letto: <a href="https://github.com/ygpzk/AP/commit/828930fbed9e7332a33329f06af83f6baf30f992"><code>828930f</code></a> del 13 nov 2026, 02:55 · il profilo si rifà da solo ogni 15 minuti</sub>
<!-- piede:fine -->
  <br>
  <sub>fatto a mano da <a href="https://www.albertopecchini.it">Alberto Pecchini</a> · <img src="https://komarev.com/ghpvc/?username=ygpzk&label=visite&color=007acc&style=flat-square" alt="visite" height="16" align="center"></sub>
</p>
