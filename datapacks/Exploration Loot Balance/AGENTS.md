# Exploration loot: agent maintenance instructions

Read this file before loot work anywhere in the pack, including mod additions,
removals and updates. This is an implementation/maintenance policy, not a claim
that every installed item or injection has already been tested. Explicit user
instructions can change the policy; document the resulting decision.

## Read first and identify ownership

- `README.md`: current reward rates, structure budgets, dimension exceptions,
  tuning paths and application behavior. `FIRST-PASS-REFERENCE.md` is historical.
- `tuning-reference.json`: exact recipient groups, native table fingerprints,
  pool indices, native Chalk/curio tuning, Simply Swords unique eligibility and
  `enchanted_weapon_pools` (exact ordinary-weapon subsets/function ceilings).
- `coverage-inventory.json`: reviewed structure/procedural roots, exclusions and
  template density evidence. An exclusion is a decision to review, not a missing
  task to fill automatically. `LOOT-IDEAS.md` separates shipped items from ideas.
- `dimension-policy.json`: the executable item/dimension stage policy.
- Pack-root `kubejs/server_scripts/exploration_loot_balance.js`,
  `kubejs/server_scripts/irons_curios_loot_only.js`,
  `config/simplyswords/loot.toml` and its root `config/loot.toml` mirror.
- Development directory:
  `/home/liam/Projects/minecraft-mods/modpack-development` (called DEV below).
  Read `docs/exploration-loot/VALIDATION.md` and its manifest for test scope.

Inspect installed jars, nested JarJar dependencies, structure NBT, procedural
container generation, native modifiers/configs, loaded datapacks and KubeJS.
Use effective overrides/load order as well as original jar resources. Verify
item IDs in the native registry where available; an asset path alone is only a
static hint. Verify usable stack components for scrolls, curios, maps, boxes,
quivers, tomes, discs and other stateful rewards. Do not invent IDs or copy an
API from another version.

## Balance invariants

1. Exploration supplements crafting, mining, farming and boss progression.
   Prefer small provisions and occasional useful discoveries to repeated
   equipment, bulk resources or a sample from every installed mod.
2. Match rewards to actual accessibility, danger, depth and progression. Inspect
   Deep Underground Structures and underground damage scaling before increasing
   deep rewards; a structure's name alone does not establish its difficulty.
3. Budget the whole structure **per player**. Count repeated/jigsaw containers
   and shared tables. Current broad profiles commonly use 15–30% supplies and
   2–4% for a shared discovery pool; dense stores use much less. These are tuning
   starting points, not entitlements or fixed required rates. Do not layer a
   valuable pool on every room/helper chest of a large structure.
4. Keep native boss/victory reward identities, progression keys, End Remastered
   eyes and unique dimension/boss sources. Do not put boss-exclusive items,
   endgame weapons, permanent lighting or restricted metals into easy generic
   loot. Review Recipe Restrictions, Permanent Light Progression, Deep Ore
   Progression, and the installed Loot Category Compatibility / Apotheosis Gems
   Rare behavior before introducing conflicting rewards.
5. The selected Iron's accessories stay loot-only. The recipe script and the
   installed `irons_ring_durability` merchant filter share an explicit selection;
   do not restore recipes/sales or turn every accessory/spellbook into loot-only.
   Preserve sensible native sources and the rare pool for missing accessories.
6. Ordinary Simply Swords discoveries use the targeted iron/diamond pools in
   the README, with bounded Sharpness/Unbreaking, wear and count 1. Maintain
   their exact combat/depth/treasure subsets and whole-structure budget. Do not
   stack a second basic-weapon route or promote them to Netherite/runic gear.
   Keep Simply Swords generic equipment/tablet/unique injection settings off
   unless deliberately replacing that policy. Maintain exact late-table unique
   eligibility and native dragon reward. User restored native pity on 2026-10-26:
   keep soft start 25, increment 0.2 percentage points and hard threshold 75.
   Do not install the retired `simplyswords-no-pity` companion. Generic tablets
   remain disabled (weight 0), so the native tablet threshold 60 is not active
   for generic loot. Preserve existing saved counters and region credit.
