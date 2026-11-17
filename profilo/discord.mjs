// pzkko su Discord, dal vivo: lo stato, lo stato personalizzato e cosa sta
// facendo arrivano da Lanyard (api.lanyard.rest, perché pzkko è nel suo server);
// tema, banner, badge e collegamenti dal profilo pubblico (dcdn.dstn.to). Le
// immagini entrano nell'SVG come data URI: dentro un <img> GitHub non ne carica
// altre. Il campo «pronomi» del profilo non si legge mai.

export const DISCORD_ID = '459791358899519498'

const UA = { 'user-agent': 'ygpzk-profilo' }

async function json(url) {
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) })
    return r.ok ? await r.json() : null
  } catch {
    return null
  }
}

/** Un'immagine come data URI, o null se non arriva o pesa troppo. */
async function immagine(url, max = 120_000) {
  if (!url) return null
  try {
    const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(15000) })
    if (!r.ok) return null
    const tipo = (r.headers.get('content-type') || 'image/png').split(';')[0]
    if (!tipo.startsWith('image/')) return null
    const b = Buffer.from(await r.arrayBuffer())
    return b.length > max ? null : `data:${tipo};base64,${b.toString('base64')}`
  } catch {
    return null
  }
}

const esa = (n) => `#${Number(n).toString(16).padStart(6, '0')}`

/** L'immagine grande di un'attività (gioco, film…), nei formati di Discord. */
function urlAttivita(a) {
  const img = a.assets?.large_image
  if (img?.startsWith('mp:')) return `https://media.discordapp.net/${img.slice(3)}?width=96&height=96`
  if (img && a.application_id && /^\d+$/.test(img)) return `https://cdn.discordapp.com/app-assets/${a.application_id}/${img}.png?size=96`
  if (a.application_id) return `https://dcdn.dstn.to/app-icons/${a.application_id}?size=96`
  return null
}

/** Tutto quello che serve alla scheda di pzkko, o null se Discord non risponde. */
export async function discord(id = DISCORD_ID) {
  const [lanyard, profilo] = await Promise.all([json(`https://api.lanyard.rest/v1/users/${id}`), json(`https://dcdn.dstn.to/profile/${id}`)])
  const p = lanyard?.success ? lanyard.data : null
  const u = p?.discord_user || profilo?.user
  if (!u) return null
  const up = profilo?.user_profile || {}

  const tema = up.theme_colors?.length === 2 ? up.theme_colors.map(esa) : ['#ccff00', '#9d00ff']
  const banner = profilo?.user?.banner || up.banner
  const gilda = u.primary_guild?.identity_enabled && u.primary_guild.tag ? u.primary_guild : null
  const attivita = p?.activities || []
  const personale = attivita.find((a) => a.type === 4)
  const gioco = attivita.find((a) => [0, 1, 3, 5].includes(a.type))
  const s = p?.listening_to_spotify ? p.spotify : null

  const [avatar, sfondo, tag, badge, copertina, icona] = await Promise.all([
    u.avatar ? immagine(`https://cdn.discordapp.com/avatars/${id}/${u.avatar}.webp?size=256`) : null,
    banner ? immagine(`https://cdn.discordapp.com/banners/${id}/${banner}.webp?size=600`) : null,
    gilda?.badge ? immagine(`https://cdn.discordapp.com/guild-tag-badges/${gilda.identity_guild_id}/${gilda.badge}.png?size=32`) : null,
    Promise.all((profilo?.badges || []).slice(0, 10).map(async (b) => ({ id: b.id, descrizione: b.description, img: await immagine(`https://cdn.discordapp.com/badge-icons/${b.icon}.png`) }))),
    s?.album_art_url ? immagine(s.album_art_url.replace('ab67616d0000b273', 'ab67616d00004851')) : null,
    gioco ? immagine(urlAttivita(gioco)) : null,
  ])

  return {
    id,
    nome: u.global_name || u.display_name || u.username,
    utente: u.username,
    stato: p?.discord_status || 'offline',
    dove: p ? ['desktop', 'mobile', 'web'].filter((k) => p[`active_on_discord_${k}`]) : [],
    personale: personale ? { testo: personale.state || '', emoji: personale.emoji?.id ? null : personale.emoji?.name || null } : null,
    spotify: s ? { canzone: s.song, artista: s.artist, album: s.album, img: copertina } : null,
    gioco: gioco ? { tipo: gioco.type, nome: gioco.name, dettagli: gioco.details || '', stato: gioco.state || '', img: icona } : null,
    tema,
    avatar,
    banner: sfondo,
    tag: gilda ? { testo: gilda.tag, img: tag } : null,
    badge: badge.filter((b) => b.img),
    collegamenti: (profilo?.connected_accounts || []).map((c) => ({ tipo: c.type, nome: c.name })),
    // il giorno in cui è nato l'account sta scritto nell'ID (snowflake)
    dal: new Date(Number((BigInt(id) >> 22n) + 1420070400000n)).toISOString().slice(0, 10),
  }
}
