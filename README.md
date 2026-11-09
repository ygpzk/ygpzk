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
### ①&nbsp; la macchinetta delle sigarette sulla serranda e pzkko.it/deutschland, la galleria del viaggio a Monaco e Stoccarda con JMA

✨ **novità** in `pzkko` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 9 nov 2026, 11:23 · [`0a2e5e8`](https://github.com/ygpzk/AP/commit/0a2e5e8ce77528ffc59653688d218c0127f50597)

Sul muro, nel primo schermo, un vecchio Zigarettenautomat con lo schermo (le tappe pixelate) e i nostri pacchetti nelle vetrinette; al click la vernice cola giù, nera, e scopre /deutschland/: la macchinetta da vicino chiede la password, controllata a casa dalla banca (scrypt, limiti) che dà un biglietto HMAC per il…

> **i file:** <b>11</b> modificati + <b>59</b> aggiunti &nbsp;·&nbsp; **le righe:** <b>+4497</b> in più, <b>−471</b> in meno

```diff
@@ albertopecchini.it/ @@
! .gitignore  +3 −0
! package-lock.json  +8 −0
! package.json  +1 −0
! pzkko/index.html  +9 −0
! pzkko/wiki/cronologia.js  +4 −4
! pzkko/wiki/stato.json  +6 −6
! pzkko/wiki/voci.js  +2 −1
! pzkko/wiki/voci/dati.js  +460 −460
! tools/pzkko/bot/bot.mjs  +1 −0
! tools/pzkko/disposizione.js  +4 −0
! tools/pzkko/wiki/README.md  +4 −0
+ api/deutschland.js  +4 −0
+ pzkko/api/deutschland.mjs  +8 −0
# … e altre 8 righe come queste
```

### ②&nbsp; la saracinesca alleggerita, solo 2D (6.11)

✨ **novità** in `pzkko` · [AP](https://github.com/ygpzk/AP) su `albertopecchini.it` · 9 nov 2026, 11:21 · [`39d41eb`](https://github.com/ygpzk/AP/commit/39d41eb219a13a3d69bfb7ef70ca9b1fd81ccb6c)

La home di pzkko.it diventa solo 2D e leggera: restano wallet, cercapersone, i sei volantini dei social rifatti (sparsi a caso col seme, mai coperti oltre il 10%, tre per riga sul telefono) e la petizione in fondo sopra tutto. Via il 3D (anche dalla regia e dallo scontrino, ora 4.1.0 «serranda leggera»), le…

> **i file:** <b>18</b> modificati + <b>34</b> aggiunti &nbsp;·&nbsp; **le righe:** <b>+1537</b> in più, <b>−1958</b> in meno

```diff
! .claude/skills/serranda/SKILL.md  +57 −50
! albertopecchini.it/pzkko/  (4 file modificati)
! albertopecchini.it/pzkko/benvenuto/benvenuto.js  +14 −37
! albertopecchini.it/pzkko/petizione/petizione.js  +14 −0
! albertopecchini.it/pzkko/regia/regia.js  +4 −10
! albertopecchini.it/pzkko/storia/index.html  +226 −408
! albertopecchini.it/pzkko/wiki/voci/scena.js  +4 −2
! albertopecchini.it/pzkko/wiki/voci/sito.js  +114 −22
! albertopecchini.it/tools/pzkko/  (6 file modificati)
! albertopecchini.it/vercel.json  +4 −0
+ albertopecchini.it/pzkko/art/leggere/  (8 file aggiunti)
+ albertopecchini.it/pzkko/art/social/  (6 file aggiunti)
+ albertopecchini.it/pzkko/fonts/sub/  (17 file aggiunti)
# … e altre 3 righe come queste
```
<!-- commit:fine -->

<br>

## ✦ novità

<!-- novita:inizio -->
**negli ultimi 7 giorni** 60 commit, soprattutto su `tempo` (14), `pzkko` (12), `wiki` (5), `esperimenti` (5).

- **9 nov** · **pzkko** — la macchinetta delle sigarette sulla serranda e pzkko.it/deutschland, la galleria del viaggio a Monaco e Stoccarda con JMA · [AP↗](https://github.com/ygpzk/AP/commit/0a2e5e8ce77528ffc59653688d218c0127f50597)
- **9 nov** · **pzkko** — la saracinesca alleggerita, solo 2D (6.11) · [AP↗](https://github.com/ygpzk/AP/commit/39d41eb219a13a3d69bfb7ef70ca9b1fd81ccb6c)
- **6 nov** · **tools** — il bot dei bug di pzkko, che gira da solo a ogni push e due volte al giorno sul sito vero · [AP↗](https://github.com/ygpzk/AP/commit/541f48c30f3af574ade064e9d6b7e631dd1f0b91)
- **6 nov** · **tools** — il bot dei bug di pzkko, che gira da solo a ogni push e due volte al giorno sul sito vero · [AP↗](https://github.com/ygpzk/AP/commit/99f4342423d67aa70a54b1a8b0ab31369e4a6af4)
- **6 nov** · **pzkko** — il cartello della manutenzione sul muro della stazione di Monaco, e il sito chiuso fino a domenica alle 14 · [AP↗](https://github.com/ygpzk/AP/commit/7d95b08b368dfa2b692aa79267988a43db1db987)
- **5 nov** · **pzkko** — il file di verifica del dominio per Discord in /.well-known/discord · [AP↗](https://github.com/ygpzk/AP/commit/7032f2e453acd304cc0027492c5e5af668c9232c)
<!-- novita:fine -->

<br>

## ✦ in cantiere

<!-- cantiere:inizio -->
| progetto | cos’è | ultimo push |
|:--|:--|--:|
| **[albertopecchini.it](https://www.albertopecchini.it)**<br><sub>[ygpzk/AP](https://github.com/ygpzk/AP)</sub> | il portfolio, **pzkko.it** (il muro con i social, la scena 3D, i giochi, il cercapersone zero e la pzkkopedia) e la parodia **bettercallpekko.it**: siti statici scritti a mano, con Vite e niente framework | 9 nov 2026 |
| **[rivaltasulmincio.it](https://www.rivaltasulmincio.it)**<br><sub>[ygpzk/rivaltasulmincio](https://github.com/ygpzk/rivaltasulmincio)</sub> | il sito della Pro Loco di Rivalta sul Mincio: notizie, eventi, fotografie e il borgo nel Parco del Mincio | 3 nov 2026 |
| **[ing. dario donelli](https://dariodonelli.vercel.app)**<br><sub>[ygpzk/dariodonelli-](https://github.com/ygpzk/dariodonelli-)</sub> | lo studio di ingegneria di Dario Donelli | 9 ott 2026 |
| **[cascinafontana.xyz](https://www.cascinafontana.xyz)**<br><sub>[ygpzk/cascinafontana](https://github.com/ygpzk/cascinafontana)</sub> | la Società Agricola Cascina Fontana: i prodotti, la galleria e i contatti | 27 set 2026 |
| **[questo profilo](https://github.com/ygpzk)**<br><sub>[ygpzk/ygpzk](https://github.com/ygpzk/ygpzk)</sub> | il README che stai leggendo: si riscrive da solo, con le immagini disegnate nei caratteri del sito | 9 nov 2026 |
<!-- cantiere:fine -->

<br>

## ✦ i numeri

<!-- numeri:inizio -->
<picture><source media="(prefers-color-scheme: dark)" srcset="immagini/numeri-scuro.svg?v=c705a4f9"><img src="immagini/numeri-chiaro.svg?v=703480f6" alt="i numeri: 0 contributi, 0 giorni di fila, 0 in un giorno solo, 5 repository" width="100%"></picture>
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
<sub>ultimo commit letto: <a href="https://github.com/ygpzk/AP/commit/0a2e5e8ce77528ffc59653688d218c0127f50597"><code>0a2e5e8</code></a> del 9 nov 2026, 11:23 · il profilo si rifà da solo ogni 15 minuti</sub>
<!-- piede:fine -->
  <br>
  <sub>fatto a mano da <a href="https://www.albertopecchini.it">Alberto Pecchini</a> · <img src="https://komarev.com/ghpvc/?username=ygpzk&label=visite&color=007acc&style=flat-square" alt="visite" height="16" align="center"></sub>
</p>
