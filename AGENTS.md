# Agent instructions for this pack

## Loot and mod changes

Before changing loot, loot-related configurations/scripts, or adding, removing or
updating a content/structure/integration mod, read
[the loot agent instructions](datapacks/Exploration%20Loot%20Balance/AGENTS.md).
They apply to the associated work throughout this repository, including `mods/`,
`kubejs/`, `config/` and other progression datapacks, not only that directory.

The pack source here is authoritative. The installed test instance is
`/home/liam/.local/share/PrismLauncher/instances/Local Testing/minecraft`.
Inspect actual installed jars and effective pack overrides; never infer registry
IDs or APIs from another Minecraft/mod version. Current target: Minecraft 1.21.1,
NeoForge. Recheck versions when dependencies change.

Preserve the loot progression order **Overworld → Nether → Aether → End**,
existing crafting/mining/farming incentives, restricted materials/lighting,
loot-only accessories and native boss/key rewards. Dimension identity is not a
separate requirement; preventing later-stage loot in earlier dimensions is.

Explicit user exception: **Nether Remastered (`nether_remastered:*`) and End
Remastered (`endrem:*`) stay exempt from dimensional loot filtering**. Their
progression items must retain native Overworld acquisition before dimension
access. Do not classify them by mod/item names or confuse them with Better
Nether / Better End, whose dimensional rules still apply.

Development tooling, audit evidence and backups live outside the distributable
pack at `/home/liam/Projects/minecraft-mods/modpack-development`. Read its
`docs/exploration-loot/VALIDATION.md` before relying on previous test results.
Use the targeted sync workflow in the loot instructions. Do not edit existing
world saves, reset Lootr inventories or run `update_packs.sh` as routine sync;
that script switches branches, merges, commits and pushes.

## Nether Crystal archaeology balance (required)

The user-approved policy is **2% per selected brushed reward**, using only loot
JSON, for every identified table-backed vanilla/Lootr suspicious sand and gravel
source. It supersedes the 2026-10-26 weight-1 expansion. Do not restore weight-1
entries: they produced up to 50% crystals and ~21% through nested delegation.
Do not add extra reward pools, brushing hooks, player/progression gates or
crystals in ordinary chests. Keep Nether Remastered exempt from dimension filters.

`datapacks/Exploration Loot Balance/archaeology-crystals.json` is the exact source
inventory and input-fingerprint reference; `ARCHAEOLOGY-CRYSTALS-PLAN.md` and the
loot README explain the JSON gates. Blueprint Remolder priority 10000 captures
native entries after reviewed native additions, then uses a 2% crystal branch
and unchanged weighted normal fallback. Better Archeology's delegated tables
already provide 2%; only its artifact-shards branches get a local gate. The
native desert-pyramid crystal is removed from the fallback, not added twice.
Shared chest tables use vanilla table-level item functions gated on vanilla/Lootr
suspicious blocks at origin. This covers C&C/Quark entries appended after JSON
remolding; ordinary chests are excluded. Converted crystals are reset to count 1
and clean default components using a registry-validated cleanup patch. Rebuild
and validate that patch when item/component providers change.

Every content/structure/integration mod addition, removal, replacement or update
(and changes to Minecraft, Blueprint, Lootr, Nether Remastered or other loot
scripts/packs) must re-audit sand/gravel structure NBT, processor rules, procedural
assignments, nested table references and native Remolder order/contributions.
Add newly used tables; remove orphaned patches/provider requirements when mods
are removed; preserve remaining shared users and other mods' rewards. Review
changed originals before rebuilding; never approve changed fingerprints blindly.
The checker locks the reviewed installed-jar inventory as well as original table
and native Remolder fingerprints, so added/removed/updated jars require review.
Blocks with no assigned table, fixed-item crafts, dirt/red sand and fossils are
outside this table-only policy; document new exceptions instead of claiming all
blocks work. Do not modify saves or structure NBT to hide these limitations.

