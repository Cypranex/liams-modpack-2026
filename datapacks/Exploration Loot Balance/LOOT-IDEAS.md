# Modded loot ideas and current decisions

The coverage pass prioritizes items that change what a player can do on an expedition, small comforts, and occasional curiosities. Most reusable tools belong in a **shared 2–4% discovery pool**, not one independent roll per item. The current pools use 85 verified item IDs; the native registry test covers every item actually shipped in those pools.

## Implemented in this pass

| Find | Why it is interesting | Placement / final chance examples |
|---|---|---|
| Enchanted Simply Swords iron/diamond weapons | Eight weapon shapes per material introduce different combat styles | Exact armouries/combat/deep/treasure roots; 1.5–6% for one weapon, bounded Sharpness/Unbreaking and wear; see README |
| Create wrench | A practical introduction to Create without giving machinery | Workshop discovery; 1% per eligible workshop chest |
| Engineer's goggles | Useful information while building, without free power generation | Workshop discovery; 0.3333% |
| Crafting blueprint | A project-oriented find that still requires ingredients | Workshop discovery; 1% |
| Sand paper / super glue | Small consumable building aids | Workshop discovery; sand paper 1.3333%, glue 0.3333% |
| Quark seed pouch | Improves farming convenience, not crop output | Garden stores; 1.8% |
| Supplementaries flute | A useful, playful utility instead of another sword | Household/garden/rare dense-store pools; 0.6% / 1.2% / 0.1% respectively |
| Bubble blower | A small toy that makes ordinary village loot feel modded | Household discovery; 0.6% |
| Soap | A useful low-value curiosity | Household discovery; 0.8% |
| Empty lunch basket | An expedition convenience with no hidden supply payout | Selected kitchens; 1.5% |
| Altimeter | Useful in a pack with a much taller/deeper Overworld | Expedition/dungeon discovery; 0.5% |
| Regular chalk | Marks routes without permanent-light progression bypasses | Expedition/dungeon discovery; 2%; sparse stores 0.4% |
| Slingshot | An inexpensive alternative ranged toy/tool | Expedition/dungeon discovery; 1%; guard stores 1.6667% |
| Quiver | Useful arrow storage; a different kind of equipment find | Guard stores; 0.8333%; no blanket injection into every dungeon |
| C&C depth gauge | A rare navigation reward for going underground | New dungeon profile at Y <= -64; 0.25% |
| Small kunai finds | A different consumable weapon, without stacks of silver ingots | Same depth-limited profile; 0.75% for 2–3 |
| Bubble Pearl / Icy Pearl | A memorable one-use variant instead of another generic pearl stack | Non-dense coastal/cold caches; 2% for one. Their native mobs have Overworld sources |
| Blue bombs | An occasional dangerous utility consumable | New Nether expedition profile; 1% for 1–2, filtered before Nether |
| Antique ink | A small cartographic curiosity | Rural library discovery; 1.5%; magic resupply discovery 1% |

These rates are conditional on the exact recipient profile and any stated location predicate. Dense structures receive a much smaller profile rather than inheriting all of these opportunities. Existing native gear, seeds, potions and magic loot remain additional rewards where their mods already supply them.

## Remaining concepts — now implemented

All twelve concepts below are shipped in the existing exact recipient profiles.
Pool probabilities include all listed alternatives, not one independent roll per
item. Plans and component decisions are in `IDEAS-IMPLEMENTATION-PLAN.md`;
exact pool indices/subsets are in `tuning-reference.json` under `ideas_pools`.

| Find | Actual contents | Where / final pool chance |
|---|---|---|
| Surveyor's kit | One altimeter, regular chalk and chicken sandwich | Expedition caches 0.75%; deep dungeon supplies 0.5%, Overworld Y <= -64 |
| Gardener's parcel | Seed pouch, 3 cabbage seeds, 3 tomato seeds, apple-pie slice | Garden stores 0.75% |
| Smith's project kit | Crafting blueprint, sand paper, 2 andesite alloy | Workshops 0.75% |
| Archer's cache | Empty quiver and 8 ordinary arrows | Five hostile guard/outpost roots 0.5%; no village fletcher |
| Tavern tasting sample | One Brewin' and Chewin' flaxen cheese wedge | Kitchens 3% |
| Orchard preserves | One apple jam, baked pear or jam bread | Garden stores 4% combined; each 1.3333% |
| Specialist pearl | One crimson/warped/soul pearl; or one ancient/corrupted pearl | Nether expeditions 1% combined; End expeditions 0.75% combined. The dimension filter enforces stages |
| Basic elixir | One native Oakskin or Evasion elixir | Three exact archaeology/temple/witch laboratories 1% combined; each 0.5% |
| Beginner scroll | One usable native level-I Magic Missile or Firebolt scroll | Rural libraries 1% combined; native spell weights determine the split |
| Collector's keepsake | One ordinary Supplementaries globe | Rural libraries 0.5%; no boss disc or crafting template |
| Rare empty backpack | One Reliable Backpacks bag with no added contents | Four hidden-treasure roots 0.25% |
| Nearby Village Survey | A real native exploration map with destination marker | Overworld rural libraries, at most 0.2%; bounded radius 8, unsuccessful lookup gives no map |

The four tool parcels use **named ordinary chest items with vanilla container
components**, not overfilled bundles. Place/open the chest to access supplies.
Vanilla bundle capacity cannot fit several unstackable tools plus food/ammo;
these kits do not grant Shulker Box storage behavior. Their entire contents count
toward the budget. The current dimension filter checks the nested contents.
Quark's installed rune is a smithing template, so the keepsake uses a small
decoration instead. There are no placeholder maps, blank scrolls, prefilled
backpacks, mead kegs, full cheese wheels or large seed/arrow supplies.

The new pools supplement the existing food/tool/weapon profiles. For example,
24 qualifying deep chests average 0.12 survey kits (0.36 contained items),
20 garden stores average 0.15 parcels plus 0.8 fruit portions, and 24 hidden
chests average 0.06 bags. Multiply aggregate expectations by independent Lootr
players. Sparse high-density stores receive none of these pools. Structure
counts are scenario assumptions, not generated-world measurements.

## Deliberate exclusions

- No boss drops, boss equipment, progression keys, Aether victory rewards or vault-reset tinctures in generic discovery pools.
- No free permanent lighting, glowing chalk, endgame machinery, bulk restricted metals or routinely duplicated armour.
- No uncharged rope arrows, empty mystery curios, blank Ancient Tomes or copied discs without the correct native components.
- No End pearls in earlier dimensions, Aether flight parts in Nether loot, or Nether materials in Overworld loot.
- No “one of every mod everywhere” distribution. Keep discoveries occasional and useful, with a full-structure budget.

Supplementaries/Quark converts the native exploration-map function to a quill
and raises its search radius. For only our marked survey rewards, an exact
four-root LootJS hook resolves that result through Minecraft's native map APIs
using the original village tag, radius 8 and skip-existing false. Other maps and
quills keep their existing behavior. Null lookups produce no reward; wrong
dimensions are rejected. This avoids changing global map/quill settings.
