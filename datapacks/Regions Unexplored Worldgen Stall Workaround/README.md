# Regions Unexplored worldgen stall workaround

Minecraft 1.21.1 / Regions Unexplored 0.6.3 / Lithostitched 1.8.1.
Implements https://github.com/Apollounknowndev/lithostitched/issues/115#issuecomment-5713120032 .

Overrides eight native Regions Unexplored placed features and removes only their
NOT lithostitched:in_structure block-predicate filter. All counts, height ranges,
scans, offsets, biome checks, air checks and configured-feature IDs stay native.
Those decorations can now generate inside structures; this includes lava falls
and lava deltas. This is a workaround, not a Lithostitched code fix.

Install this unpacked folder in the server base datapacks directory with Paxi
base-folder loading enabled (as configured by this modpack). Do not install a
duplicate ZIP or world copy. Restart the entire server to load worldgen registry
changes and clear existing blocked generation work; cancelling/restarting pregen
or using /reload is insufficient. Existing chunks are not regenerated.

After restart, verify this pack appears in /datapack list enabled, then resume
pregen and confirm progress continues past the previously stuck area. Runtime
recovery on the affected remote world has not been verified by the author.
Remove this folder and restart to roll back. Re-review these complete JSON
resource overrides when updating Regions Unexplored, so they do not mask future
upstream changes. No loot, recipes, structures or saved data are edited.