From development, run `scripts/audit_archaeology_crystals.py`, review its inventory,
update the source reference deliberately, then `scripts/build_archaeology_crystals.py`
and `scripts/check_archaeology_crystals.py`. The main loot checker includes this
check. Extend `ArchaeologyCrystalChecks.java` / runtime providers for new sources;
require native 2% first-stack rates, clean crystal components, full original
fallback preservation, nested
2% composition, other-mod entries and normal chest exclusion. BrushableBlockEntity
uses the first stack, so an any-crystal test on a multi-roll chest is insufficient.
Run the existing loot regressions and `scripts/check_archaeology_crystal_rates.py`.
Update loot docs/tips review, deploy reviewed files and run deployed checks.
Current evidence: development `docs/archaeology-crystals-2026-10-27/`; retain the
2026-10-26 evidence as historical. Restart before new loot rolls.

## Tips maintenance (required)

Every mod addition, removal, update, or configuration change must include a tips
review. Also review tips after recipe, tag, script, resource-pack, keybinding,
quest, or progression changes. Source tips are
`kubejs/assets/liams_modpack/tips/*.json`, with English text in
`kubejs/assets/liams_modpack/lang/en_us.json`; filtering is in
`config/tipsmod.json`. Keep stable descriptive IDs when revising existing tips.

Read the development-only guide and per-ID evidence under
`/home/liam/Projects/minecraft-mods/modpack-development/docs/tips/`.
Verify claims against the installed versions and effective overrides. Remove or
rewrite tips for removed, disabled, replaced, or changed mechanics; review newly
supplied built-in tips and their namespace filters too. Do not infer behavior,
compatibility, refunds, or safety from a mod name or another version's docs.

Keep tips short, practical, friendly, and usable at any stage. Cover useful
controls, interfaces, inventory, accessibility, building, and everyday mechanics
without near duplicates or overrepresenting one mod. Omit bosses, hidden mobs,
structures, dimensions, secrets, surprise events, rewards, discovery methods,
encounter solutions, unlock sequences, and late-game discoveries unless clearly
presented at the start. Vague teasers are spoilers too; omit uncertain subjects.
Use supported text-component keybindings rather than literal default keys, and
maintain localization and development-only provenance alongside content edits.

From the development directory, run `python3 scripts/check_tips.py` and, when
the cached runtime is available, `python3 scripts/check_tips_native.py`.
Changed dependency fingerprints require an actual factual/spoiler review before
`check_tips.py --record-review`; do not refresh the baseline just to pass a check.
Deploy only reviewed paths with `python3 scripts/sync_tips.py`, run `packwiz
refresh` here, then run `check_tips.py --deployed` and the native check with
`--deployed`. Sync includes this AGENTS.md, not unrelated config or options.
Remove intentionally retired deployed tip files individually after review.
Restart the client for config filtering changes; a resource reload refreshes
asset tips and translations. Native isolated checks do not establish visual or
in-game interaction verification. Keep tooling and provenance outside the pack.

## Cape equipment and rendering (required)

All wearable cape and cloak items belong in the **Accessories cape slot**, not
its back slot. Backpacks, shields, fins and other non-cape back gear retain
native slots. Do not classify ordinary elytra, scarves, ingredients (including
Cape Harness), or items from their names alone; inspect installed item classes,
tags and behavior. Banner Elytra Capes are cape items; their existing chest-slot
flight mechanics are not a grant of flight from an accessory slot.