7. Lootr gives independent personal rewards. Multiply aggregate budgets by the
   number of players; do not compensate by enabling refresh/team mode, resetting
   inventories or rewriting saved pity state. Block conversion/GUI behavior is a
   separate concern from loot generation.

## Dimension-order logic

- Explicit user requirement: keep **all `nether_remastered:*` and `endrem:*`
  items exempt from dimension-order filtering**, including new items after mod
  updates. Keep both namespaces out of `namespace_stages` and do not add
  positive `item_stages` overrides for them; they resolve to Overworld stage 0.
  Their keys/eyes are needed before reaching the relevant dimensions. Preserve
  native acquisition locations, quantities and rates: this exemption does not
  authorize new generic key pools or bypass filtering other items in the same
  chest. Better Nether (`betternether`) and Better End (`betterend`) are separate
  mods and retain their stage rules. Validate this exception whenever either
  Remastered mod or the dimension policy changes.
- Generation stages are Overworld 0, Nether 1, Aether 2, End 3. Permit an item
  only when its minimum stage is <= the actual generation dimension's stage.
  Earlier-stage rewards may appear later. Player visit history and table names
  do not grant access. Unknown/custom dimensions default to stage 0; review and
  explicitly configure new dimensions, never infer stage from their names.
- Use exact item overrides for mixed-content mods. Namespace stages are allowed
  only for item namespaces whose content belongs entirely to that stage. This
  is an item provenance rule, not permission for namespace-wide loot routing.
- Audit **native rewards too**: adding a new mod can introduce future materials
  into ordinary Overworld loot even if no authored pool changes. Unclassified
  items default to stage 0 in the current filter, so newly installed content
  requires a proactive classification review. Installation alone does not
  automatically classify it safely.
- Preserve documented exceptions: Overworld-source obsidian/crying obsidian,
  ordinary ender pearls, geode smooth basalt, native eyes/keys and the reviewed
  Bubble/Icy Pearls. Ordinary ready-to-use potions are intentional consumable
  exceptions; lingering/dragon-breath items remain End-stage. Recheck actual
  recipes/native acquisition when making new exceptions.
- Keep the post-NeoForge filter in supported LootJS
  `addTableModifier(LootType.CHEST, LootType.VAULT)` handling. Rejection removes
  the result without rerolling. Return `null` to remove a LootBucket entry;
  returning `ItemStack.EMPTY` leaves a phantom result in this installed API.
- Recursively sanitize vanilla container/bundle contents while retaining safe
  items, slots, names and unrelated components; preserve the defensive nesting
  limit. A custom mod box/pouch is **not** automatically covered. Inspect its
  component and loot-unpacking path, then safely sanitize, restrict or exclude
  the unsafe source. Native Chalk boxes formerly hid glowstone/glow charges;
  their chest sources were explicitly removed/replaced for this reason.
- Check the actual context type for new container mechanisms. Do not silently
  broaden the filter to entity/boss drops, gifts, fishing, trades or inventories.
  Those are outside the present chest/vault policy and need a deliberate scope
  decision. Never scan/rewrite existing player storage or world saves.

## Injection and routing logic

- Prefer exact additive NeoForge `add_table` routes and small native LootJS
  edits. Keep `global_loot_modifiers.json` append-only (`replace: false`). Avoid
  full structure-table replacement, broad namespace matching and blanket
  optional-mod compatibility logic.
- Each recipient has one authored profile. Internal-only helper tables get no
  separate route. Both parent and child may have routes **only when each is an
  independently placed reviewed root**: native testing established that these
  global modifiers apply once to the outer roll, not again to raw delegation.
  Revalidate that behavior if APIs/versions change; do not confuse this with
  editing bonus pools directly into both native tables.
