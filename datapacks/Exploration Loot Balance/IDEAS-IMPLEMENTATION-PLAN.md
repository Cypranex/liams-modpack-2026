# Loot ideas implementation — 2026-10-25

> Historical plan: the pity disable was undone on 2026-10-26. See
> [native pity restoration](RESTORE-PITY-PLAN.md); the discovery pools remain enabled.

Implement the twelve remaining concepts in LOOT-IDEAS.md using existing exact
profiles and reviewed subsets, with one selected reward per pool. Keep boss,
lighting, materials, weapon and dimension restrictions. Finish the separately
requested Simply Swords pity disable without altering its base percentages.

## Audit decisions

Vanilla bundles cannot normally hold several unstackable tools plus food/ammo.
The four proposed parcels therefore use **named ordinary chests with vanilla
container components**, which release their supplies when placed/opened. This
avoids invalid overfilled bundles and custom mod storage codecs; the existing
dimension guard recursively checks the contents. These are small kits, not
Shulker Boxes. Quark's current rune is a smithing template with further costs;
use a Supplementaries globe for the collector's small decoration instead.

Installed Iron's loot demonstrates its native spell function and explicit
spell whitelist. Use quality 0, restricted to Magic Missile/Firebolt, producing
level-I scrolls. Basic Oakskin/Evasion elixirs carry their effect in the item
class and need no invented potion component. Avoid native magic-rich Iron's
tables when adding elixirs. Reliable Backpacks' active recipe is six leather
plus two Farmer's Delight rope: keep the empty bag far rarer than supplies.

Native Minecraft exploration maps support a village destination tag. Restrict
to Overworld rural libraries, bounded search radius 8, skip-existing false
(avoid progressively expanding the search), and a 0.2% gate. Mark generated
survey maps and remove failed/unfilled results after modifiers. Never hand out
an ordinary placeholder map when no target is found. Validate actual map data
in an isolated generated world; record search/runtime limitations.

## Additions (conditional final pool chances)

| Concept | Recipients | Contents/quantity | Pool chance |
|---|---|---|---:|
| Surveyor's kit | Expedition caches; deep dungeon supplies at Overworld Y <= -64 | Altimeter, regular chalk, chicken sandwich, one each | 0.75%; 0.5% |
| Gardener's parcel | Garden stores | Seed pouch, 3 cabbage seeds, 3 tomato seeds, one snack | 0.75% |
| Smith's project kit | Workshops | Blueprint, sand paper, 2 andesite alloy | 0.75% |
| Archer's cache | Five hostile guard roots (exclude fletcher) | Empty quiver, 8 ordinary arrows | 0.5% |
| Tavern tasting sample | Kitchens | One flaxen cheese wedge | 3% |
| Orchard preserves | Garden stores | One apple jam, baked pear or jam bread, equal weights | 4% |
| Specialist pearls | Nether / End expedition profiles | One crimson/warped/soul pearl; one ancient/corrupted pearl | 1%; 0.75% |
| Basic elixir | Explicit archaeology/temple/witch labs without native elixir injection | One Oakskin or Evasion, equal weights | 1% |
| Beginner scroll | Rural libraries | One level-I Magic Missile or Firebolt, native selection weights | 1% |
| Collector's keepsake | Rural libraries | One ordinary Supplementaries globe | 0.5% |
| Empty backpack | Four hidden treasure roots | One Reliable Backpacks bag, no extra contents | 0.25% |
| Annotated village map | Overworld rural libraries | One real native exploration map, only on successful lookup | At most 0.2% |

Example budgets per player: 24 deep dungeon chests add 0.12 survey kits
(0.36 contained items); 20 garden stores add 0.15 parcels and 0.8 fruit portions;
24 hidden treasure chests add 0.06 bags. Sparse high-density profiles get no
new pools. Existing food/tool/weapon chances remain alongside these additions,
and full structure budgets include all retained native injections.

Verify item/spell/table/function IDs, nested contents and component codecs in
the installation. Extend static probability outputs for named kits and their
co-occurring contents. Native tests must check real kits, usable spells/elixirs,
empty bags, dimension-rejected specialist pearls, map success/failure, and
disabled pity with large saved counters. Preserve old evidence, sync from the
source, refresh packwiz and verify deployment without modifying existing saves.

Supplementaries/Quark converts the native exploration-map function to a quill
and raises its search radius. For only our marked survey rewards, an exact
four-root LootJS hook resolves that result through Minecraft's native map APIs
using the original village tag, radius 8 and skip-existing false. Other maps and
quills keep their existing behavior. Null lookups produce no reward; wrong
dimensions are rejected. This avoids changing global map/quill settings.