The authoritative item inventory is
`kubejs/data/liams_cape_compat/tags/item/capes.json`. It currently includes
Banner Capes' ordinary and elytra-cape families and Aether's cape family
(including Deep Aether's extension). The pack's Accessories cape/Curios body
tags replace upstream contents with that inventory (strict cape whitelist); both
back tags remove it with NeoForge's additive
`remove` field. Curios **body maps to Accessories cape** in the installed
Accessories Compatibility Layer. Banner Capes' entity binding is overridden to
body. Preserve this mapping and unrelated back-slot entries on updates.

Ordinary body garments use the separate `torso` slot, displayed as **Body**.
`liams_cape_compat:body_equipment` inventories the eight installed Lucky's
Wardrobe body garments; Accessories/Curios torso tags include it. Native Wardrobe
entity bindings replace body with torso, retaining back/head/necklace and both
player/armor-stand targets. Explicit slot data provides one torso slot; the
Accessories chest group includes it. Do not put ordinary body equipment back in
`curios:body`: compatibility globally maps that name to cape. Audit new upstream
body-tag entries and move genuine body garments into the reviewed torso inventory.
Keep strict cape/body tag replacement; do not weaken it to additive membership.
Do not classify a new item solely by its name. Existing saved equipment is never
automatically moved; manually re-equip ordinary garments into Body after restart.

The source for the client Banner Capes -> Wavey Capes bridge is
`/home/liam/Projects/minecraft-mods/cape-compat`; its production jar is
`mods/liams-cape-compat-1.0.1.jar`. Build and verification instructions are in
that project's README.md. It preserves banner colors/patterns, selects equipped
or visible cosmetic capes, and replaces the original rigid renderer. Aether
capes keep their own effect-aware rendering; slot membership alone does not
make an arbitrary mod's cape use Wavey Capes physics.

Every future cape/cloak addition or update must review and extend the inventory,
remove back-slot eligibility, and verify the cape-slot entity binding, rendering,
visibility/cosmetics, unique effects and equip behavior against installed APIs.
Add or update the Wavey Capes bridge for new banner implementations or other
cape renderers when needed; never assume animation support follows from a tag
or an item name. Retain native special effects and progression/acquisition.
Extend the native tag/geometry/Mixin checks and perform an in-game visual check
when a client is available. Review dependency pins when updating these mods.
Review tips and synchronize only the reviewed jar, cape data and instructions.
Never rewrite player saves to migrate previously equipped capes; users can move
them to the cape slot themselves.

## Regions Unexplored worldgen stall workaround (required)

Track `datapacks/Regions Unexplored Worldgen Stall Workaround` when updating
Regions Unexplored, Lithostitched, FreeTerraForged, Minecraft/NeoForge, or the
Overworld height preset. It implements the workaround reported in
https://github.com/Apollounknowndev/lithostitched/issues/115#issuecomment-5713120032
for feature-generation workers blocking in `InStructurePredicate` through live
server chunk lookups. Reviewed versions: Regions Unexplored 0.6.3,
Lithostitched 1.8.1, FreeTerraForged 1.0.0, Minecraft 1.21.1 / NeoForge 21.1.264.

The eight complete placed-feature JSON overrides remove only the
`minecraft:block_predicate_filter` containing NOT `lithostitched:in_structure`:
`patch/ash_vents_inferno`, `patch/cave_bioshrooms`, `patch/dropleaf`,
`patch/prismarite_cluster`, `patch/redstone_bud`, `patch/redstone_bulb`,
`special/lava_fall`, and `special/overworld_lava_delta`, all under
`regions_unexplored`. On updates, compare each override with the actual new
native definition and rebase the single intended removal. Preserve unrelated
upstream placement changes; do not let old complete JSONs silently mask them.
Check for competing resource overrides and effective datapack load order.

This deliberately removes structure exclusion: decorations, including lava
features, can generate inside structures at any depth, including deeper
structures. Do not claim structure protection is retained. Track upstream issue
115; retire the workaround only after inspecting a corrected implementation and
validating generation with native exclusion restored. Changing pregen tools or
increasing RAM/threads does not repair the observed blocking lookup.

The reviewed Overworld frame is Y=-320..639 (`min_y=-320`, `height=960`). Keep
the native uniform height pattern `above_bottom: 0` through `absolute: 256`
unless an installed-code review supports changing it: FreeTerraForged's
`DynamicHeightRangePlacement` recognizes this exact signature and expands
eligible non-ore top-level features into the extended height bands. Replacing
256 with 639 disables that recognition in the reviewed runtime. Removing the
downstream structure predicate preserves height expansion and existing surface
rescue eligibility; do not apply the disabled ore-transform policy to these
non-ore decorations. Recheck these assumptions whenever FTF or world height
changes, and validate biome/scan rules rather than assuming every sample places.

Development evidence and input fingerprints live outside the pack at
`/home/liam/Projects/minecraft-mods/modpack-development/docs/overworld-worldgen-stall-2026-10-26/`:
`REPORT.md`, `WORKAROUND-VALIDATION.md`, `DEPTH-COMPATIBILITY.md`, and
`workaround-inputs.json`. Run the development script
`python3 scripts/check_ru_worldgen_workaround.py` against reviewed native inputs;
update its evidence deliberately after an upstream review. Review tips for
changed claims, synchronize only reviewed paths, and refresh packwiz metadata.
Use the unpacked base-folder Paxi datapack; avoid duplicate ZIP/world copies.
A full server restart is required to clear existing blocked work and load the
changed worldgen registries; pregen cancel/restart or `/reload` is insufficient.
Verify enabled packs and resumed generation past the affected area. Static
checks do not establish recovery in the remote world. Do not edit existing
saves or regenerate chunks as routine deployment.

## Dungeon Crawl compatibility (required)

Dungeon Crawl 2.3.17 uses the companion
`mods/liams-dungeon-crawl-compat-1.0.0.jar`, built from
`/home/liam/Projects/minecraft-mods/dungeon-crawl-compat`. Its required Mixins are
pinned to that exact Dungeon Crawl version. Review installed call sites before
updating either mod; never bypass failed injections to make an update load.
The companion chooses 5–8 native-spaced floors with the bottom 24–48 blocks above
the active minimum, permits negative starts, corrects entrance bounds and surface
biome coordinate units, and replaces restricted blocks only in Dungeon Crawl's
own placements/grave features. Keep `config/dungeon_crawl.toml`'s
`no_nether_blocks=true`; this alone does not sanitize literal model resources.

On changes, review the depth plan, surface staircase, room/model bounds, biome
eligibility, repeated final-layer difficulty, cave interaction and per-player
container budget against the actual world frame. Keep the eight-floor cap.
Do not infer that the RU structure-predicate workaround protects dungeon rooms
from decorations: lava/features can still intrude. Native loot trims and nine
procedural recipient roots live in Exploration Loot Balance; all three addon
sampling resources remain explicitly disabled. Keep unique pity/eligibility,
loot-only accessories and Remastered progression exceptions intact.

Build/transform-check with that project's `build.py`/`check.py`; its
`prepare_worldgen.py` creates a fresh disposable installed-terrain fixture.
The development `DungeonCrawlChecks.java` runs alongside ExplorationLootSmoke.
Require the native layout, placement, chest, terrain and existing loot/Lootr PASS
markers. Evidence is under development `docs/dungeon-crawl-audit-2026-10-26/`.
Sync only reviewed source files/jar, review tips, refresh packwiz, and restart.
New structures need new chunks; never migrate existing dungeons or inventories.

## Hedge's Bestiary progression (required)

The complete progression customization ships in
`mods/liams-bestiary-progression-1.0.2.jar`, built from
`/home/liam/Projects/minecraft-mods/bestiary-progression`. It includes recipes,
item registration/model/name, taming/breeding rules and Patchouli overrides.
Do not restore the retired Bestiary KubeJS scripts/assets or add duplicate
datapack/resource-pack overrides. It has no KubeJS dependency, but intentionally
retains the saved item ID `kubejs:abyssal_treat`; do not rename it or register it
twice. Install on both client and server and restart after changes.

The companion is pinned to Bestiary 1.1.3. Recheck native capture conditions,
treat tiers, breeding/cooldowns and the persistent one-scale trade on updates.
Build with `build.py`; run `verify.py` with and without `--with-kubejs` and
require the native PASS marker. Keep all species tamable; preserve the approved
material gates and per-parent breeding costs. Review tips and loot inventories
for dependency changes; never rewrite saved pet ownership or inventories.

Aquatic natural spawning accepts 10% of selected pack attempts for the eleven
reviewed water species through a required NaturalSpawner Mixin. Preserve
whole-group gating before group size/placement checks, native followers (including
Nib Nibs), all habitat/depth restrictions and non-natural spawn sources. Gawks
and land species retain native rates. Recheck the injection/call sites when
Minecraft, NeoForge or Bestiary changes; never replace this with per-entity
denial, which fragments schools. Native seeded selection and follower tests
are part of both companion verification profiles.

## Fowl Play wildlife population (required)

`mods/liams-fowl-population-1.0.1.jar` is built from
`/home/liam/Projects/minecraft-mods/fowlplay-population`, pinned to Fowl Play
1.2.3 and Minecraft 1.21.1 / NeoForge 21.1.264+. It enables native distance/idle
despawning for unprotected wild ducks/geese and rejects whole natural flock
attempts when 24 combined wild birds are within a 64-block sphere. Accepted
flocks finish, so this is a spawning threshold, not a hard entity cap. Config:
`liams_fowl_population-common.toml`. Other birds, breeding and non-natural
spawn sources retain their native spawning; Respawning Animals is unchanged.

Preserve named, trusted, domestic, clipped, leashed, persistent/riding birds and
breeding protection. Kept signals and new breeding parents/offspring acquire
saved native persistence. Old birds with no spawn reason or kept flags cannot
be distinguished from wildlife; do not promise old breeding provenance can be
reconstructed. Enclosures alone are not protection. Do not migrate real saves
or perform blanket flock removal as routine deployment.

When updating Fowl Play/Minecraft/NeoForge or spawning mods, review both required
Mixins (BirdEntity distance eligibility and NaturalSpawner flock selection),
native saved spawn reasons and breeding/kept flags. Run `build.py` and both
`verify.py` profiles (with/without `--with-respawning-animals`), require
`FOWL_POPULATION_PASS`, review tips/loot resource scope, and deploy only the
production jar. Tests run in disposable worlds; long-term/full-pack population
and client performance still need gameplay observation. Restart client/server.

## Reviewed update guards (2026-11-05)

Item Descriptions is pinned to NeoForge 2.8.0 because installed Field Guide 1.23.0
requires >=2.8.0 and uses its newer classes. Do not accept Modrinth's older
1.11+1.21 artifact as an upgrade or bypass Field Guide's dependency check.
Torch compatibility 1.0.5 and Flimsy Wall Lanterns 1.0.7 are reviewed against
exact Amendments 1.21-2.2.7; rebuild/check both when that provider changes.

CTOV Village Terrain Placement uses pack-owned surface tags and removes only
three underground IDs from IVP standard-village membership. Keep native CTOV
size/village tags intact. On CTOV/IVP/Lithostitched changes run development
scripts/check_ctov_compat.py and the native CTOVPlacementChecks included in
the loot fixture; inspect effective radii, underground exclusions and native
layout budgets. Exploration Loot Balance filters exactly seven inactive Wares
warehouse tables with obsolete set_nbt functions. Review their fingerprints
and the filtering decision before installing Wares or updating those originals.

Torches x Punchy.zip is built from the installed Paxi Drigo archive by
../minecraft-mods/flimsy-torches-x-punchy/build.py. Resolve parent geometry,
display and texture aliases before giving models to Punchy's direct parser.
Keep empty handheld Flimsy lantern light at zero and all four torch items as
native sprites. Source/installed copies and native parser/geometry checks must
match; game visuals still need ordinary observation after a client restart.

## Moa armor network fix (2026-11-07)

`mods/liams-moa-armor-sync-fix-1.0.0.jar` snapshots ItemStack values in Protect
Your Moa's armor packet factory before the native right-click hook consumes the
held armor. Required Mixin, pinned to Protect Your Moa 1.0.0 / Nitrogen Internals
1.1.25, reviewed with Aether 1.5.10 / Minecraft 1.21.1 / NeoForge 21.1.264. Keep
the upstream mod installed; the server needs the companion and a restart. Native
wire format is unchanged, so clients do not require the fix.

Source/build/tests: `/home/liam/Projects/minecraft-mods/moa-armor-sync-fix`. Run
`build.py` and `verify.py`: require upstream `Empty ItemStack not allowed`
reproduction followed by `MOA_ARMOR_PASS` for delayed encoding, three recipients,
six armor types, consumption/components, equipment/protection and inventory/save
round trips. Tests use fresh temporary worlds, not real saves. Review call sites
and codec before updating pinned providers; retire only when upstream snapshots
the stack. Do not alter Nitrogen's global codec or suppress encoding errors.

## Skyroot chest save compatibility (2026-11-07)

`mods/liams-skyroot-chest-compat-1.0.0.jar` restores only the historical
`everycomp:q/aether/skyroot_chest` and `everycomp:q/aether/trapped_skyroot_chest`
registrations using Every Compat's native blocks/items/block entities. Ascended
Quark registers its alternatives even when its module is disabled, which makes
Every Compat skip these saved IDs. A config toggle alone cannot restore them.
Keep both upstream mods installed. The companion is pinned to Every Compat
1.21-2.11.57 and Ascended Quark 1.1.7, Minecraft 1.21.1 / NeoForge 21.1.264+.
Install on client and server and restart both; registry additions require both.

Disable only AQ Skyroot normal/trapped chest acquisition: per-block conditions
hide their creative/JEI entries and two exact recipe overrides use a NeoForge
false condition. Keep AQ block/item/block-entity registrations and existing
inventories usable. Do not delete/remap these IDs or disable the whole Skyroot
woodset/Deep Aether integration as routine cleanup. Preserve all unrelated
Every Compat overlap checks and the targeted hazardous blacklist behavior.

Source/build/native checks: `/home/liam/Projects/minecraft-mods/skyroot-chest-compat`.
Run `build.py` and `verify.py`: require baseline missing-ID reproduction, exact
registry/recipe delta, original/AQ normal/trapped inventory/component/name
round trips, double chests, native crafting and save/restart checks. The forced
AQ-module profile must disable only its chests while retaining its Skyroot post.
Test-only Zeta production-mode fixture code must never ship. Review tips and
loot resource scope for dependency changes; see development evidence under
`docs/skyroot-chest-compat-2026-11-07/`. Existing pack-wide loot/tips fingerprint
failures predate this companion; do not refresh unrelated baselines blindly.

No real saves are migrated. Old chests recover only if their saved block/entity
data still exists; data already saved as air/discarded needs a suitable backup.
Installing this companion alone cannot reconstruct erased inventory contents.

## Recipe format and missing-item compatibility (2026-11-07)

The 108 reviewed overrides live under `kubejs/data/{cocktailsdelight,everycomp,
cataclysm_spellbooks,fcru,shieldexp}/recipe/`. Keep them in the late KubeJS data
layer: Every Compat dynamically regenerates its hedge recipes after ordinary
Paxi datapacks. Do not move those fixes to a lower-priority datapack.

Forty-eight Cocktails Delight filling/emptying recipes use Create 6 output
`id` fields and `neoforge:single` sized-fluid inputs, preserving item counts and
250 mB volumes. Forty-four hedge recipes use the installed DT leaf definition's
registered primitive-leaf item, retaining native log tags, patterns, hedge
feature conditions and two-item outputs. Do not replace every JSON `item` key:
item ingredients and Create item/fluid outputs use different codecs.

Eleven dormant Cataclysm Spellbooks recipes, two obsolete RU shrub-cutting
recipes, two optional Vegan Delight pouring recipes and one Savage & Ravage
shield recipe are conditioned before decoding. Do not enable missing content,
invent replacement items or remove valid remaining recipes to silence errors.
Preserve the optional pouring volumes (250/1000 mB) and Savage & Ravage's actual
NeoForge mod condition. Re-review conditions when optional providers are added.

Tooling/provenance: `/home/liam/Projects/minecraft-mods/recipe-compatibility`.
Review changed original/provider hashes deliberately; regenerate with
`build_overrides.py`, check with `check_overrides.py [--deployed]`, and run
`verify.py` in fresh temporary worlds. Require all 108 baseline failures,
92 repaired/16 guarded targets, native crafting/processing and wrong-input
checks, unchanged unrelated recipes and resource-reload stability. Test-only
Zeta/BCLib production fixture shims must never ship. Review tips and synchronize
only manifest-listed files. Restart server/clients after deployment. No saves,
loot tables, progression gates or previous Skyroot chest fixes are modified.

## Loot JSON compatibility repairs (2026-11-07)

Ten exact overrides live in Exploration Loot Balance under `data/aethersdelight`,
`data/mynethersdelight`, `data/spawn`, `data/cocktailsdelight`,
`data/somakespells` and `data/cataclysm_spellbooks`. Tooling/input hashes/native
checks are in `/home/liam/Projects/minecraft-mods/loot-compatibility`.

Preserve the four wing modifiers' attacker/knife predicates, exclusive raw/cooked
fire checks, counts and native Looting chances. The two bastion modifiers rename
only Farmer's Delight's obsolete `lootTable` field to `table`; never add a second
route/pool or alter the native helper tables. Keep post-modifier dimension
filtering and Remastered exemptions unchanged.

The active Spawn Ant Mound table keeps all valid weights out of 25; its removed
roly-poly reward becomes an empty weight-1 slot. This native custom brushable
block is created by dirt-rot processing and is outside the selected vanilla/Lootr
suspicious-sand/gravel crystal inventory. The coverage ledger records it as a
native exclusion, not a generic reward root. Do not redirect it to a replacement
mob/item, renormalize its valid rewards, or add unapproved crystal/bonus pools.

Guard the unused upper-hops table without changing active `hops_crop` harvests.
Infernal Blaze loot requires the actual Born in Chaos provider/item, matching
its native compatibility registration. A single conditional-disabled resource
handles Cataclysm Spellbooks' dangling prison modifier; do not replace the global
modifier index, fabricate missing rewards, or use an air-item no-op. Re-review
and retire these guards when upstream actually supplies compatible resources.

Run `check_overrides.py [--deployed]` and `verify.py`; require native knife/fire/
Looting and negative cases, seeded exact bastion comparison, unchanged anthill
probabilities and active hops harvests. Run the existing loot/dimension/Lootr/pity
and selected 2% archaeology checks using `prepare_regression.py` plus the native
rate checker. Native evidence is in development `docs/loot-compatibility-2026-11-07/`.
Use targeted loot sync, review tips and refresh packwiz. Existing broader jar/
archaeology coverage fingerprints include unrelated unreviewed mod changes;
do not refresh them blindly or claim full current-pack coverage from subset
checks. Restart for new rolls; do not modify real saves or generated inventories.

## Create / RSLS sound-thread compatibility (2026-11-08)

Keep Raise Sound Limit Simplified enabled. Client companion
`mods/liams-create-sound-compat-1.0.0.jar` publishes immutable Create ambience
position/volume frames on the client thread for RSLS audio reads. It fixes the
observed SoundScape.determineMeanPos ConcurrentModificationException through
Sable's initial playback-position hook. Required client-only Mixin, pinned to
Create 6.0.10 and RSLS 1.1.17; reviewed with Sable 2.0.6 and Minecraft 1.21.1 /
NeoForge 21.1.264+. No server installation or save edits are needed.

Source: `/home/liam/Projects/minecraft-mods/create-sound-thread-compat`.
Run `build.py` and `verify.py`; require baseline native CME reproduction,
`CREATE_SOUND_FIXED_PASS` and `CREATE_SOUND_SERVER_PASS`. Preserve native sound
math, five-tick mean cache cadence, relative volume/pitch and stop lifecycle.
Review constructor/play/tick thread ownership and installed audio hooks before
provider updates. Do not move live counter iteration onto the audio executor or
replace the fix with exception suppression. Review tips/resource scope and
refresh packwiz after deployment. Restart clients; actual portal audio still
needs gameplay verification. This CME fix alone does not establish the cause
of every total-silence event. Evidence is in development
`docs/create-sound-thread-compat-2026-11-08/`.
