# Historical first-pass reference — superseded by README.md

# Exploration loot balance — plan (2026-10-25)

## Findings before implementation

- Installed: Loot Integrations 4.7 plus Better Archeology 1.4, Cataclysm 1.2, CTOV 1.6, Dungeons & Taverns 2.7, Moog 2.2 and YUNG 1.6 addons; LootJS 3.7.0; Iron's Spellbooks 3.16.3; Simply Swords 1.70.2; Lootr 1.11.38.127. All references must resolve against these jars and vanilla 1.21.1.
- Loot Integrations has 72 resource rules. `loot_table` is the donor; `integrated_loot_tables` lists recipients and stack selection counts, not probabilities. Core rules first sample vanilla tables into seven shared reservoirs; addons sample those reservoirs into structure and mob/boss loot. A dungeon donor requests nine selections, an end-city donor fifteen; addons commonly request 1–3. Modded stacks have weight **4**, vanilla 1 (`moddedItemWeight + 1`). Other mods' generated rewards can travel with the donor. This creates overlapping injections, loses dimension/progression context and can export End Remastered eyes. The Cataclysm addon gives generic reservoir loot TO bosses; it does not give boss drops to village chests.
- Iron's appends generic/good/treasure/library/Nether/ancient-city/End-city tables with additional curios rolls of 5/15/80/50/7.5/15/50%. The generic route includes peaceful village chests, ruined portals and shallow aquatic loot. The basic-curio subtable contains 13 equally weighted entries, ten of the fifteen selected loot-only accessories. Three selected accessories have no JSON loot source; two others occur in ominous vaults. Recipe and merchant filters must remain intact.
- Simply Swords config values are **percent units** (0.005 = 0.005%, not 0.5%). Standard/rare weapons and uniques use broad chest matching; unique soft pity starts at 25 misses (+0.2 percentage points/miss), guarantees at 75; tablets guarantee at 60. Easy containers can currently advance pity. The installed Lootr mixin applies container pity per player. Only the first eligible chest in each dimension-specific 32×32-block horizontal region advances pity; other chests retain base rolls.
- Farmer's Delight, Supplementaries, Quark, C&C and Aether addons already inject loot. Keep their native thematic rewards rather than re-adding identical rewards to the same tables. Quark tomes use entry weights, not final chest chances. End Remastered has native table and entity routes; keep them. Cataclysm, Mowzie, Aether boss treasure and keys retain their own rewards.
- Loot Category Compatibility and Apotheosis Gems Rare exist only as inactive directory remnants in the instance: no pack.mcmeta or files; absent from source. Apotheosis is absent (Apothic Attributes/Enchanting are present). Do not reactivate those packs or introduce gems.
- Permanent Light Progression changes 22 recipes. Deep Ore Progression deliberately moves key ores downwards; avoid new diamond/mithril/zinc/brass supplies in easy loot. Deep Underground Structures places ordinary dungeons across broad Y ranges. Hostile health/damage scales up to 2.5x/3x below -256: reward actual depth with modest extra consumables, not every underground table as endgame.
- Paxi loads unpacked base datapacks. Lootr uses individual randomised loot, team mode off, refresh off: measure per player, then multiply economy estimates by participating players.

## Proposed reward bands

All new pools make one selection; the stated chance is the final pool chance before choosing the listed alternatives. Existing native loot remains unless explicitly tuned below.

