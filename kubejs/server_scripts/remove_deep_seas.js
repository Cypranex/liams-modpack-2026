// Disable the excluded modern/creative naval devices.
// Portable engines retain their native crafting and dyeing recipes.
// Deep Seas and High Seas share a jar, but use separate recipe/item namespaces.
ServerEvents.recipes(event => {
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
