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
### ①&nbsp; nello zero i tasti dicono il vero e chi arriva capisce

✨ **novità** in `pzkko` · [AP](https://github.com/ygpzk/AP) su `main` · 4 nov 2026, 02:51 · [`fc1e92c`](https://github.com/ygpzk/AP/commit/fc1e92c9038f6e71c276df3e2653327e49240edc)

Alberto, 4.11: «in chat è buggato perché i tasti che premo danno comandi diversi da quel che hanno di nome… fai una cosa più facile, uno che non ha mai aperto il sito fa fatica a usare il flipper».

> **i file:** <b>17</b> modificati &nbsp;·&nbsp; **le righe:** <b>+900</b> in più, <b>−629</b> in meno

```diff
@@ albertopecchini.it/ @@
! pzkko/README.md  +31 −0
! pzkko/chat/comandi/eventi.js  +3 −1
! pzkko/chat/comandi/soldi.js  +8 −3
! pzkko/telefono/zero/os/REGOLE.md  +10 −0
! pzkko/telefono/zero/os/chat.js  +199 −94
! pzkko/telefono/zero/os/os.js  +78 −16
! pzkko/telefono/zero/zero.js  +3 −1
! pzkko/wiki/cronologia.js  +4 −4
! pzkko/wiki/stato.json  +4 −4
! pzkko/wiki/img/  (4 file modificati)
! pzkko/wiki/voci/cercapersone.js  +43 −25
! pzkko/wiki/voci/chat.js  +9 −5
! pzkko/wiki/voci/dati.js  +467 −467
! tools/pzkko/zero/prova.mjs  +41 −9
```

### ②&nbsp; nel README i .woff2 di Allianz Neo come si trovano nella cartella firma

📝 **documenti** in `esperimenti` · [AP](https://github.com/ygpzk/AP) su `main` · 4 nov 2026, 02:27 · [`993f5d7`](https://github.com/ygpzk/AP/commit/993f5d70b5c4f4d81e5ff366d37a0cad7aee1905)

> **i file:** <b>1</b> modificato &nbsp;·&nbsp; **le righe:** <b>+9</b> in più, <b>−4</b> in meno

```diff
@@ esperimenti/preventivo-allianz-mirtilli/ @@
! README.md  +9 −4
```
<!-- commit:fine -->

<br>

## ✦ novità

<!-- novita:inizio -->
**negli ultimi 7 giorni** 52 commit, soprattutto su `pzkko` (15), `tempo` (14), `albertopecchini.it` (6), `esperimenti` (5).

- **4 nov** · **pzkko** — nello zero i tasti dicono il vero e chi arriva capisce · [AP↗](https://github.com/ygpzk/AP/commit/fc1e92c9038f6e71c276df3e2653327e49240edc)
- **4 nov** · **esperimenti** — il preventivo dei mirtilli in PDF, con Allianz Neo incorporato · [AP↗](https://github.com/ygpzk/AP/commit/bd16ee3044dd4f38c20a94d774be2b13509f9416)
- **4 nov** · **esperimenti** — finto preventivo Allianz per i mirtilli da collezione · [AP↗](https://github.com/ygpzk/AP/commit/7df23bc7d0759e5fe8b074b5d16e5ca51adf51ee)
- **3 nov** · **cruscotto** — la regia vede tutte le sessioni di Claude, ognuna col suo stato · [AP↗](https://github.com/ygpzk/AP/commit/733905a92c4bdbce1209e17f12cac8ac8e35d6ad)
- **3 nov** · **tempo** — l'HTML vero di ogni giorno in un index leggero, e la regia di Claude per ogni lavoro · [AP↗](https://github.com/ygpzk/AP/commit/7afe6e5818208afe5800bda7cd81db7b285b91c7)
- **3 nov** · **tempo** — una pagina leggera per ogni cattura, con l'indirizzo suo · [AP↗](https://github.com/ygpzk/AP/commit/a1574d7ed1d6645a9484287f7847cfe58cf1f9b0)
<!-- novita:fine -->

<br>

## ✦ in cantiere

<!-- cantiere:inizio -->
| progetto | cos’è | ultimo push |
|:--|:--|--:|
| **[albertopecchini.it](https://www.albertopecchini.it)**<br><sub>[ygpzk/AP](https://github.com/ygpzk/AP)</sub> | il portfolio, **pzkko.it** (il muro con i social, la scena 3D, i giochi, il cercapersone zero e la pzkkopedia) e la parodia **bettercallpekko.it**: siti statici scritti a mano, con Vite e niente framework | 4 nov 2026 |
| **[rivaltasulmincio.it](https://www.rivaltasulmincio.it)**<br><sub>[ygpzk/rivaltasulmincio](https://github.com/ygpzk/rivaltasulmincio)</sub> | il sito della Pro Loco di Rivalta sul Mincio: notizie, eventi, fotografie e il borgo nel Parco del Mincio | 3 nov 2026 |
| **[ing. dario donelli](https://dariodonelli.vercel.app)**<br><sub>[ygpzk/dariodonelli-](https://github.com/ygpzk/dariodonelli-)</sub> | lo studio di ingegneria di Dario Donelli | 9 ott 2026 |
| **[cascinafontana.xyz](https://www.cascinafontana.xyz)**<br><sub>[ygpzk/cascinafontana](https://github.com/ygpzk/cascinafontana)</sub> | la Società Agricola Cascina Fontana: i prodotti, la galleria e i contatti | 27 set 2026 |
| **[questo profilo](https://github.com/ygpzk)**<br><sub>[ygpzk/ygpzk](https://github.com/ygpzk/ygpzk)</sub> | il README che stai leggendo: si riscrive da solo, con le immagini disegnate nei caratteri del sito | 4 nov 2026 |
<!-- cantiere:fine -->

<br>

## ✦ i numeri

<!-- numeri:inizio -->
<picture><source media="(prefers-color-scheme: dark)" srcset="immagini/numeri-scuro.svg?v=b3a5bdca"><img src="immagini/numeri-chiaro.svg?v=056f3d16" alt="i numeri: 0 contributi, 0 giorni di fila, 0 in un giorno solo, 5 repository" width="100%"></picture>
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
<sub>ultimo commit letto: <a href="https://github.com/ygpzk/AP/commit/fc1e92c9038f6e71c276df3e2653327e49240edc"><code>fc1e92c</code></a> del 4 nov 2026, 02:51 · il profilo si rifà da solo ogni 15 minuti</sub>
<!-- piede:fine -->
  <br>
  <sub>fatto a mano da <a href="https://www.albertopecchini.it">Alberto Pecchini</a> · <img src="https://komarev.com/ghpvc/?username=ygpzk&label=visite&color=007acc&style=flat-square" alt="visite" height="16" align="center"></sub>
</p>