| Location | Tier | Representative new rewards | Quantity | Target chance per chest |
|---|---|---|---|---|
| Selected kitchens, village farms, taverns | early, safe | Farmer's Delight meals, rustic provisions | 1–2 | 20%; no metals/accessories |
| Selected surface ruins/camps | early adventure | rope, canvas, food | 1–3 | 25% |
| Mineshafts and common dungeon stores | early/mid combat | food, canvas, Create andesite alloy | 1–3 | 30%; alloy only a minority |
| Underground dungeon at Y <= -128 | mid/deep | meal, common ink | 1–2 | extra 25% in Overworld only |
| Same at Y <= -256 | deep | uncommon ink | 1 | extra 8%; no permanent equipment |
| Libraries and hidden treasure | mid/late | common/uncommon ink, paper; selected missing accessories | 1–2; accessories 1 | supplies 25%; rare accessory 2–4% |
| Fortress stores / bastions | Nether | native supplies; selected new food/ink | 1–2 | 25%; no boss material |
| Ordinary Aether dungeon chests | dimension entry/mid | Aether's Delight food | 1–2 | 25%; no keys or treasure-table changes |
| Ancient cities / End cities | late danger | modest ink/food; missing accessories | 1–2; accessories 1 | supplies 25%; rare accessory 4% |
| Specifically listed late treasure tables | late | native Simply Swords unique pool | 1 | base 0.1–0.35%, plus native pity on eligible chests only |

## Restrictions

Never add End Remastered eyes, dungeon/vault keys, boss drops or boss equipment, Cataclysm materials, Mowzie rewards, Aether victory treasure, netherite, mithril, diamonds, permanent lamps/torches/lanterns, high-tier ink or unique swords to safe pools. Do not restore any restricted recipe/trade. New tablets are restricted to late treasure; native tablet pity will be disabled because it cannot be gated by table independently. Loot-only accessory replacement wear remains unchanged.

## Chosen implementation

1. Override the **72 exact installed Loot Integrations rule resources** with empty recipient maps. Keep jars installed; preserve native loot and avoid editing mod archives. This replaces reservoir sampling, including its extra boss-drop filler, without replacing loot tables.
2. Add named, small NeoForge `add_table` modifiers with exact recipient lists and new namespaced reward tables; register with `replace: false`. No regex/namespace-wide injections; never target both a parent and its nested reward table.
3. Use installed LootJS table-edit APIs to reduce seven native Iron's curio pool chances, trim excessive filler and repeated equipment in selected YUNG common chests, and remove enchanted apples from ordinary food/common chests. Preserve special treasure. Remove peaceful targets from Iron's generic modifier through an exact modifier override.
4. Restrict Simply Swords unique chance to an explicit late-table list, retain the dragon's native 5% route and unique pity. Disable generic standard/diamond equipment and generic tablet generation; provide modest explicitly placed iron weapons/tablets instead.
5. Source remains authoritative. Copy only changed configs/scripts and the new unpacked datapack to Local Testing, verify byte identity, then refresh packwiz metadata. Never touch saves, change branches or run the branch-publishing helper.

Validation will check installed item/table references, nested references, actual modifier overlap, JSON and installed-Rhino script loading, plus analytical probabilities and seeded simulation. A native isolated server check will be attempted if the cached runtime is usable; offline results will not be described as a full-pack playtest.

# Implemented reference and tuning

The plan above records the pre-implementation audit. The implementation uses **56 recipient tables**, **27 new item IDs**, ten reward tables, and 72 exact integration overrides. The new rare-accessory pool contains the **three** selected items absent from native JSON loot: Mana Ring, Amethyst Resonance Charm and Greater Conjurer's Talisman. Expulsion and Visibility retain their native ominous-vault rewards. The other ten selected accessories remain in Iron's native basic-curio table. Silver Ring, Invisibility Ring and generated Affinity Rings remain native entries too; they are not newly made loot-only.

## Where to tune

| File / directory relative to pack root | Purpose |
|---|---|
| `datapacks/Exploration Loot Balance/data/liams_loot/loot_table/rewards/*.json` | New item alternatives, weights, quantity ranges, pool conditions and depth thresholds |
| `datapacks/Exploration Loot Balance/data/liams_loot/loot_modifiers/*.json` | Exact recipient table IDs; each recipient belongs to one new route |
| `datapacks/Exploration Loot Balance/data/neoforge/loot_modifiers/global_loot_modifiers.json` | Appends only the ten new modifiers; never set `replace` to true |
| `kubejs/server_scripts/exploration_loot_balance.js` | Native curio chance multipliers, YUNG roll limits, common enchanted-apple removal, native ink/scroll/seed/rope roll limits |
| `config/simplyswords/loot.toml` | Canonical Simply Swords percentages and late unique allowlist; `config/loot.toml` mirrors it to avoid a stale legacy copy |
| `datapacks/Exploration Loot Balance/data/irons_spellbooks/loot_modifiers/chest_loot/vanilla_generic_loot_modifier.json` | Native generic magic additions with seven easy recipients removed |
| `datapacks/Exploration Loot Balance/data/lootintegrations/loot/*.json` | Exact no-op replacements for the installed sampling rules |
| `disabled-integrations.json` | Original donor/recipient inventory for audit and future mod updates; outside `data`, never loaded as loot |
| `tuning-reference.json` | Index of authored routes, native pool positions and intended tuning; update alongside scripts/JSON |

