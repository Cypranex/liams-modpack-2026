# Exploration loot balance — current reference

Minecraft 1.21.1 / NeoForge 21.1.264. The pack source is authoritative; Local Testing receives matching copies through the established unpacked-Paxi workflow.

Agent maintenance policy: [AGENTS.md](AGENTS.md). Read it for loot rules and the required add/update/remove-mod audit, dimension classification, cleanup, validation and deployment workflow. The repository-root agent instructions also direct mod/config/script work here.

## Current scope

This second pass expands **56 → 330 exact recipient tables**, with **22 reward profiles** and **85 authored reward item IDs**. It adds useful discoveries and enforces **Overworld → Nether → Aether → End** for newly generated chest/vault loot. Earlier-stage items are allowed in later dimensions. All 12 installed CTOV village tables now receive a reviewed profile.

The installed structure NBT audit parsed successfully and found 531 referenced loot IDs; 448 resolve against installed JSON resources. Optional-mod/legacy references are recorded, not used as guessed targets. The review ledger also lists known procedural containers, for 540 reviewed table IDs overall. Counts are template evidence, not a census of generated structures or an assertion that every optional template is active.

Plans and history: [implemented loot ideas](IDEAS-IMPLEMENTATION-PLAN.md), [native pity restoration](RESTORE-PITY-PLAN.md), [historical pity disable decision](NO-PITY-PLAN.md), [enchanted weapon plan](SWORDS-PLAN.md), [coverage expansion plan](COVERAGE-PLAN.md), [historical first-pass reference](FIRST-PASS-REFERENCE.md), [implemented finds and further loot ideas](LOOT-IDEAS.md). The original 72 Loot Integrations sampling rules remain disabled through exact resource overrides. Native loot, keys and boss identities remain, subject to the new dimension filter for chest/vault rewards.

## Rewards and coverage

Each table has one authored profile. New bonuses use one-roll pools with zero bonus rolls; rates below describe an entire pool, not the chance of every listed item independently.

| Profile / location | Typical additions | Final pool chance |
|---|---|---:|
| Village households | Modded meals; occasional flute, bubble blower or soap | Food 15%; discovery 2% |
| Garden/farm stores | Food; Quark seed pouch or flute | Food 20%; tool 3% |
| Kitchens/taverns | Farmer's Delight/Rustic Delight food; empty lunch basket | Food 20%; basket 1.5% |
| Workshops/smithies | Small andesite alloy/copper-nugget/canvas supply; Create wrench, sand paper, blueprint, goggles or super glue | Supplies 20%; tool 4% |
| Rural libraries | Paper/food/canvas; antique ink or crafting blueprint | Supplies 18%; discovery 2% |
| Expedition caches | Food/canvas/string; regular chalk, altimeter or slingshot | Supplies 22%; tool 3.5% |
| Newly covered dungeons/crypts | Food/canvas; chalk, slingshot or altimeter | Supplies 22%; tool 3.5% |
| Same dungeon profile, Overworld Y <= -64 | C&C depth gauge or 2–3 kunai | Additional 1% pool |
| Guard/archer stores | Small blunt-arrow/food/canvas supply; quiver or slingshot | Supplies 22%; utility 2.5% |
| Coastal/underwater caches | Kelp roll, fish stew or canvas; one Bubble Pearl | Supplies 20%; pearl 2% |
| Cold caches | Soup, canvas or hot cocoa; one Icy Pearl | Supplies 20%; pearl 2% |
| Repeated/high-density stores | A little food/canvas; regular chalk or flute | Supplies 6%; utility 0.5% |
| Magic structures/witch stores | Food/canvas/paper; antique ink or regular chalk | Supplies 15%; utility 2% |
| Newly covered Nether expeditions | Food/canvas/common ink; chalk, 1–2 blue bombs or altimeter | Supplies 22%; utility 3% |
| Newly covered End expeditions | Food/canvas/uncommon ink; chalk, altimeter or quiver | Supplies 20%; utility 2.5% |
| Ordinary Aether dungeon chests/camps | Aether's Delight food | 25% |

First-pass profiles remain for selected dungeon supplies, libraries, hidden/late treasure, ordinary surface supplies and armouries. Their native curio/ink/scroll tuning remains active. Added coverage includes Dungeons & Taverns, Better Archeology, CTOV, vanilla/overhauled villages and mansions, Formations, Structory, Ribbits, Friends & Foes, Aquamirae, Better Nether/End settlements and ordinary Iron's structures. Exact IDs and assigned profiles are in `tuning-reference.json` and `coverage-inventory.json`.

Native Cataclysm/Mowzie structure loot, locked Aether victory treasure, trial/boss/vault rewards, keys, archaeological blocks, pots, traps, projectiles, internal-only helpers and the 124-container citadel bookshelf template are deliberately retained rather than given generic bonuses. The dimension filter still protects ordinary chest/vault generation where applicable. No boss entity-drop filters were added.

