// Remove the requested items' recipes without touching Create High Seas.
// Deep Seas and High Seas share a jar, but use separate recipe/item namespaces.
ServerEvents.recipes(event => {
  const colors = [
    'black', 'blue', 'brown', 'cyan', 'gray', 'green', 'light_blue',
    'light_gray', 'lime', 'magenta', 'orange', 'pink', 'purple', 'red',
    'white', 'yellow'
  ]

  // Covers the base engine and every colored output, including recipes added
  // by other mods. The dyeing recipe has no fixed output, so remove it by ID.
  colors.forEach(color => {
    event.remove({ output: `simulated:${color}_portable_engine` })
  })
  event.remove({ id: 'simulated:crafting/portable_engine_dyeing' })

  // The mod's own recipes include custom recipe types whose outputs cannot
  // always be matched by an item-output filter.
  event.remove({ mod: 'create_submarine' })

  // Also catch recipes for Deep Seas items supplied by other mods or packs.
  // This is the item/block-item set shipped by Create Deep Seas 3.3.0.
  const deepSeasItems = [
    'arresting_hook', 'ballast_tank', 'ballast_vent', 'barometer',
    'command_sub', 'copper_pressurizer', 'creative_oxygenator',
    'decompression_chamber', 'electrolyzer', 'floater',
    'industrial_alarm', 'iron_pressurizer', 'oxygen_bucket',
    'oxygene_diffuser', 'phycological_membrane', 'pulley',
    'pump_controller', 'rockcutting_wheel', 'sonar', 'steel_cable',
    'submarine_propeller', 'submarine_staff', 'underwater_mine',
    'water_thruster'
  ]
  deepSeasItems.forEach(item => {
    event.remove({ output: `create_submarine:${item}` })
  })
})