Development checks and generated results follow the existing project convention under `/home/liam/Projects/minecraft-mods/modpack-development/scripts/check_exploration_loot.py` and `docs/exploration-loot/`. Run the checker after changing jar versions: it rejects newly added/renamed integration routes, changed native pool shapes, unknown item assets/table references, duplicate recipients and parent/child routing overlaps. It emits exact item probabilities and expected quantities to `probabilities.csv`. Native registry checks supplement asset-based offline ID verification.

## Effective chances

New pools have one roll and zero bonus rolls. For a pool with gate probability `p`, entry weight `w`, and total eligible weight `W`, final item chance is `p × w/W`. Quantity ranges do not increase the chance of selecting an item. No Luck scaling is added.

- Safe kitchen pool: 20% for one food selection; each of its four equal-weight alternatives is **5% per chest**, with 1–2 items where specified.
- Dungeon supplies: 30% for one selection; Create andesite alloy is **6%**, 1–2 ingots (0.09 ingots/chest expected). No added zinc, brass, mithril or diamonds. Canvas replaces an extra rope route because Farmer's Delight and Supplementaries already add rope.
- At Y <= -128 in the Overworld, that dungeon route additionally gives one meal at **18.75%** or 1–2 common ink at **6.25%**. At Y <= -256 it also gives one uncommon ink at **8%**. These cumulative gates use the container origin, apply only to the explicit dungeon recipients, and cannot activate in the Nether/Aether/End.
- Hidden/late accessory pool: **4%** total. Mana Ring and Amethyst Resonance Charm each have **1.7143%**, Greater Conjurer's Talisman **0.5714%**, one item. These are alternatives within one roll, not three independent 4% rolls.
- Native basic-curio gate after tuning: generic **2%**, good **5%**, treasure **12%**, stronghold library **8%**, Nether **3%**, ancient city **4%**, End city **6%**. Each of 13 basic entries is 1/13 of that rate. Ten entries are selected loot-only accessories. Native special magic structures and trial rewards retain their own tables.
- Hidden treasure tablet: **2.7778%** (25% × 1/9), late treasure tablet **2.5%** (25% × 1/10). The tablet pool has no pity. No generic standard/diamond swords or tablets are added by Simply Swords; two selected armoury/wardrobe tables instead have **8%** for one of three iron weapon alternatives (2.6667% each).
- Simply Swords late unique base chances: stronghold treasure and hidden pharaoh chest **0.1%**, ancient city/bastion treasure/fortress worship **0.15%**, End city **0.35%**. These are the final base percentages, not entry weights. Ender Dragon's existing **5%** unique roll remains. Other chests have zero unique chance and cannot advance unique pity. This makes looting nearby houses an ineffective way to prepare a guaranteed endgame weapon.

Unique pity is history dependent. The first eligible container per **32×32 horizontal region per dimension per player** can advance pity; additional eligible containers in that region still get the base roll, but no soft/hard-pity credit. At 25 prior credited misses, the next credited roll adds 0.2 percentage points; the 75th credited attempt is guaranteed. A new-region-only mathematical model gives about **47–51 credited chests per unique**, depending on the base rate; this is not a flat 2% chest chance. Regions already credited remain credited even after a success. Existing saved miss counts are preserved, so a player near hard pity can obtain an early success at their next eligible new region. No pity migration or player-data edits occur.

## Whole-structure budgets

