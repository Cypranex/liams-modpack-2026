# CTOV Village Terrain Placement

Uses Lithostitched to replace Improved Village Placement's terrain suitability
condition for CTOV small and medium villages. The village buildings and layout
sizes are unchanged.

| CTOV size | Check radius | Checked span | Grid spacing | Height tolerance |
| --- | ---: | ---: | ---: | ---: |
| Small | 40 blocks | 80 x 80 blocks | 16 blocks | +/-10 blocks |
| Medium | 48 blocks | 96 x 96 blocks | 16 blocks | +/-10 blocks |
| Large | 64 blocks (IVP default) | 128 x 128 blocks | 16 blocks | +/-10 blocks |

Both modifiers use priority 2100, after IVP's default priority 1000, and
`append: false`. This replaces the original condition instead of keeping the
64-block check alongside the smaller one. CTOV's existing biome requirements
still apply. No modifier targets large CTOV villages or non-CTOV villages.
The small check samples a 6 x 6 grid; medium samples a 7 x 7 grid.

Requires CTOV, Improved Village Placement, and Lithostitched. Configured against
CTOV 3.6.3 and the installed IVP 1.1.1 artifact with Lithostitched 1.8.1.

This unpacked directory is the deployed datapack. Paxi automatically loads it
from the base `datapacks/` directory with its base-folder loading option enabled.
Do not also deploy a ZIP under `config/paxi/datapacks/`. Restart Minecraft, then
reopen the world to load the global datapack. Existing villages are not moved; assess the change
in fresh terrain or a new test world.

The two `spawn_condition.radius` values can be adjusted independently. Sparse
Structures village spacing remains a separate setting.
