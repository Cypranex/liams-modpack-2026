// Preserve material/anvil/Mending maintenance for diamond, netherite and bows.
// Exact native Aether 1.5.10 recipe IDs: no crafting or other repair methods.
// Diamond/netherite gloves follow their material tier; other Aether gear stays repairable.
ServerEvents.recipes(event => {
  const restrictedRepairs = [
    'diamond_sword',
    'diamond_pickaxe',
    'diamond_axe',
    'diamond_shovel',
    'diamond_hoe',
    'diamond_helmet',
    'diamond_chestplate',
    'diamond_leggings',
    'diamond_boots',
    'diamond_gloves',
    'netherite_sword',
    'netherite_pickaxe',
    'netherite_axe',
    'netherite_shovel',
    'netherite_hoe',
    'netherite_helmet',
    'netherite_chestplate',
    'netherite_leggings',
    'netherite_boots',
    'netherite_gloves',
    'bow'
  ]

  restrictedRepairs.forEach(item => {
    event.remove({ id: `aether:${item}_repairing` })
  })
})