Some tables are both independently placed in containers and referenced by another table (for example CTOV bakery → farm). Their additions are NeoForge **global modifiers on the outer loot roll**, not extra pools placed into those native tables. Each outer chest receives its own single profile; internal raw table delegation does not add the child's profile again. The native bakery/farm check verifies this behavior. Internal helpers without independently reviewed placements are not targeted.

## Dimension order

`dimension-policy.json` defines stages 0–3. LootJS applies the policy after NeoForge's global loot modifiers, using the **dimension where loot is generated**, regardless of which table name is used or which dimensions a player previously visited.

| Generation dimension | Dimensional items permitted |
|---|---|
| Overworld | Overworld-stage items |
| Nether | Overworld and Nether items |
| Aether | Overworld, Nether and Aether items |
| End | All four stages |
| Other/custom dimension | Overworld stage by default; add an explicit policy entry after review |

Dimension-exclusive mod namespaces have minimum stages: Better Nether/My Nether's Delight and their tree addon are Nether; Aether/Deep Aether/Aether's Delight and its tree addon are Aether; Better End/Ender's Delight and its tree addon are End. This namespace policy describes **item provenance**; reward injection still uses exact table IDs.

Mixed mods use **347 enumerated item rules** derived from installed recipes/loot/assets and reviewed overrides. These include Nether wart, blaze products, ghast tears, glowstone, quartz, Netherite, applicable Nether woods/blocks, Create brass/electron-tube/blaze equipment, appropriate Nether/End Enderman Overhaul pearls, End stone/chorus/purpur/shulker/elytra/dragon products, and the Aeronautics parts already gated behind Aether materials. The installed Aether-gated propellers, burners and envelopes require stage 2; End-stone powder requires stage 3.

Consequently, native Overworld witch/archaeology/pyromancer/mangrove loot can no longer supply those Nether materials. An Aether reward table accidentally invoked in the Nether cannot grant Aether items. Earlier materials still work in later loot. The filter removes the future-stage result; it does not reroll repeatedly until a valuable alternative appears.

All Nether Remastered items are Overworld-stage progression items and are excluded from dimensional restrictions: its Seal pieces and other keys must remain obtainable before entering the Nether. Native loot sources and drop rates are unchanged; see [the correction plan](NETHER-REMASTERED-PLAN.md).

End Remastered (`endrem`) is also exempt from dimensional restrictions: all 16 eyes and its other items resolve to Overworld stage 0, including eyes whose names refer to the Nether or Wither. This preserves their native acquisition sources; it does not relocate Nether/boss rewards into Overworld chest pools. The static checker verifies every installed End Remastered item and all 16 eyes remain stage 0.

Obsidian, crying obsidian, ordinary ender pearls, smooth basalt from Overworld geodes, ordinary runic tablets, Bubble/Icy Pearls, End Remastered eyes and native progression keys keep their appropriate access. Ordinary ready-to-use potions are consumables and are not automatically assigned a dimension based on every brewing ingredient; dragon-breath/lingering items are End-stage. Existing danger-based Simply Swords unique eligibility is retained; native player pity is restored as described below.

Vanilla `minecraft:container` and `minecraft:bundle_contents` payloads are recursively filtered, preserving safe contents, slot positions, names and unrelated components. A defensive 16-level nesting limit fails closed. Nothing scans existing inventories or rewrites already generated loot. This policy targets chest/vault generation, not crafting, trading, player storage, placed blocks, mob/boss drops or gift/fishing tables.

## Enchanted Simply Swords weapons

A targeted set of **16 ordinary weapons** now appears in 46 exact recipient
roots: iron and diamond longswords, spears, cutlasses, katanas, rapiers, glaives,
halberds and claymores. Each qualifying pool selects **one of eight equally
weighted shapes**, with count 1, explicit Sharpness/Unbreaking and modest wear.
No random enchantment-table function or secondary equipment injection runs.

| Recipient group | Any weapon chance | Material | Sharpness | Unbreaking | Remaining durability |
|---|---:|---|---|---|---|
| Two existing armouries | 6% (replaces old 8% unenchanted roll) | Iron | I–II | I | 55–85% |
| Five hostile guard/outpost stores | 3% | Iron | I–II | I | 55–85% |
| Ten reviewed combat/temple/stronghold/mansion discovery roots | 2% | Iron | I–II | I | 55–85% |
| Thirteen dungeon-supply roots, only Overworld Y <= -64 | 1.5% | Iron | II | I | 60–90% |
| Eight Nether-supply roots | 2% | Iron | II | I | 60–90% |
| Four hidden-treasure roots | 3% | Diamond | II | I | 65–90% |
| Four late-treasure roots | 4% | Diamond | II–III | I–II | 75–95% |

