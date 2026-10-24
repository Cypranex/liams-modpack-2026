// Only the 15 selected Iron's Spellbooks accessories are loot-only.
// The mod shares the exact explicit item list with its merchant-sale filter.
// Spellbooks, Silver Ring, Invisibility Ring, and all other unlisted items are excluded.
// Remove every recipe type producing a matching item, including crafting and upgrades.
ServerEvents.recipes(event => {
  const registry = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ITEM
  const rings = Java.loadClass('dev.liam.ringdurability.RingDurability')
  let blocked = 0
  registry.keySet().forEach(key => {
    const id = key.toString()
    if (id.startsWith('irons_spellbooks:') && rings.isLootOnlyCurio(Item.of(id))) {
      event.remove({ output: id })
      blocked++
    }
  })
  console.info(`Loot-only recipe filter covers ${blocked} Iron's Spellbooks Curios items`)
})
