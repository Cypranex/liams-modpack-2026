# Stronger village loot — 2026-11-15

The 2026-11-13 item-variety expansion was too quiet in small villages: ordinary
houses had 40% for one food/drink and 2% for a modest discovery, leaving 58.8% of
chests with neither. CTOV's taiga houses use the covered vanilla taiga-house table;
this was a balance issue, not a missing CTOV namespace route.

This revision changes **36 exact village roots**, keeping 339 total recipients,
233 authored item IDs and all native loot. Six village profession profiles are
separated from the shared mansion/dungeon profiles, for 36 profiles overall.

| Village profile | Primary selection | Shared useful/decorative selection | Other pools |
|---|---:|---:|---|
| Ordinary houses / Ribbits merchant and nitwit | Guaranteed one food/drink | 30% for one weighted toy, decoration, soap or garment | No added weapons/accessories |
| Libraries, cartographers and temples | Guaranteed one modest food/drink/paper/canvas | 20% desk utility | Existing scroll 1%, globe 0.5%, village map at most 0.2% unchanged |
| Kitchens / bakeries / cooks / butchers | Guaranteed one meal/drink | 20% empty lunch basket | Cheese sample 3% unchanged; culinary garment 10% |
| Smiths, armorers, masons and toolsmiths | 75% one small material selection | 20% one workshop tool | Project kit 0.75% unchanged; work garment 10% |
| Shepherds and tanners | Guaranteed one cloth/string/cotton/soap | 20% one ordinary garment | Ordinary cape 0.25% unchanged |
| Fishers | Guaranteed one seafood/bait selection | 20% one tackle item or fishing apron | No advanced rods |
| Farms, foragers and Ribbits gardener | Guaranteed one preserve/food/seed selection | 15% seed pouch/flute/farmer hat | Garden kit 0.75% and preserves 4% unchanged |
| Fletchers / CTOV archers | Guaranteed one packed provision/arrow/canvas selection | 20% quiver/slingshot | Still excluded from guard weapon and kit pools |

Each percentage applies to the whole shared pool, not to every candidate separately.
Counts and weights are unchanged: generally one item, with existing 1–2 snack,
2–4 bait and small material counts. Guaranteed means a single modest selection per
eligible chest roll, not one item from every mod. Native contents remain additional.
No duplicate protection or fixed per-village reward count has been introduced.

## Per-player expectations

Ten ordinary household chests now average **10 food/drink selections and 3 discoveries**.
The chance of at least one discovery is `1 - 0.7^10 = 97.18%`; at least two is
`1 - 0.7^10 - 10 × 0.3 × 0.7^9 = 85.07%`. These are analytical expectations, not a
promise that every village has ten qualifying chests or gets a particular reward.
Food counts may exceed selections for small snacks with the retained 1–2 provider.

Utility weights remain 3 each for flute/bubble blower, 4 for soap, and 1 each for
ten decorations and two garments (total 22). A particular cup or garment is therefore
`30% / 22 ≈ 1.36%` per household chest; any decoration is 13.64% combined. This keeps
most new value in modest domestic finds rather than bulk equipment or resources.

CTOV taiga house templates contain one or two table-backed house chests each. Its
small variant limits layout size; it does not select a lower loot tier. Profession
buildings use their own vanilla/CTOV tables and receive the appropriate village
profile. A bakery that delegates to the farm table still receives only its outer
kitchen profile. Each table has exactly one authored modifier route.

For ten profession-chest scenarios: fishing averages 10 provisions and 2 tackle finds;
workshops 7.5 small supplies and 2 tools (plus the retained rare kit); wardrobes 10
cloth/soap and 2 garments (plus only 0.025 capes). Multiply aggregate budgets by the
number of independent Lootr players. No refresh/team-mode or player-state changes.

Non-village kitchens, smithies, wardrobes, fishing stores, gardens, hostile guard
stores and all sparse/dungeon profiles keep their previous rates and contents.
Dimension filtering, Remastered exemptions, archaeology patches, native boss loot,
bounded weapons, special kits, scrolls, maps, accessory gates and unique pity remain.

## Deployment and maintenance

Restart the server/client before new rolls. Existing unopened table-backed chests
and personal Lootr inventories not yet generated can use the new rates. Already
rolled inventories remain unchanged; no saves, personal loot or pity counters reset.

Exact profile memberships and retained kit-rule partitions are in
`tuning-reference.json` under `village_revision`. Development tools are
`build_village_loot.py` and `check_village_loot.py`, with the frozen pre-change baseline
and native/static evidence in development `docs/village-loot-2026-11-15/`.
Generators based on older frozen snapshots must not overwrite this revision.