Ranges are inclusive and selected by vanilla number providers. At 4%, each
particular shape has a **0.5%** final chance; a 24-chest late-treasure scenario
averages **0.96 diamond weapons per player** from these additions. Twenty-four
qualifying deep dungeon chests average **0.36 iron weapons**. These counts add
to retained native gear, not replace all native equipment. Four independent
Lootr players multiply those expected counts by four.

The guard subset explicitly excludes village fletchers, and the discovery
subset excludes generic stores, village houses, trap-only helpers and dense
repeated supply rooms. Exact subsets and function limits are recorded in
`tuning-reference.json` under `enchanted_weapon_pools`; rewards remain in the
existing profile JSON and routing still has one authored profile per root.
The native verifier checks that those subset predicates retain the original
queried table ID through the additive reward table.

Iron and diamond are Overworld-stage materials. Netherite upgrades, runic
forging, tablets, unique eligibility and dragon loot keep their existing
routes; restored native pity is documented below. No new Mending, Looting, Fire Aspect, curses, modded or
above-normal enchantments were added. Existing native unique loot may still
have its own mod-generated enchantments. The installed sword/durability tags
and actual native `canEnchant` checks establish compatibility for these finds.
The durable or stronger gear a player crafts/enchants remains valuable.

## Implemented discovery kits and curiosities

All twelve concepts from the loot ideas document are now enabled; see
[LOOT-IDEAS.md](LOOT-IDEAS.md) for their contents, exact conditional pool rates,
component decisions and per-structure examples. They include small placed-chest
kits, tasting/preserve portions, specialist pearls, basic elixirs, native level-I
scrolls, a decorative globe, rare empty backpacks and real village survey maps.
No sparse high-density profile receives those additions. Map lookups are bounded
and unsuccessful searches remove the marked placeholder instead of awarding it.

## Native Chalk overlap

Chalk's installed two-roll bonus tables were a substantial extra source: the combined test found loose chalk in about 47% of mineshaft chests and boxes in about 19%. Some boxes contained charged glowing chalk or hidden glowstone, which would bypass the requested early-material/lighting restrictions. Native mineshaft and simple-dungeon bonuses now roll once behind an 8% gate, with all box entries removed. Loose coloured chalk has final chances **2.4444%** and **1.8462%**, respectively. Village/bonus-chest chalk is **2.9367%**. Empty entries retain their native weight; the gate is not an 8% final chalk chance. The native desert-pyramid bonus is disabled because the curated discovery pool already provides regular chalk at 2%. Crafting and player-owned boxes are unchanged.

## Effective chances and structure budgets

For a one-roll pool with gate probability `p`, entry weight `w`, and total weight `W`, the final selection chance is **`p × w/W`**. Quantities affect expected item counts, not selection probability. Location-restricted rates apply only when their stated location predicate passes. The dimension filter can remove an otherwise selected higher-stage result; it does not increase another entry's chance.

Examples:

- Workshop wrench: `4% × 3/12 = 1%`; goggles and super glue each `4% × 1/12 ≈ 0.3333%`. One selected tool, not five separate 4% rolls.
- Garden seed pouch: `3% × 3/5 = 1.8%`; flute 1.2%.
- Expedition chalk: `3.5% × 4/7 = 2%`; altimeter 0.5%, slingshot 1%.
- Deep dungeon depth gauge: `1% × 1/4 = 0.25%`; 2–3 kunai 0.75%, only at Overworld Y <= -64. These do not put bulk silver into surface loot.
- Guard-store quiver: `2.5% × 1/3 ≈ 0.8333%`.
- Dense-store chalk: 0.4%; flute 0.1%.
- Native Nether expedition blue bombs: `3% × 2/6 = 1%`, 1–2 bombs, permitted from Nether onward.

| Structure scenario, per player | Expected additions from the stated profile |
|---|---|
| 20 village household chests | 3 food selections and 0.4 utility items total |
| 24 newly covered ordinary dungeon chests | 5.28 provisions and 0.84 utility items; if all are at/below -64, another 0.24 depth-gauge/kunai selections |
| 65-container Aquamirae camp (observed template count) | 3.9 provisions and 0.325 utility items, not 65 independent high-value treasure rolls |
| 40-container Friends & Foes citadel store (observed template count) | 2.4 provisions and 0.2 utility items |
| 124-container Iron's citadel bookshelf template | No new generic bonus pools; native bookshelf rewards retained |
| 24 End-city treasure chests | About 2.068 selected Iron's accessories across native/new pools, plus 0.96 authored enchanted diamond weapons |

Template counts are not complete jigsaw-structure counts. The 20/24-chest scenarios are explicit assumptions. Multiply expected **aggregate** rewards by the number of independent Lootr players: four players get four separate budgets. Lootr team mode and automatic refresh remain unchanged/off.

