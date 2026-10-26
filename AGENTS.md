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
tags include that inventory; both back tags remove it with NeoForge's additive
`remove` field. Curios **body maps to Accessories cape** in the installed
Accessories Compatibility Layer. Banner Capes' entity binding is overridden to
body. Preserve this mapping and unrelated back-slot entries on updates.

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
