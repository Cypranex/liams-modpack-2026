// End expedition materials reinforce Create's mechanical submarine equipment.
// Floater recipes and their color components remain exactly as shipped.
ServerEvents.recipes(event => {
  const thallasium = { item: 'betterend:thallasium_ingot' }
  const endPlant = { tag: 'liams_modpack:end_membrane_plants' }

  function shaped(name, pattern, key, count) {
    const id = `create_submarine:${name}`
    event.remove({ id: id })
    event.custom({
      type: 'minecraft:crafting_shaped',
      category: name.startsWith('diving_') ? 'equipment' : 'misc',
      pattern: pattern,
      key: key,
      result: { id: id, count: count || 1 }
    }).id(id)
  }

  shaped('ballast_tank', ['AIE', 'ITI', 'EIA'], {
    A: { item: 'create:andesite_alloy' },
    E: { item: 'minecraft:end_stone_bricks' },
    I: { item: 'create:iron_sheet' },
    T: { item: 'create:fluid_tank' }
  })
  shaped('ballast_vent', ['nCn', 'CnC', 'nCn'], {
    n: { item: 'betterend:thallasium_nugget' },
    C: { item: 'minecraft:copper_block' }
  })
  shaped('submarine_propeller', [' PT', ' I ', ' S '], {
    P: { item: 'create:propeller' }, T: thallasium,
    I: { item: 'create:industrial_iron_block' },
    S: { item: 'create:shaft' }
  })
  shaped('water_thruster', [' P ', 'CWC', 'CTC'], {
    P: { item: 'create:mechanical_pump' },
    C: { item: 'minecraft:copper_block' },
    W: { item: 'create:propeller' }, T: thallasium
  })
  shaped('pump_controller', [' C ', 'CMC', 'ETC'], {
    C: { item: 'minecraft:copper_block' },
    M: { item: 'create:mechanical_pump' },
    T: { item: 'create:transmitter' }, E: thallasium
  })
  shaped('decompression_chamber', ['SGS', 'GPG', 'TGT'], {
    S: { item: 'create:copper_sheet' }, T: thallasium,
    G: { tag: 'c:glass_blocks' },
    P: { item: 'create:mechanical_pump' }
  })
  shaped('electrolyzer', ['GSG', 'CEC', 'CTC'], {
    G: { item: 'minecraft:glass' },
    S: { item: 'simulated:spring' },
    C: { item: 'minecraft:copper_block' },
    E: { item: 'create:electron_tube' },
    T: { item: 'betterend:terminite_ingot' }
  })
  // The recipe ID is oxygen_diffuser; the registered item uses oxygene_diffuser.
  event.remove({ id: 'create_submarine:oxygen_diffuser' })
  event.custom({
    type: 'minecraft:crafting_shaped', category: 'misc',
    pattern: ['FP ', 'LNL', 'EDE'],
    key: {
      F: endPlant, P: { item: 'create:propeller' },
      L: { item: 'create:redstone_link' }, N: { item: 'create:nozzle' },
      E: { item: 'create:electron_tube' }, D: { item: 'create:item_drain' }
    },
    result: { id: 'create_submarine:oxygene_diffuser', count: 1 }
  }).id('create_submarine:oxygen_diffuser')

  event.remove({ id: 'create_submarine:phycological_membrane' })
  event.custom({
    type: 'create:pressing', ingredients: [endPlant],
    results: [{ id: 'create_submarine:phycological_membrane', count: 2 }]
  }).id('create_submarine:phycological_membrane')

  shaped('copper_pressurizer', ['GGG', 'GCG', 'GE '], {
    G: { item: 'minecraft:glass' }, C: { item: 'minecraft:copper_ingot' },
    E: { item: 'minecraft:popped_chorus_fruit' }
  }, 8)
  shaped('iron_pressurizer', ['GGG', 'GCG', 'GE '], {
    G: { item: 'minecraft:glass' }, C: { item: 'create:industrial_iron_block' },
    E: thallasium
  }, 8)
  shaped('steel_cable', [' F ', 'IRI', 'ISI'], {
    F: { item: 'betterend:silk_fiber' }, I: { item: 'create:iron_sheet' },
    R: { item: 'simulated:rope_coupling' }, S: { item: 'simulated:spring' }
  }, 4)
  shaped('pulley', [' P ', 'TGT', 'III'], {
    P: { item: 'create:iron_sheet' }, T: thallasium,
    G: { item: 'simulated:gyroscopic_mechanism' }, I: { item: 'minecraft:iron_ingot' }
  })
  shaped('arresting_hook', ['TCT', ' N ', ' H '], {
    T: thallasium, C: { item: 'create:andesite_casing' },
    N: { item: 'minecraft:chain' }, H: { item: 'minecraft:tripwire_hook' }
  })
  shaped('diving_chestplate', ['P P', 'PTP', 'PPP'], {
    P: { tag: 'c:ingots/copper' }, T: thallasium
  })
  shaped('diving_leggings', ['PTP', 'P P', 'P P'], {
    P: { tag: 'c:ingots/copper' }, T: thallasium
  })
})
