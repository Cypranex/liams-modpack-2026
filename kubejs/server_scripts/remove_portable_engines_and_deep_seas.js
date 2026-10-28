// Disable portable engines and the excluded modern/creative naval devices.
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

  const highSeasItems = [
    'boat_engine', 'seaglide'
  ]

  highSeasItems.forEach(item => {
    event.remove({ output: `create_high_seas:${item}` })
  })

  // Retain the mechanical submarine recipes. These modern/creative devices
  // remain unavailable through crafting, including third-party recipes.
  const disabledDeepSeasItems = [
    'command_sub', 'sonar', 'industrial_alarm', 'pressure_goggles',
    'underwater_mine', 'creative_oxygenator'
  ]
  disabledDeepSeasItems.forEach(item => {
    event.remove({ output: `create_submarine:${item}` })
  })
})
