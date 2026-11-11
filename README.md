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
### ①&nbsp; il controllo delle pagine salta l'archivio della macchina del tempo

📝 **documenti** in `wiki` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 10 nov 2026, 22:40 · [`215c71d`](https://github.com/ygpzk/AP/commit/215c71d3b42f8bf52c34088a5cabb73d6a0f6614)

> **i file:** <b>4</b> modificati &nbsp;·&nbsp; **le righe:** <b>+11</b> in più, <b>−11</b> in meno

```diff
@@ albertopecchini.it/pzkko/wiki/ @@
! cronologia.js  +3 −3
! stato.json  +3 −3
! voci/dati.js  +4 −4
! voci/dietro.js  +1 −1
```

### ②&nbsp; non controlla l'archivio della macchina del tempo

🔧 **riparazione** in `controllo` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 10 nov 2026, 22:39 · [`cf57778`](https://github.com/ygpzk/AP/commit/cf5777889c63a11a02ea33969eed9610187b089c)

Le pagine in public/tempo/\<sito\>/\<giorno\>/pagina/ sono l'HTML congelato dei siti di allora (anche di altri siti, con i difetti di quel giorno): facevano fallire la build con 517 problemi che non si possono né si devono correggere.

> **i file:** <b>1</b> modificato &nbsp;·&nbsp; **le righe:** <b>+8</b> in più, <b>−1</b> in meno

```diff
@@ albertopecchini.it/tools/controllo/ @@
! controllo.mjs  +8 −1
```
<!-- commit:fine -->

<br>

## ✦ novità

<!-- novita:inizio -->
**negli ultimi 7 giorni** 33 commit, soprattutto su `wiki` (10), `pzkko` (8), `deutschland` (5), `AP` (3).

- **10 nov** · **deutschland** — Deutschland 4, la macchinetta gialla di Stoccarda frontale sul suo muro · [AP↗](https://github.com/ygpzk/AP/commit/f46f86b8e1b72a4729e550843fdbd56cfd96e7cf)
- **10 nov** · **studio** — il selfie allo specchio sotto «Prima per curiosità, poi per mestiere» · [AP↗](https://github.com/ygpzk/AP/commit/39b80ef850ac5f88b3cdee96f08071110d49d3e4)
- **10 nov** · **deutschland** — Deutschland 3, il tavolo dei ricordi, i tasti veri della macchinetta e i pacchetti che aprono il loro album · [AP↗](https://github.com/ygpzk/AP/commit/c40dae80e1d7122597795165a5614a9d80bece21)
- **9 nov** · **deutschland** — i nomi nell'album e la storia di Deutschland nella wiki · [AP↗](https://github.com/ygpzk/AP/commit/18971d76151dccdb1fb4b14837664f246d31eb61)
- **9 nov** · **pzkko** — Deutschland 2, l'album dei ricordi: foto su Backblaze B2, album a righe giustificate, mappa su carta, macchinetta e pacchetti rifatti · [AP↗](https://github.com/ygpzk/AP/commit/9470eb903bc3ed8bf8f878e8cdc56e1b66e0d10e)
- **9 nov** · **pzkko** — lo schermo della macchinetta con le dodici tappe vere, i posti spezzati riuniti · [AP↗](https://github.com/ygpzk/AP/commit/1f09869d12227a405bda5f9fe02210660d344cf1)
<!-- novita:fine -->

<br>

## ✦ in cantiere

<!-- cantiere:inizio -->
| progetto | cos’è | ultimo push |
|:--|:--|--:|
| **[albertopecchini.it](https://www.albertopecchini.it)**<br><sub>[ygpzk/AP](https://github.com/ygpzk/AP)</sub> | il portfolio, **pzkko.it** (il muro con i social, la scena 3D, i giochi, il cercapersone zero e la pzkkopedia) e la parodia **bettercallpekko.it**: siti statici scritti a mano, con Vite e niente framework | 11 nov 2026 |
| **[ing. dario donelli](https://dariodonelli.vercel.app)**<br><sub>[ygpzk/dariodonelli-](https://github.com/ygpzk/dariodonelli-)</sub> | lo studio di ingegneria di Dario Donelli | 10 nov 2026 |
| **[rivaltasulmincio.it](https://www.rivaltasulmincio.it)**<br><sub>[ygpzk/rivaltasulmincio](https://github.com/ygpzk/rivaltasulmincio)</sub> | il sito della Pro Loco di Rivalta sul Mincio: notizie, eventi, fotografie e il borgo nel Parco del Mincio | 3 nov 2026 |
| **[cascinafontana.xyz](https://www.cascinafontana.xyz)**<br><sub>[ygpzk/cascinafontana](https://github.com/ygpzk/cascinafontana)</sub> | la Società Agricola Cascina Fontana: i prodotti, la galleria e i contatti | 27 set 2026 |
| **[questo profilo](https://github.com/ygpzk)**<br><sub>[ygpzk/ygpzk](https://github.com/ygpzk/ygpzk)</sub> | il README che stai leggendo: si riscrive da solo, con le immagini disegnate nei caratteri del sito | 11 nov 2026 |
<!-- cantiere:fine -->

<br>

## ✦ i numeri

<!-- numeri:inizio -->
<picture><source media="(prefers-color-scheme: dark)" srcset="immagini/numeri-scuro.svg?v=c4e3bee6"><img src="immagini/numeri-chiaro.svg?v=47f972a1" alt="i numeri: 0 contributi, 0 giorni di fila, 0 in un giorno solo, 5 repository" width="100%"></picture>
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
<sub>ultimo commit letto: <a href="https://github.com/ygpzk/AP/commit/215c71d3b42f8bf52c34088a5cabb73d6a0f6614"><code>215c71d</code></a> del 10 nov 2026, 22:40 · il profilo si rifà da solo ogni 15 minuti</sub>
<!-- piede:fine -->
  <br>
  <sub>fatto a mano da <a href="https://www.albertopecchini.it">Alberto Pecchini</a> · <img src="https://komarev.com/ghpvc/?username=ygpzk&label=visite&color=007acc&style=flat-square" alt="visite" height="16" align="center"></sub>
</p>
