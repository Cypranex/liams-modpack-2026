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