A table can be reused in structures at different heights. The budgets below are **analytical scenarios per player**, not assertions about procedurally generated chest counts. Count actual chests and their specific tables when tuning a new structure. Native miscellaneous/gear rewards remain in addition to the explicitly calculated groups.

| Scenario | Expected new rewards across structure | Accessory/unique budget |
|---|---|---|
| 12 selected safe kitchen chests | 2.4 food selections | Zero new accessory/unique rolls |
| 24 generic dungeon chests | 7.2 supply selections, including 2.16 andesite alloy ingots | Native selected basic accessories: 0.369 expected; ~31.1% chance of at least one, assuming 24 independent generic routes |
| Same 24 dungeon chests at -160 | Above plus 4.5 meals and 2.25 common ink | No added permanent equipment from depth |
| Same at -300 | Above plus 1.92 uncommon ink | Same accessory budget; depth does not multiply equipment rolls |
| Two hidden treasure chests | 0.5 supplies/tablet selections; 0.08 missing-accessory items | ~7.84% chance of at least one missing accessory; native basic-curio rolls are separate |
| 24 End-city treasure chests | 6 new supply/tablet selections; 0.6 tablets and 0.96 missing accessories expected | Native selected basic accessories add 1.108 expected: **2.068 selected accessories total**. Base-only uniques: 0.084 expected and ~8.07% chance of at least one. Carry-in pity can increase this; region layout limits advancement |
| 40 ancient-city treasure chests | 10 new selections; 1 tablet and 1.6 missing accessories expected | Native selected basic accessories add 1.231 expected: **2.831 selected accessories total**. Base-only uniques: 0.06 expected; ~5.83% chance of at least one; use actual region coverage for pity |

Four players independently opening an unchanged Lootr structure multiply expected **aggregate** items by four. They do not divide one loot budget. Team mode and automatic refresh remain unchanged/off. The probabilities of multiple independent rolls combine as `1 - product(1 - p_i)`; sums are expected counts, not probabilities.

The native YUNG trim reduces repeated common equipment, excess books and filler stacks rather than replacing entire tables. Enchanted golden apples are removed only from the four listed ordinary/common/food tables; special treasure retains its identity. Farmer's Delight's mineshaft/dungeon rope pools now roll once instead of three times; its seed pools roll 0–1 instead of 1–4. Iron's library scroll pool rolls 1–2 instead of 3–5, its ink pool once instead of five; End-city ink rolls once instead of three; generic treasure ink rolls once instead of 1–3. Native ink quality distributions are retained, including their existing very rare high-tier inks. Quark tomes, Supplementaries utilities, C&C/trial rewards, Aether dungeon treasure and all boss drops remain native.

## Applying an update

Restart the client/server after copying the source changes; the Simply Swords settings require configuration reload and a restart is the reliable path. Paxi loads this unpacked base-folder datapack automatically. Do not also install a ZIP or put a second copy inside a world.

Changes affect loot generated **after** the update: new containers and existing vanilla containers whose loot tables have never been unpacked. For Lootr, a player who has not generated their personal inventory for an existing converted container can receive the new loot; already generated personal inventories remain unchanged, even if they were not emptied. A different player can therefore get updated loot from a chest someone else previously opened. No automatic refresh or reroll is enabled. Boss drops use the updated rules on future kills; the only change there is removal of Loot Integrations' generic bonus stacks. New chunks are required only to create new structures, not to update an unopened table-backed chest in an existing chunk. Existing items, opened chests, player pity data and saves are not rewritten.


The disabled integration set also includes the original 13-stack overflow rule. That rule can aggregate and randomly remove already generated stacks; it is not a rarity gate. It is replaced here by reducing named source pools, preserving authored/guaranteed progression entries instead of randomly pruning final loot. The 3×/4× modded-weight distinction and recipient-selection counts no longer apply to the new modifier routes.

The LootJS methods were checked against the installed 3.7.0 class signatures and exercised by the native server. The public [table event documentation](https://docs.almostreliable.com/lootjs/loot-tables/event.html) describes the event ordering; installed jars and runtime results remain the version authority for this pack.
