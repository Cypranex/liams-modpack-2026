# No Ocean Ships

Prevents new intact ocean/coastal ship, boat and raft structures. Shipwrecks
(including beached wrecks) and End ships retain their existing generation.
Does not remove structures from generated chunks. Restart the game/server
before exploring new chunks. Paxi loads this from the base datapacks folder.
Minecraft 1.21.1 / pack format 48.

Disabled standalone structures:
- `supplementaries:galleon`
- `grim_kingdoms:ship2` (all 12 pool variants)
- `aquamirae:pirate_ship`
- `structory:boat`
- `formationsoverworld:raft`

Each native structure definition is retained with only `biomes` changed to an
empty direct list, so no biome can admit a new structure start. CTOV beach
outpost ships and beach village decorative boats are replaced with empty pool
elements at their original weights, preserving other pieces' probabilities.

Vanilla, Grim Kingdoms and Aquamirae shipwrecks are untouched, along with ocean
villages, ruins, monuments, aquatic creatures, player-built vessels and raid
boats. End ships and airships remain outside this ocean-only policy. Providers
and loot resources remain installed for existing structures; no loot rolls,
archaeology probabilities or progression recipes are changed.

Definitions are version-specific; recheck installed provider definitions on
updates. Development evidence lives outside the distributable pack in
`minecraft-mods/modpack-development/docs/no-ocean-ships-2026-11-09/`.
