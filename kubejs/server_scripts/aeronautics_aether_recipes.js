// Keep Simulated's Physics Assembler available for Create Deep Seas. Gate the
// Aeronautics parts that provide thrust or lift behind Aether materials.
ServerEvents.recipes(event => {
  const gravitite = { item: 'aether:enchanted_gravitite' }
  const aercloud = { item: 'aether:cold_aercloud' }

  function replace(id, recipe) {
    event.remove({ id: id })
    event.custom(recipe).id(id)
  }

  function shaped(id, pattern, key, output, count) {
    replace(id, {
      type: 'minecraft:crafting_shaped',
      category: 'misc',
      pattern: pattern,
      key: key,
      result: { id: output, count: count || 1 }
    })
  }

  shaped('aeronautics:andesite_propeller', ['PE', 'C ', 'S '], {
    P: { item: 'create:propeller' },
    E: gravitite,
    C: { tag: 'minecraft:wooden_slabs' },
    S: { item: 'create:shaft' }
  }, 'aeronautics:andesite_propeller')

  shaped('aeronautics:smart_propeller', ['PE', 'G ', 'B '], {
    P: { item: 'create:propeller' },
    E: gravitite,
    G: { item: 'simulated:gyroscopic_mechanism' },
    B: { item: 'create:brass_casing' }
  }, 'aeronautics:smart_propeller', 2)

  shaped('aeronautics:propeller_bearing', [' AE', ' S ', ' B '], {
    A: { tag: 'minecraft:wooden_slabs' },
    E: gravitite,
    S: { tag: 'c:plates/iron' },
    B: { item: 'create:brass_casing' }
  }, 'aeronautics:propeller_bearing')

  shaped('aeronautics:gyroscopic_propeller_bearing', [' AE', ' G ', ' B '], {
    A: { tag: 'minecraft:wooden_slabs' },
    E: gravitite,
    G: { item: 'simulated:gyroscopic_mechanism' },
    B: { item: 'create:brass_casing' }
  }, 'aeronautics:gyroscopic_propeller_bearing')

  shaped('aeronautics:adjustable_burner', ['SES', 'SCS', 'ARA'], {
    S: { tag: 'c:plates/iron' },
    E: gravitite,
    C: { tag: 'aeronautics:burner_fire' },
    A: { item: 'create:andesite_alloy' },
    R: { tag: 'c:dusts/redstone' }
  }, 'aeronautics:adjustable_burner')

  shaped('aeronautics:steam_vent', ['G', 'C', 'E'], {
    G: { tag: 'c:plates/gold' },
    C: { item: 'minecraft:copper_block' },
    E: gravitite
  }, 'aeronautics:steam_vent')

  replace('aeronautics:mixing/levitite_blend', {
    type: 'create:mixing',
    heat_requirement: 'heated',
    ingredients: [
      { item: 'aeronautics:end_stone_powder' },
      { item: 'aeronautics:end_stone_powder' },
      { item: 'aeronautics:end_stone_powder' },
      { item: 'aeronautics:end_stone_powder' },
      { item: 'create:zinc_nugget' },
      { item: 'create:zinc_nugget' },
      gravitite,
      { type: 'neoforge:tag', amount: 500, tag: 'c:water' }
    ],
    results: [{ id: 'aeronautics:levitite_blend', amount: 500 }]
  })

  const colors = [
    'black', 'blue', 'brown', 'cyan', 'gray', 'green', 'light_blue',
    'light_gray', 'lime', 'magenta', 'orange', 'pink', 'purple', 'red',
    'white', 'yellow'
  ]

  colors.forEach(color => {
    const envelope = `aeronautics:${color}_envelope`
    const wool = `minecraft:${color}_wool`

    // The original crafting recipe uses two wool and two sticks.
    replace(envelope, {
      type: 'minecraft:crafting_shaped',
      category: 'misc',
      group: 'aeronautics:envelope',
      pattern: ['WSA', 'SW '],
      key: {
        W: { item: wool },
        S: { item: 'minecraft:stick' },
        A: aercloud
      },
      result: { id: envelope, count: 4 }
    })

    // Create deploying accepts only two ingredients, so cold aercloud takes
    // the held-item slot previously occupied by the stick.
    replace(`aeronautics:deploying/deploying_envelope_${color}`, {
      type: 'create:deploying',
      ingredients: [{ item: wool }, aercloud],
      results: [{ id: envelope, count: 3 }]
    })
  })

})
