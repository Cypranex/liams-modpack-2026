// Enhanced Celestials 2 -> The Hordes. Runs once per second, on the server.
// Edit the two profiles and their weighted preset pools to tune each moon.
const EC2 = Java.loadClass('dev.corgitaco.enhancedcelestials2core.EnhancedCelestials')
const HordeSavedData = Java.loadClass('net.smileycorp.hordes.hordeevent.capability.HordeSavedData')
const HordeTableLoader = Java.loadClass('net.smileycorp.hordes.hordeevent.data.HordeTableLoader')
const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')

const BLOOD_MOON_HORDES = {
  normal: {
    waveSize: 8,
    waveIntervalTicks: 1200,
    speed: 1.0,
    presets: [
      { id: 'liamshordes:gravebound', weight: 4 },
      { id: 'liamshordes:skittering', weight: 3 },
      { id: 'liamshordes:powder_keg', weight: 2 },
      { id: 'liamshordes:forgotten', weight: 2 }
    ]
  },
  super: {
    waveSize: 13,
    waveIntervalTicks: 800,
    speed: 1.12,
    presets: [
      { id: 'liamshordes:dread_legion', weight: 3 },
      { id: 'liamshordes:nightmare_breach', weight: 3 },
      { id: 'liamshordes:shadow_hunt', weight: 2 }
    ]
  }
}

const HORDE_MARKER = 'liamsBloodMoonHorde'
const BLOOD_MOON = 'enhancedcelestials2defaultlunarevents:blood_moon'
const SUPER_BLOOD_MOON = 'enhancedcelestials2defaultlunarevents:super_blood_moon'
let bloodMoonHordeTicks = 0
let lastLoggedLunarId = null
let lastTickError = null

function moonKind(level) {
  const optional = EC2.lunarForecastWorldData(level)
  if (!optional.isPresent()) return null
  const forecast = optional.get()
  if (!forecast.isEventActive()) return null
  const holder = forecast.currentLunarEventHolder()
  if (holder == null || !holder.unwrapKey().isPresent()) return null
  const id = String(holder.unwrapKey().get().location())
  if (id !== lastLoggedLunarId) {
    console.info('[Blood Moon Hordes] Active lunar event: ' + id)
    lastLoggedLunarId = id
  }
  if (id === BLOOD_MOON) return 'normal'
  if (id === SUPER_BLOOD_MOON) return 'super'
  return null
}

function choosePreset(presets) {
  const total = presets.reduce((sum, entry) => sum + entry.weight, 0)
  let roll = Math.random() * total
  for (const entry of presets) {
    roll -= entry.weight
    if (roll < 0) return entry.id
  }
  return presets[presets.length - 1].id
}

function readHordeMarker(player) {
  const tag = player.persistentData[HORDE_MARKER]
  if (tag == null) return ''
  // KubeJS exposes persistent NBT values as tags; StringTag.toString() includes quotes.
  return String(tag).replace(/^"(.*)"$/, '$1')
}

function stopMarkedHorde(player, horde) {
  if (horde != null && horde.isActive()) {
    horde.stopEvent(player, true)
    console.info('[Blood Moon Hordes] Stopped horde for ' + player.getName().getString())
  }
  player.persistentData[HORDE_MARKER] = ''
}

function tickBloodMoonHordes(event) {
  const level = event.server.overworld()
  const kind = moonKind(level)
  const savedData = HordeSavedData.getData(level)

  for (const player of event.server.players) {
    const inOverworld = String(player.serverLevel().dimension) === 'minecraft:overworld'
    const wanted = inOverworld ? kind : null
    const marked = readHordeMarker(player)
    const horde = savedData['getEvent(net.minecraft.server.level.ServerPlayer)'](player)

    // Only stop events started by this bridge; leave admin-started hordes alone.
    if (marked && marked !== wanted) {
      console.info('[Blood Moon Hordes] Marker ' + marked + ' no longer matches ' + wanted)
      stopMarkedHorde(player, horde)
    }
    if (!wanted || readHordeMarker(player) || horde == null || horde.isActive()) continue

    const profile = BLOOD_MOON_HORDES[wanted]
    const id = choosePreset(profile.presets)
    const table = HordeTableLoader.INSTANCE.getTable(ResourceLocation.parse(id))
    if (table == null || table === HordeTableLoader.INSTANCE.getFallbackTable()) {
      if (bloodMoonHordeTicks % 200 === 0) console.error('[Blood Moon Hordes] Missing table ' + id)
      continue
    }

    horde.setSpawntable(table)
    const spawnData = horde.getSpawnData()
    spawnData.setSpawnAmount(profile.waveSize)
    spawnData.setSpawnInterval(profile.waveIntervalTicks)
    spawnData.setEntitySpeed(profile.speed)
    // Longer than either night; the bridge ends it as soon as the moon sets.
    horde.tryStartEvent(player, 24000, true)
    if (horde.isActive()) {
      player.persistentData[HORDE_MARKER] = wanted
      console.info('[Blood Moon Hordes] Started ' + wanted + ' horde ' + id + ' for ' + player.getName().getString())
    }
  }
}

ServerEvents.tick(event => {
  bloodMoonHordeTicks++
  if (bloodMoonHordeTicks % 20 !== 0) return
  try {
    tickBloodMoonHordes(event)
    lastTickError = null
  } catch (error) {
    const message = String(error)
    if (lastTickError == null || bloodMoonHordeTicks % 200 === 0) console.error('[Blood Moon Hordes] Tick failed: ' + message)
    lastTickError = message
  }
})