- Loot Integrations reservoir sampling is intentionally disabled using exact
  resource overrides with empty recipient maps. Audit every installed addon
  when its inventory changes. Original donors can contain other mods' injected
  rewards; restoring sampling can silently duplicate those rewards and defeat
  progression. Preserve the reason for each disabled/replaced integration.
- Audit native injections before adding the same item. Keep native useful
  rewards with targeted roll/gate trims when possible. Desert-pyramid native
  Chalk is disabled because the authored profile replaces it; other retained
  Chalk bonuses have reduced rolls/gates and no box entries.
- Native pool edits are version-specific. A fingerprint mismatch means inspect
  the new original JSON and re-establish indices/semantics; never merely update
  hashes, catch missing-table errors or silently skip broken required edits to
  make validation green.

## When mods are added or updated

1. Compare source packwiz manifests with the actual installed test jars and
   dependencies. Establish the intended new version; do not mistake an unsynced
   instance for a real removal/rename. Preserve unrelated work.
2. Inventory new/changed items, loot tables, structure NBT/procedural roots,
   injections, configs, context types and custom container components. Run
   `python3 scripts/audit_structure_loot.py` from DEV for updated raw NBT
   evidence; it does not classify coverage or update the ledger automatically.
3. Audit new Loot Integrations resources/addons and overlapping native LootJS,
   NeoForge and mod-native paths. For newly reviewed sampling resources, update
   `disabled-integrations.json` from the actual donor/recipient data and add
   matching exact empty-map overrides. Never restore all sampling or weaken the
   inventory assertion to accept unknown rules.
4. Classify dimensional items and actual new dimensions first, including
   mixed-mod materials, gated machinery/foods/equipment and nested rewards.
   Review new native chest injections even if choosing no new authored rewards.
5. Assign exact independently placed roots a suitable existing profile or a
   justified small new profile; record native/progression/helper exclusions.
   Update both route JSON and `tuning-reference.json`, ledger evidence/counts,
   policy and README. Do not assume every new structure needs a generic bonus.
6. For updates, compare original native tables/components/APIs to the recorded
   versions; revise pool edits, fingerprints, curio selection and custom mod
   integration only after inspecting changes. Recheck mod dependencies and
   progression restrictions that may have gained recipes/native acquisition.
7. Update checker assumptions, native verifier samples and runtime preparation
   for the intended new installation. Counts such as 330 recipients, 72 disabled
   resources, 85 items and 347 stage overrides are revision results, not policy
   constants. Record the actual new counts and evidence; preserve useful guards.

## When mods are removed or replaced

1. Confirm the intended source/install change and dependent addons. Review all
   dependencies: a mod may provide multiple namespaces or bundled mods.
2. Remove/replace its reward entries, exact recipient routes, now-unused reward
   profiles and global registrations. Remove stale nested table references,
   native required-table edits, pool indices/fingerprints, curio tuning, unique
   allowlist entries and mirrored config dependencies as applicable. Do not
   redirect missing IDs to a similarly named item without a balance review.
3. Remove only obsolete integration overrides/inventory entries after checking
   whether another remaining addon supplies the same resource. Also inspect
   remaining mods for references to the removed mod's tables/items.
4. Clean obsolete dimension/item namespace rules, explicit stages and dimension
   mappings after checking shared ownership. If removing/replacing a dimension,
   deliberately revise the progression policy and downstream recipe gates;
   do not silently collapse the order. Record removals/exclusions in the ledger
   and update current documentation while preserving historical evidence.
5. Remove dead verifier/provider requirements and revise affected assertions to
   match the intentional change. Required absence must fail until reconciled;
   do not blanket-skip unknown IDs, delete validation coverage or make every
   required table nullable. If changing optionality deliberately, document and
   test both supported installations using APIs verified for this version.
