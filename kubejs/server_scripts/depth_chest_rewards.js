// Vanilla underground structure tables only. These one-time bonuses run when a
// chest's loot table is rolled, using the chest position rather than player Y.
LootJS.modifiers(event => {
  const tables = [
    'minecraft:chests/simple_dungeon',
    'minecraft:chests/abandoned_mineshaft',
    'minecraft:chests/stronghold_corridor',
    'minecraft:chests/stronghold_crossing',
    'minecraft:chests/stronghold_library'
  ]

  tables.forEach(table => {
    event.addTableModifier(table).customAction((context, loot) => {
      const position = context.getPosition()
      if (position == null) return

      const y = position.y
      const random = context.getRandom()
      if (y <= -256) {
        loot.addItem('minecraft:diamond')
        if (random.nextFloat() < 0.25) loot.addItem('minecraft:diamond')
        if (random.nextFloat() < 0.75) loot.addItem('minecraft:gold_ingot')
      } else if (y <= -192) {
        if (random.nextFloat() < 0.85) loot.addItem('minecraft:diamond')
        if (random.nextFloat() < 0.65) loot.addItem('minecraft:gold_ingot')
      } else if (y <= -128) {
        if (random.nextFloat() < 0.65) loot.addItem('minecraft:diamond')
        if (random.nextFloat() < 0.45) loot.addItem('minecraft:gold_ingot')
      } else if (y <= -64) {
        if (random.nextFloat() < 0.35) loot.addItem('minecraft:diamond')
        if (random.nextFloat() < 0.35) loot.addItem('minecraft:gold_ingot')
      } else if (y <= 16) {
        if (random.nextFloat() < 0.25) loot.addItem('minecraft:iron_ingot')
      }
    })
  })
})
