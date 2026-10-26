# Enchanted Simply Swords plan — 2026-10-25

## Findings

The authored armoury profile currently supplies one of three unenchanted iron
weapons at 8%. Simply Swords 1.70.2's broad standard/diamond/runic injections are
disabled; its native equipment code uses random enchanting, which does not give
this pack an explicit enchantment ceiling. Late unique eligibility, dragon loot
and region/player pity are separate and will remain intact. Loot Integrations
sampling remains disabled, avoiding a second equipment source through donors.

Installed recipes verify iron/diamond longsword, spear, cutlass, katana, rapier,
glaive, halberd and claymore as ordinary craftable weapons. The installed sword
tags support Sharpness and Unbreaking. Vanilla 1.21.1 `set_enchantments` accepts
bounded number providers; `set_damage` specifies remaining durability. The native
test will verify the decoded functions, actual enchantment applicability and
resulting stacks rather than relying on tag names alone. Apothic Enchanting's
installed global modifier concerns warden tendrils, not chest enchanting. The
historically mentioned Loot Category Compatibility / Apotheosis Gems Rare
modules are not present in the current installed mod/datapack inventory.

The deeper Overworld has increasing hostile health/damage/speed, including 2×
damage below -64, 2.5× below -128 and 3× below -256. A modest iron discovery in
those depths is justified; bulk equipment in ordinary surface stores is not.

## Proposed distribution

All pools select **one weapon**, with eight equally weighted shapes. Rates are
final chances for any weapon, not independent rolls per shape. Each weapon has
Sharpness and Unbreaking only; no extra random enchanting step.

| Exact-profile recipients | Tier | Weapon | Enchantments | Remaining durability | Any weapon chance |
|---|---|---|---|---|---:|
| Existing two armoury tables | guarded mid exploration | iron | Sharpness I–II, Unbreaking I | 55–85% | 6%, replacing the old 8% pool |
| Five hostile guard/outpost stores; exclude village fletcher | early/mid combat | iron | Sharpness I–II, Unbreaking I | 55–85% | 3% |
| Ten explicit combat/temple/stronghold/mansion discovery tables | mid exploration | iron | Sharpness I–II, Unbreaking I | 55–85% | 2% |
| Existing dungeon-supply roots, only Overworld Y <= -64 | deep danger | iron | Sharpness II, Unbreaking I | 60–90% | 1.5% |
| Existing eight Nether-supply roots | Nether combat | iron | Sharpness II, Unbreaking I | 60–90% | 2% |
| Existing four hidden-treasure roots | rare mid/late treasure | diamond | Sharpness II, Unbreaking I | 65–90% | 3% |
| Existing four late-treasure roots | late danger | diamond | Sharpness II–III, Unbreaking I–II | 75–95% | 4% |

For 24 qualifying deep chests, expect 0.36 iron weapons; 24 late treasure chests
give 0.96 diamond weapons per player in addition to retained native rewards.
At 4%, each particular shape has a 0.5% chance. These are budget estimates;
native sampling must check the combined outputs and exact recipient predicates.

## Restrictions and implementation

Keep Netherite upgrades, runic forging/tablets and unique/boss rewards on their
existing routes. No new Mending, Looting, Fire Aspect, curses, modded enchants or
above-normal levels. Iron and diamond are Overworld-stage materials; do not
introduce Nether/Aether/End materials or loosen the dimension filter. No village,
kitchen, farm, sparse high-density store or locked victory weapon pools.

Replace the existing armoury pool and append bounded weapon pools to the six
other existing profiles. Use exact `neoforge:loot_table_id` conditions where only
part of a profile qualifies; retain one authored route per root and no helper
injections. Record recipient subsets and ceilings in `tuning-reference.json`.
Validate that nested additive table generation retains the outer queried table
ID; negative village/dense-store samples must remain weapon-free.

Extend static checks for enchantment IDs/function bounds and quantities. Rerun
the native content-subset suite, with weapon distribution/component checks,
negative targets/depths, dimension checks and two-player Lootr pity. Preserve the
prior revision's evidence. Sync reviewed source files, refresh packwiz and verify
deployment identity without opening existing worlds.
