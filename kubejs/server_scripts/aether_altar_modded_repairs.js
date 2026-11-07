// Explicit low-tier repair allowlist. Match native Aether repair times in ticks.
// No diamond/netherite, bows, unique weapons or blanket mod/tag matching.
ServerEvents.recipes(event => {
  function repair(item, ticks, group) {
    event.custom({
      type: 'aether:repairing',
      group: group,
      ingredient: { item: item },
      repairTime: ticks
    }).id(`liams_modpack:altar_repair/${item.replace(':', '/')}`)
  }

  const weaponTypes = [
    'longsword', 'twinblade', 'rapier', 'katana', 'sai',
    'spear', 'glaive', 'warglaive', 'cutlass', 'claymore',
    'greathammer', 'greataxe', 'chakram', 'scythe', 'halberd'
  ]

  weaponTypes.forEach(weapon => {
    repair(`simplyswords:iron_${weapon}`, 750, 'altar_sword_repair')
    repair(`simplyswords:gold_${weapon}`, 300, 'altar_sword_repair')
  })

  repair('farmersdelight:flint_knife', 500, 'altar_knife_repair')
  repair('farmersdelight:iron_knife', 750, 'altar_knife_repair')
  repair('farmersdelight:golden_knife', 300, 'altar_knife_repair')

  repair('shieldexp:wooden_shield', 250, 'altar_shield_repair')
  repair('shieldexp:iron_shield', 750, 'altar_shield_repair')
  repair('shieldexp:golden_shield', 300, 'altar_shield_repair')

  // Approved utility additions; copper diving gear remains excluded.
  repair('farmersdelight:skillet', 750, 'altar_skillet_repair')
  repair('betterarcheology:iron_brush', 750, 'altar_brush_repair')

  repair('tide:stone_fishing_rod', 500, 'altar_fishing_rod_repair')
  repair('tide:iron_fishing_rod', 750, 'altar_fishing_rod_repair')
  repair('tide:golden_fishing_rod', 300, 'altar_fishing_rod_repair')

  repair('betterend:iron_hammer', 750, 'altar_hammer_repair')
  repair('betterend:golden_hammer', 300, 'altar_hammer_repair')

  const silverEquipment = [
    'sword', 'pickaxe', 'axe', 'shovel', 'hoe',
    'helmet', 'chestplate', 'leggings', 'boots'
  ]
  silverEquipment.forEach(equipment => {
    repair(`caverns_and_chasms:silver_${equipment}`, 750, 'altar_silver_repair')
  })
})
