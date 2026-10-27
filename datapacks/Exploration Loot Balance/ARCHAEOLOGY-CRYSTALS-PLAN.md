# Archaeology crystal plan — 2026-10-26

User authorized a weight-1 Nether Crystal entry in every sand/gravel loot table.
Patch existing tables additively with Blueprint Remolder (already installed), not
extra pools, global modifiers, brushing hooks, replacement tables or mod jars.
Preserve all native entries, weights, conditions, functions and other-mod additions.
The existing desert_pyramid crystal entry remains untouched and is not duplicated.
Each appended entry has weight 1, quality 0 and default quantity 1. Native table
rolls/conditions remain; probabilities vary with native weights and delegation.

Two Grim Kingdoms sand/gravel references reuse ancient_city/woodland_mansion chest
tables. Their entries use vanilla location_check on the four vanilla/Lootr
sand/gravel block IDs so ordinary chests never select the new crystal entry.
This is a JSON loot condition; no code/runtime brushing check is installed.
Nether Crystal remains an explicitly exempt Overworld progression key.

Templates without an assigned table cannot acquire a new item through table-only
edits. Better Archeology underwater placeholders become fossiliferous dirt and
are outside sand/gravel scope; desert obelisk placeholders get their table from
processors. Empty Grim Kingdoms, Formations, Better Archeology jungle and D&T
crypt placeholders remain as authored; no NBT, saves, block conversion, crafting,
red sand, dirt or unrelated tables are changed.

Validation: parse all patches, assert exact one-entry append / no duplication,
native registry decode and loaded-entry preservation, seed sampling each targeted
table and normal chest exclusion, existing loot regression and tips review.
Sync reviewed datapack, refresh packwiz and verify deployed bytes. Restart needed.