Native basic-curio gates remain: generic 2%, good 5%, treasure 12%, stronghold library 8%, Nether 3%, ancient city 4%, End city 6%. Ten selected loot-only accessories are among 13 equally weighted native basic entries. The separate 4% missing-accessory pool remains limited to its original hidden/late treasure list: Mana Ring and Amethyst Resonance Charm 1.7143% each, Greater Conjurer's Talisman 0.5714%. Expulsion/Visibility retain native ominous-vault sources. No selected recipes or merchant sales were restored.

Simply Swords generic standard/diamond weapon and tablet generation remains off; targeted ordinary-weapon and tablet pools remain. Unique base chances remain: End-city treasure **0.35%**; ancient city/bastion treasure/Better Fortress worship **0.15%**; Better Stronghold treasure/hidden pharaoh **0.10%**; native dragon **5%**. Native unique pity is restored: after 25 prior credited misses, the next credited roll adds **0.2 percentage points**, increasing by another 0.2 per credited miss; the **75th credited attempt** is guaranteed. Only the first eligible chest in each dimension-specific **32×32 horizontal region per player** advances pity. Other eligible chests still get base rolls. Easy chests cannot build unique pity. Existing saved counters/regions resume; a player already near the threshold may obtain a quick guaranteed reward. The no-pity companion is removed. The native tablet threshold remains 60, but generic tablet weight stays 0, so generic tablet pity is inactive; authored late-table tablets use their existing independent pools.

A model using only previously uncredited eligible regions gives roughly **47–51 credited attempts per unique**, depending on the base rate. This is a history-dependent estimate, not a flat per-chest probability. Region layout, carry-in state and additional base-only chests change actual outcomes.

## Tuning and validation locations

| Path relative to pack root | Purpose |
|---|---|
| `datapacks/Exploration Loot Balance/data/liams_loot/loot_table/rewards/*.json` | Items, entry weights, quantities and pool conditions |
| `datapacks/Exploration Loot Balance/data/liams_loot/loot_modifiers/*.json` | Exact recipient lists; one profile per recipient |
| `datapacks/Exploration Loot Balance/data/neoforge/loot_modifiers/global_loot_modifiers.json` | Appends the authored routes; keep `replace: false` |
| `kubejs/server_scripts/exploration_loot_balance.js` | Native pool tuning and post-modifier dimension filter |
| `datapacks/Exploration Loot Balance/dimension-policy.json` | Dimension stages, dimension-exclusive item namespaces and exact mixed-mod item overrides |
| `datapacks/Exploration Loot Balance/coverage-inventory.json` | Complete reviewed template/procedural reference ledger, exclusions and density evidence |
| `datapacks/Exploration Loot Balance/tuning-reference.json` | Group index, native table fingerprints, pool positions, bounded enchanted-weapon recipient subsets and current tuning |
| `config/simplyswords/loot.toml` | Canonical native percentages/allowlist and active unique pity settings; root `config/loot.toml` mirrors it |
| `datapacks/Exploration Loot Balance/data/lootintegrations/loot/*.json` | Exact disabled sampling routes; original inventory is `disabled-integrations.json` |

Development checks and results follow the project convention under `/home/liam/Projects/minecraft-mods/modpack-development/scripts/` and `docs/exploration-loot/`. Run `python3 scripts/check_exploration_loot.py --deployed` from that development directory. It checks resource IDs/references, pool fingerprints, exact routing, dimensions, JSON/script syntax, analytical probabilities, seeded simulation and deployment identity. `probabilities.csv` contains every authored item's effective pool chance and expected quantity. The current `VALIDATION.md` distinguishes native results from static checks and records omitted runtime modules.

LootJS's [documented post-modifier ordering](https://docs.almostreliable.com/lootjs/difference.html) and the installed 3.7.0 classes are the implementation reference. The native tests exercise the actual installed engine/API; this is not an assumed API from a different Minecraft version.

## Applying changes

Restart the client/server after synchronization. Paxi loads this unpacked base-folder datapack; do not also install a ZIP or a second world copy.

Updates affect loot generated after the restart: new containers, existing unopened vanilla table-backed containers, and personal Lootr inventories that have not generated yet. Already generated Lootr inventories remain unchanged, even if someone has not emptied them. New chunks are needed to find new structures, not to update an existing unopened table-backed chest. No automatic refresh/reroll, inventory cleanup, pity migration or save edits are performed.

Supplementaries/Quark converts the native exploration-map function to a quill
and raises its search radius. For only our marked survey rewards, an exact
four-root LootJS hook resolves that result through Minecraft's native map APIs
using the original village tag, radius 8 and skip-existing false. Other maps and
quills keep their existing behavior. Null lookups produce no reward; wrong
dimensions are rejected. This avoids changing global map/quill settings.
