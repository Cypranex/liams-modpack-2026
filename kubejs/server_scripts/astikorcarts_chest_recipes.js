// Allow any chest in AstikorCarts Redux recipes, including modded variants.
ServerEvents.recipes(event => {
  event.replaceInput(
    { mod: 'astikorcartsredux' },
    'minecraft:chest',
    '#c:chests'
  )
})
