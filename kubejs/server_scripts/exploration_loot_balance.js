// Minecraft 1.21.1 / LootJS 3.7.0. Exact tables and native pool indices audited in jars.
// New reward pools and routing live in datapacks/Exploration Loot Balance.
LootJS.lootTables(event => {
  function required(id) {
    const table = event.getLootTable(id)
    if (table == null) throw new Error('Exploration loot: missing audited table ' + id)
    return table
  }
  required('irons_spellbooks:chests/additional_generic_loot').getPool(5).when(c => c.randomChance(0.4))
  required('irons_spellbooks:chests/additional_good_loot').getPool(4).when(c => c.randomChance(0.3333333333333333))
  required('irons_spellbooks:chests/additional_treasure_loot').getPool(3).when(c => c.randomChance(0.15))
  required('irons_spellbooks:chests/additional_library_loot').getPool(3).when(c => c.randomChance(0.16))
  required('irons_spellbooks:chests/additional_nether_loot').getPool(1).when(c => c.randomChance(0.4))
  required('irons_spellbooks:chests/additional_ancient_city_loot').getPool(1).when(c => c.randomChance(0.26666666666666666))
  required('irons_spellbooks:chests/additional_end_city_loot').getPool(4).when(c => c.randomChance(0.12))
  required("betterdungeons:skeleton_dungeon/chests/common").getPool(0).rolls([1, 2])
  required("betterdungeons:skeleton_dungeon/chests/common").getPool(1).rolls(1)
  required("betterdungeons:skeleton_dungeon/chests/common").getPool(2).rolls(1)
  required("betterdungeons:spider_dungeon/chests/egg_room").getPool(1).rolls([1, 3])
  required("betterdungeons:spider_dungeon/chests/egg_room").getPool(2).rolls([1, 2])
  required("betterdungeons:spider_dungeon/chests/egg_room").getPool(3).rolls(1)
  required("betterdungeons:zombie_dungeon/chests/common").getPool(2).rolls([1, 2])
  required("betterdungeons:zombie_dungeon/chests/common").getPool(3).rolls(1)
  required("betterdungeons:zombie_dungeon/chests/tombstone").getPool(0).rolls([2, 3])
  required("betterdeserttemples:chests/food_storage").getPool(0).rolls([2, 4])
  required("betterdeserttemples:chests/wardrobe").getPool(0).rolls([1, 2])
  required("betterstrongholds:chests/armoury").getPool(0).rolls(1)
  required("betterstrongholds:chests/prison_lg").getPool(0).rolls([1, 3])
  required("betterstrongholds:chests/crypt").getPool(0).rolls([2, 3])
  required("betterstrongholds:chests/mess").getPool(0).rolls([2, 4])
  required("betterdungeons:skeleton_dungeon/chests/common").removeItem("minecraft:enchanted_golden_apple")
  required("betterdungeons:spider_dungeon/chests/egg_room").removeItem("minecraft:enchanted_golden_apple")
  required("betterdungeons:zombie_dungeon/chests/common").removeItem("minecraft:enchanted_golden_apple")
  required("betterdeserttemples:chests/food_storage").removeItem("minecraft:enchanted_golden_apple")
  required("betterstrongholds:chests/grand_library").getPool(0).rolls([1, 3])
  required("betterstrongholds:chests/library_md").getPool(0).rolls([1, 3])
  required("betterdeserttemples:chests/library").getPool(0).rolls([1, 3])
  // Limit ink/scroll bursts across multi-chest libraries and cities; retain native ink tiers.
  required('irons_spellbooks:chests/additional_library_loot').getPool(1).rolls([1, 2])
  required('irons_spellbooks:chests/additional_library_loot').getPool(4).rolls(1)
  required('irons_spellbooks:chests/additional_end_city_loot').getPool(5).rolls(1)
  required('irons_spellbooks:chests/additional_treasure_loot').getPool(4).rolls(1)
  // Farmer's Delight already supplies rope/seeds. Keep it, with fewer redundant stacks.
  required('farmersdelight:chests/fd_abandoned_mineshaft').getPool(1).rolls([0, 1])
  required('farmersdelight:chests/fd_abandoned_mineshaft').getPool(2).rolls(1)
  required('farmersdelight:chests/fd_simple_dungeon').getPool(0).rolls([0, 1])
  required('farmersdelight:chests/fd_simple_dungeon').getPool(1).rolls(1)
  // Chalk's native two-roll bonuses otherwise dominate early loot and can carry glowstone
  // inside a custom box component. Keep occasional loose coloured chalk, without boxes.
  required('chalk:chests/abandoned_mineshaft_chalks').removeItem('chalk:chalk_box')
  required('chalk:chests/abandoned_mineshaft_chalks').getPool(0).rolls(1).when(c => c.randomChance(0.08))
  required('chalk:chests/simple_dungeon_chalks').removeItem('chalk:chalk_box')
  required('chalk:chests/simple_dungeon_chalks').getPool(0).rolls(1).when(c => c.randomChance(0.08))
  required('chalk:chests/village_chalks').getPool(0).rolls(1).when(c => c.randomChance(0.08))
  // The curated desert-pyramid discovery pool already supplies regular chalk: one source.
  required('chalk:chests/desert_pyramid_chalks').getPool(0).rolls(0)
  // Dungeon Crawl 2.3.17: dense 5–8-floor structures, not one valuable bonus per room.
  const dcRegistry = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
  const dcLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
  const dcRandomItemFunction = dcRegistry.LOOT_FUNCTION_TYPE.get(dcLocation.parse('dungeoncrawl:random_item'))
  const dcFlimsy = dcRegistry.ITEM.get(dcLocation.parse('flimsytorches:flimsy_torch'))
  function dcEntries(table, gearGate, goldCount) {
    table.replaceItem('minecraft:torch', dcFlimsy)
    table.modifyItemEntry(entry => {
      const id = String(dcRegistry.ITEM.getKey(entry.getItem()))
      if (id === 'minecraft:book' && entry.getFunctions().contains(dcRegistry.LOOT_FUNCTION_TYPE.get(dcLocation.parse('minecraft:enchant_with_levels')))) {
        entry.when(c => c.randomChance(0.2))
      }
      // The native AIR entry is an actual equipment generator, not an empty reward.
      const generatedGear = entry.getFunctions().contains(dcRandomItemFunction)
      if (generatedGear || /^minecraft:golden_(helmet|chestplate|leggings|boots)$/.test(id)) {
        entry.when(c => c.randomChance(gearGate))
      }
      if (goldCount && id === 'minecraft:gold_ingot') entry.setCount([2, 6])
      return entry
    })
  }
  for (let stage = 1; stage <= 5; stage++) {
    var dcStageTable = required('dungeoncrawl:chests/stage_' + stage)
    dcStageTable.getPool(0).rolls([2, 4])
    dcEntries(dcStageTable, 0.15, false)
  }
  required('dungeoncrawl:chests/food').getPool(0).rolls([3, 5])
  const dcSupply = required('dungeoncrawl:chests/supply')
  dcSupply.getPool(0).rolls(1).when(c => c.randomChance(0.2))
  dcSupply.getPool(3).rolls([3, 5])
  // Supply gear has a single outer gate; do not apply a second equipment gate.
  dcSupply.replaceItem('minecraft:torch', dcFlimsy)
  dcSupply.getPool(3).modifyItemEntry(entry => {
    if (String(dcRegistry.ITEM.getKey(entry.getItem())) === 'minecraft:book') entry.when(c => c.randomChance(0.2))
    return entry
  })
  required('dungeoncrawl:chests/secret_room').getPool(0).rolls([2, 4])
  const dcTreasure = required('dungeoncrawl:chests/treasure')
  dcTreasure.removeItem('minecraft:enchanted_golden_apple')
  dcTreasure.getPool(0).rolls([3, 4])
  dcEntries(dcTreasure, 0.2, true)
  console.info('Exploration loot: applied audited native pool tuning, including Dungeon Crawl')
})

