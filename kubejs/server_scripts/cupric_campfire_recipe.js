// Upgrade a normal campfire with a copper ingot placed directly above it.
ServerEvents.recipes(event => {
  event.remove({ id: 'caverns_and_chasms:cupric_campfire' })
  event.shaped('caverns_and_chasms:cupric_campfire', ['C', 'F'], {
    C: 'minecraft:copper_ingot',
    F: 'minecraft:campfire'
  }).id('caverns_and_chasms:cupric_campfire')
})
