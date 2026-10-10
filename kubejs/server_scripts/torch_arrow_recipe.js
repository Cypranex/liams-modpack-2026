// Ensure Quark's torch arrow follows the Flimsy Torch recipe even if resource pack order changes.
ServerEvents.recipes(event => {
  event.replaceInput(
    { id: 'quark:tools/crafting/torch_arrow' },
    'minecraft:torch',
    'flimsytorches:flimsy_torch'
  )
})
