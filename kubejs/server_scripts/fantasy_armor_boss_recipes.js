// Fantasy Armor 1.2.4 / Minecraft 1.21.1: replace only Moon Crystal additions.
// Retain each original selector, matching netherite base and output.
// Chestplate trophies gate full-set effects without requiring four trophy drops.
ServerEvents.recipes(event => {
  // [set, original selector, normal addition, optional chestplate addition]
  const sets = [
    ["eclipse_soldier", "minecraft:gold_nugget", "cataclysm:cursium_ingot", "cataclysm:void_core"],
    ["dragonslayer", "minecraft:nether_wart", "cataclysm:ignitium_ingot", "cataclysm:monstrous_horn"],
    ["hero", "minecraft:iron_ingot", "cataclysm:witherite_ingot", "minecraft:nether_star"],
    ["golden_horns", "minecraft:flint", "cataclysm:witherite_ingot"],
    ["thief", "minecraft:leather", "cataclysm:essence_of_the_storm"],
    ["wandering_wizard", "minecraft:spider_eye", "cataclysm:lava_power_cell"],
    ["chess_board_knight", "minecraft:honeycomb", "cataclysm:witherite_ingot", "cataclysm:remnant_skull"],
    ["dark_lord", "minecraft:bone", "cataclysm:cursium_ingot", "cataclysm:void_core"],
    ["sunset_wings", "minecraft:gunpowder", "cataclysm:essence_of_the_storm"],
    ["fog_guard", "minecraft:phantom_membrane", "cataclysm:ignitium_ingot", "cataclysm:remnant_skull"],
    ["dark_cover", "minecraft:coal", "cataclysm:cursium_ingot", "minecraft:nether_star"],
    ["spark_of_dawn", "minecraft:amethyst_shard", "cataclysm:ignitium_ingot"],
    ["golden_execution", "minecraft:ender_pearl", "cataclysm:witherite_ingot", "cataclysm:remnant_skull"],
    ["forgotten_trace", "minecraft:prismarine_crystals", "cataclysm:witherite_ingot", "minecraft:nether_star"],
    ["redeemer", "minecraft:emerald", "cataclysm:ignitium_ingot"],
    ["twinned", "minecraft:quartz", "cataclysm:witherite_ingot", "minecraft:nether_star"],
    ["gilded_hunt", "minecraft:raw_gold", "cataclysm:essence_of_the_storm"],
    ["lady_maria", "minecraft:feather", "cataclysm:cursium_ingot"],
    ["crucible_knight", "minecraft:blaze_powder", "cataclysm:ignitium_ingot", "cataclysm:monstrous_horn"],
    ["evening_ghost", "minecraft:dried_kelp", "cataclysm:cursium_ingot"],
    ["ronin", "minecraft:sugar_cane", "cataclysm:witherite_ingot"],
    ["malenia", "minecraft:ghast_tear", "cataclysm:essence_of_the_storm"],
    ["old_knight", "minecraft:obsidian", "cataclysm:witherite_ingot", "cataclysm:monstrous_horn"],
    ["silver_knight", "minecraft:snowball", "cataclysm:witherite_ingot"],
    ["dead_gladiator", "minecraft:red_sand", "cataclysm:cursium_ingot"],
    ["flesh_of_the_feaster", "minecraft:slime_ball", "cataclysm:witherite_ingot", "cataclysm:monstrous_horn"],
    ["wind_worshipper", "minecraft:paper", "cataclysm:essence_of_the_storm"],
    ["grave_sentinel", "minecraft:lily_of_the_valley", "cataclysm:lava_power_cell"],
    ["ornstein", "minecraft:gold_ingot", "cataclysm:cursium_ingot", "cataclysm:remnant_skull"],
  ]

  const slots = ['helmet', 'chestplate', 'leggings', 'boots']
  sets.forEach(set => {
    slots.forEach(slot => {
      const id = 'fantasy_armor:' + set[0] + '_' + slot
      const addition = slot === 'chestplate' && set[3] ? set[3] : set[2]
      event.remove({ id: id })
      event.custom({
        type: 'minecraft:smithing_transform',
        category: 'equipment',
        template: { item: set[1] },
        base: { item: 'minecraft:netherite_' + slot },
        addition: { item: addition },
        result: { id: id }
      }).id(id)
    })
  })
  console.info('Fantasy Armor: replaced all 116 armor smithing recipes with boss additions')
})