// Post-NeoForge guard for the generation dimension, including native mod injections.
// Item namespace rules describe dimension-exclusive content; rewards still use exact table lists.
LootJS.modifiers(event => {
  const policy = JsonIO.read('datapacks/Exploration Loot Balance/dimension-policy.json')
  if (policy == null) throw new Error('Exploration loot: missing dimension-policy.json')
  const registry = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries').ITEM
  const components = Java.loadClass('net.minecraft.core.component.DataComponents')
  const stacks = Java.loadClass('net.minecraft.world.item.ItemStack')
  const contentsType = Java.loadClass('net.minecraft.world.item.component.ItemContainerContents')
  const bundleType = Java.loadClass('net.minecraft.world.item.component.BundleContents')
  const listType = Java.loadClass('java.util.ArrayList')
  const stages = new Map()

  function minimumStage(stack) {
    const id = String(registry.getKey(stack.getItem()))
    if (stages.has(id)) return stages.get(id)
    const explicit = policy.item_stages[id]
    const namespace = policy.namespace_stages[id.substring(0, id.indexOf(':'))]
    const stage = explicit != null ? Number(explicit) : namespace != null ? Number(namespace) : 0
    stages.set(id, stage)
    return stage
  }

  function filterStack(stack, stage, depth) {
    if (stack.isEmpty() || minimumStage(stack) > stage || depth > 16) return stacks.EMPTY
    const container = stack.get(components.CONTAINER)
    if (container != null) {
      // Preserve slot positions, safe contents, names and unrelated components.
      const items = new listType()
      for (let slot = 0; slot < container.getSlots(); slot++) {
        items.add(filterStack(container.getStackInSlot(slot).copy(), stage, depth + 1))
      }
      stack.set(components.CONTAINER, contentsType.fromItems(items))
    }
    const bundle = stack.get(components.BUNDLE_CONTENTS)
    if (bundle != null) {
      const items = new listType()
      for (const item of bundle.itemsCopy()) {
        const filtered = filterStack(item, stage, depth + 1)
        if (!filtered.isEmpty()) items.add(filtered)
      }
      stack.set(components.BUNDLE_CONTENTS, new bundleType(items))
    }
    return stack
  }

  // Supplementaries converts vanilla exploration_map results to quills and raises
  // their search radius. Resolve only our marked surveys through native map APIs.
  const mapItem = Java.loadClass('net.minecraft.world.item.MapItem')
  const mapData = Java.loadClass('net.minecraft.world.level.saveddata.maps.MapItemSavedData')
  const decorations = Java.loadClass('net.minecraft.world.level.saveddata.maps.MapDecorationTypes')
  const positions = Java.loadClass('net.minecraft.core.BlockPos')
  const params = Java.loadClass('net.minecraft.world.level.storage.loot.parameters.LootContextParams')
  const tags = Java.loadClass('net.minecraft.tags.TagKey')
  const registries = Java.loadClass('net.minecraft.core.registries.Registries')
  const locations = Java.loadClass('net.minecraft.resources.ResourceLocation')
  const villages = tags.create(registries.STRUCTURE, locations.parse('minecraft:village'))
  event.addTableModifier('ctov:chests/village/village_library',
    'minecraft:chests/village/village_cartographer',
    'minecraft:chests/village/village_temple', 'ribbits:chests/sorcerer')
    .name('liams_village_surveys')
    .customAction((context, loot) => loot.modifyItems(stack => {
      const data = stack.get(components.CUSTOM_DATA)
      if (data == null || String(data.copyTag().getString('liams_loot_idea')) !== 'map') return stack
      const level = context.getLevel()
      if (String(level.getDimension()) !== 'minecraft:overworld') return null
      if (String(registry.getKey(stack.getItem())) === 'minecraft:filled_map') return stack
      const origin = context.getParamOrNull(params.ORIGIN)
      if (origin == null) return null
      const target = level.findNearestMapStructure(villages, positions.containing(origin), 8, false)
      if (target == null) return null
      const result = mapItem.create(level, target.getX(), target.getZ(), 2, true, true)
      mapItem.renderBiomePreviewMap(level, result)
      mapData.addTargetDecoration(result, target, '+', decorations.RED_X)
      const name = stack.get(components.CUSTOM_NAME)
      if (name != null) result.set(components.CUSTOM_NAME, name)
      result.set(components.CUSTOM_DATA, data)
      return result
    }))

  event.addTableModifier(LootType.CHEST, LootType.VAULT)
    .name('liams_dimension_order')
    .customAction((context, loot) => {
      const dimension = String(context.getLevel().getDimension())
      const configured = policy.dimension_stages[dimension]
      const stage = configured != null ? Number(configured) : Number(policy.unknown_dimension_stage)
      if (stage >= 3) return
      loot.modifyItems(stack => {
        const filtered = filterStack(stack, stage, 0)
        // LootBucket's nullable callback removes the entry; EMPTY would leave a phantom result.
        return filtered.isEmpty() ? null : filtered
      })
    })
  console.info('Exploration loot: registered Overworld -> Nether -> Aether -> End chest guard')
})
