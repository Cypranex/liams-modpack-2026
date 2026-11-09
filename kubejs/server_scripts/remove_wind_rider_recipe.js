// Disable Wind Rider crafting while preserving existing items and flight settings.
ServerEvents.recipes(event => {
  event.remove({ type: 'minecraft:crafting_shaped', output: 'aeronauticswinds:wind_rider' })
  event.remove({ type: 'minecraft:crafting_shapeless', output: 'aeronauticswinds:wind_rider' })
})
