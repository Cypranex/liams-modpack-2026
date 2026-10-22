// CBC 5.11.7 has no config switches for disabling weapon families.
// Keep muzzle-loaded siege cannons, smoke/fluid shells, and timed/wired fuzes.
// All breeches are intentionally removed, including steel/nethersteel screw
// breeches: those materials/parts remain obtainable, but their cannons cannot
// be completed without a future source of closed ends in those materials.
ServerEvents.recipes(event => {
  const disabled = /^createbigcannons:.*(autocannon|machine_gun|cartridge|tracer|sliding_breech|screw_breech|screw_lock|quickfiring|recoil_spring|spring_wire|ap_shot|ap_shell|he_shell|shrapnel_shell|proximity_fuze|impact_fuze|inertia_fuze|drop_mortar|gas_mask|traffic_cone).*$/

  // IDs cover dynamic cartridge assembly/filling and tracer application,
  // which do not declare fixed outputs. Output matching also catches recipes
  // supplied by other namespaces (including CBC's minecraft: mirrored recipe).
  event.remove({ id: disabled })
  event.remove({ output: disabled })

  // Casting/boring are NOT ordinary recipes and cannot be removed here.
  // Recipe Restrictions/pack.mcmeta filters their resource files instead.

  // The armor inspection tool originally needs an autocannon recoil spring.
  // Preserve this utility with an amethyst measuring probe instead.
  event.remove({ id: 'createbigcannons:block_armor_inspection_tool' })
  event.custom({
    type: 'minecraft:crafting_shaped',
    category: 'equipment',
    pattern: ['M', 'A', 'P'],
    key: {
      M: { item: 'create:precision_mechanism' },
      A: { item: 'minecraft:amethyst_shard' },
      P: { item: 'minecraft:iron_bars' }
    },
    result: { id: 'createbigcannons:block_armor_inspection_tool', count: 1 }
  }).id('createbigcannons:block_armor_inspection_tool')

  event.remove({ output: 'createbigcannons:smoke_shell' })
  event.custom({
    type: 'minecraft:crafting_shaped',
    category: 'misc',
    pattern: ['PCP', 'PBP', 'PIP'],
    key: {
      P: { tag: 'c:plates/iron' },
      C: { item: 'minecraft:charcoal' },
      B: { item: 'minecraft:blaze_powder' },
      I: { tag: 'c:ingots/iron' }
    },
    result: { id: 'createbigcannons:smoke_shell', count: 1 }
  }).id('createbigcannons:smoke_shell')

  // Preserve the mechanical-crafting stage. Glass bottles replace the pipes
  // as alchemical reservoirs, sealed with slime. The shell is crafted empty;
  // fill it with water, lava, or potion fluid before attaching its timed fuze.
  event.remove({ output: 'createbigcannons:fluid_shell' })
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: true,
    category: 'misc',
    pattern: [' I ', 'IBI', 'IBI', ' S '],
    key: {
      I: { tag: 'c:ingots/iron' },
      B: { item: 'minecraft:glass_bottle' },
      S: { item: 'minecraft:slime_ball' }
    },
    result: { id: 'createbigcannons:fluid_shell', count: 1 }
  }).id('createbigcannons:fluid_shell')
})