6. Check the related progression datapacks and loot-only recipe/merchant mod
   dependencies. Do not restore a restriction incidentally while cleaning up
   loot. Do not repair saved-world missing items or migrations without a
   separate explicit user request.

## Validation and deployment

For loot behavior changes, write a concise plan before implementation: overlap
findings; categories/tiers/items/quantities/effective rates; restricted items;
chosen edits. Update the readable balance reference alongside the implementation.

From DEV, run `python3 scripts/check_exploration_loot.py`. Check JSON and script
syntax, item and table IDs, nested references/cycles, exact route uniqueness,
native fingerprints and integration inventory. Extend static coverage for
nested jars or data-driven items if the current asset-based check cannot see
them; corroborate with registry validation rather than treating assets as proof.

Calculate final pool probabilities: gate × entry weight / total weight for
one-roll pools. For independent sources, at-least-one chance is
`1 - product(1 - p)`; expected quantities add. Handle multi-roll, Luck, history-dependent pity behavior and
location/dimension gates explicitly. Estimate complete structure budgets and
independent-player totals. Separate analytical estimates/offline simulation from
observed native output. Template counts are not complete structure censuses.

For behavior changes, use `scripts/prepare_exploration_loot_smoke.py` and
`scripts/ExplorationLootSmoke.java` where the recorded native runtime is
available. Exercise early/deep/late loot after injections; positive/negative
dimension cases; standard/custom wrappers affected by the change; outer-root
delegation; and independent Lootr players at the hard-pity threshold. Require the native PASS markers,
not just exit code. Preserve results/logs/source hashes and report omissions or
unavailable runtime honestly. Previous full counts must not be claimed for a
changed implementation. Documentation-only edits need link/content/deployment
checks, not another native run; retain previous runtime evidence as such.

Keep source authoritative. Run `python3 scripts/sync_exploration_loot.py` from
DEV, then `packwiz refresh` in the pack source, then
`python3 scripts/check_exploration_loot.py --deployed` from DEV. Verify packwiz
hashes and review the diff. This sync copies the whole loot datapack and its
three config/script paths; it intentionally refuses unexpected destination
files and does not delete removed files. For intended removals, explicitly
review and remove only the obsolete mirrored paths before retrying. Do not use
a blanket directory deletion. Changes to other authorized paths or mod jars
need their appropriate separate source-to-instance workflow; this script does
not deploy the entire modpack.

Use unpacked base-folder Paxi loading. Do not install a duplicate ZIP or world
copy. Do not run the branch-changing/pushing `update_packs.sh` for local sync.
Do not modify existing saves, reset personal loot, or ship test mods/worlds.
Preserve unrelated settings and working-tree changes. State restart needs:
behavior updates affect new loot rolls, existing unopened table-backed
containers and ungenerated personal Lootr inventories; already generated
contents stay unchanged. Mod removals can have separate world compatibility
effects that this loot workflow does not repair.

## Implemented idea components and native pity

The twelve former brainstorm concepts are implemented; consult `LOOT-IDEAS.md`,
`IDEAS-IMPLEMENTATION-PLAN.md` and `ideas_pools` in the tuning reference. Tool
parcels are named ordinary chests with vanilla container contents; do not replace
them with invalid overfilled bundles. Count the whole kit budget, preserve
recursive dimension filtering and test native chest component application. New
scrolls use the native spell function with quality 0 and an explicit basic-spell
whitelist. New maps use the native bounded Overworld village lookup; retain the
marked-placeholder removal and test real saved map data, not just an item ID.

Native Simply Swords pity is restored; see `RESTORE-PITY-PLAN.md`. The retired
companion source remains outside the pack for history only. Keep it out of
source, installed and isolated-runtime mod sets. Audit the native roller and
Lootr hook on updates; verify eligible-table hard/soft pity, easy-table exclusion,
same-region exclusion and independent players. Never migrate or erase real
saved state to demonstrate pity. The previous no-pity plan is historical.
