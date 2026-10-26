# Coverage expansion plan — 2026-10-25

This revision addresses the narrow first-pass coverage and adds a runtime dimension-order policy. The original balance/progression restrictions remain in force.

## Findings

The first pass assigned 56 recipient tables to ten profiles. Many Dungeons & Taverns, Better Archeology, village, aquatic, mansion, Nether, magic-structure and miscellaneous ruin tables therefore lost Loot Integrations bonuses without receiving a replacement. CTOV bakery delegates to CTOV farm; several other libraries/cities have parent/child helper tables. New coverage must select roots deliberately rather than blanket-match a namespace.

Existing native Overworld loot also contains future-dimension materials: Nether wart in Iron's mangrove huts, blaze rods in pyromancer supplies, and glowstone/magma cream/ghast tears in witch/archaeology structures. Merely dimension-gating new additions would leave these routes open.

## Implementation decisions

1. Expand exact recipient lists using installed JSON and structure-template references. Audit every candidate as covered, delegated, intentionally native, a progression/boss/vault reward, a trap/projectile/pot, or an internal helper. Keep one authored profile per recipient and do not add bonuses to nested helper tables as well as their parents.
2. Add small discovery pools alongside provisions. Low-value consumables usually 15–30% per chest; reusable utilities generally 2–4% **for the entire pool**, with one selected item. Special pearls are one item on rare rolls. Keep expensive mining materials and machinery out of these additions.
3. Use LootJS's post-modifier event to enforce the minimum origin dimension of chest/vault loot. Order: Overworld 0, Nether 1, Aether 2, End 3. Earlier-stage items are permitted later. Unknown/custom dimensions default to stage 0. Apply actual generation dimension, not table name or player inventory/history.
4. Use explicit item overrides for mixed-content mods and namespace stages only for content that belongs entirely to one dimension. Protect Nether materials/gear, Aether items, End materials/gear, appropriate Enderman Overhaul pearls, and the existing Aether-gated Aeronautics parts. Inspect vanilla container/bundle components recursively so a higher-stage item cannot hide in a lower-stage reward wrapper. Do not scan or alter player inventories, dropped mob items, placed containers, merchant offers, existing saves or already generated Lootr inventories.
5. Preserve obsidian and ordinary ender pearls (Overworld sources/portal access), End Remastered eyes and native structure keys. Ready-to-use ordinary potions are consumables, not automatically classified by every ingredient in their brewing recipe. End-only dragon-breath/lingering items remain End-stage. Preserve bosses' entity loot and dedicated victory tables; do not add boss drops/keys to new profiles.
6. Keep the 72 sampling routes disabled. Preserve exact percentage/quantity tuning and estimate aggregate rewards for large structures. Source remains authoritative; sync only authored loot resources/scripts and refresh packwiz.

## Candidate discoveries

| Candidate | Why it is fun/useful | Placement and restraint |
|---|---|---|
| Create wrench, goggles, crafting blueprint, sand paper, super glue | Introduces practical building tools instead of handing out machines | Rare workshop/forge discoveries; one item; no brass/precision parts |
| Supplementaries flute, bubble blower | Pet utility and a playful toy | Rare village/garden/camp finds |
| Supplementaries lunch basket | Useful expedition food storage | Rare kitchen/tavern finds; empty, not a nested supply bundle |
| Supplementaries slingshot/quiver | Different ranged play and arrow storage | Guard posts/armouries; infrequent single items; avoid native duplicate routes |
| Supplementaries altimeter | Helps navigate deeper terrain | Mining and expedition caches; low single-item rate |
| Quark seed pouch | Useful farming tool without replacing crop production | Gardens/farm/forager chests |
| Regular Chalk | Lets players mark routes in deep structures | Ruins/mining caches; no glowing chalk/permanent-light bypass |
| C&C depth gauge, small kunai finds | Navigation or a different consumable weapon | Rare dangerous underground caches; not bulk silver/necromium |
| Enderman Overhaul bubble/icy pearls | A rare consumable with a memorable effect | Aquatic/cold exploration; their actual Overworld native mob sources verified |
| Low-quality random scrolls / basic elixirs | A chance to try magic without giving permanent power | Only if native sources do not already supply the same reward; preserve spell/boss gates |
| Cosmetic Quark runes / music / curios | Collection and decoration independent of combat power | Optional future refinement; check actual component/loot identity before shipping |

Do not ship uncharged rope arrows, empty randomized curios, blank tomes, or other component-dependent items without validating their usable stack representation. Ancient/corrupted Enderman pearls are End rewards; crimson/warped/soul pearls are Nether rewards. Bone Flute and boss/vault-reset items keep their native sources.

## Validation

Re-run JSON/JS/native registry/table/reference checks and exact-probability simulation. Sample representative newly covered structures and test positive/negative dimension-order cases in all four dimensions, including inherited native injections, nested containers/bundles, later-stage acceptance of earlier materials, entity-loot exclusion and independent Lootr players. Distinguish template counts from actual generated-world chest counts. Record full-pack limitations rather than presenting the isolated content test as a complete playtest.
