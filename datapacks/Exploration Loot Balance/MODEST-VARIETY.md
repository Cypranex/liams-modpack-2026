# Modest chest variety — 2026-11-13

**Village rates were superseded on 2026-11-15.** See [VILLAGE-LOOT.md](VILLAGE-LOOT.md)
for guaranteed household portions, stronger discoveries and the six village profession
splits. This document retains the prior 30-profile rates as the non-village baseline.

This revision expands the existing 339 exact chest recipients from 22 to **30 profiles**
and from 85 to **233 authored reward item IDs**, retaining all existing reward IDs.
It adds 148 items across ordinary foods, drinks, clothes, decorations, fishing tackle,
travel comforts and staged dimension provisions. Native loot tables and LootJS native
pool tuning are unchanged. The original weapon/kit/scroll/elixir/pearl/map/accessory
pools retain their rates and components; a room moved to a new profile uses only that
profile. Exact reassignments and pools are in `tuning-reference.json`.

## Rates and room identity

A percentage below is for selecting one item from that entire pool. It is not a separate
chance for every listed alternative. One-roll pools use zero bonus rolls; Luck adds no
rolls. Meals/drinks/gear/decorations have count 1, selected small snacks count 1–2,
rope count 2–3 and fishing-store bait count 2–4. Existing special kits retain contents.

| Profile | Exact recipient count | Pool gates in order |
|---|---:|---|
| kitchens | 16 | 45% (47 choices); 1.5% (1 choices); 3% (1 choices); 1% (2 choices) |
| surface_supplies | 8 | 40% (12 choices); 2.5% (10 choices) |
| dungeon_supplies | 13 | 30% (11 choices); 25% (2 choices); 8% (1 choices); 1.5% (8 choices); 0.5% (1 choices) |
| workshops | 12 | 20% (3 choices); 4% (7 choices); 0.75% (1 choices); 1% (3 choices) |
| library_supplies | 11 | 35% (18 choices); 2% (4 choices) |
| hidden_treasure | 4 | 25% (3 choices); 4% (3 choices); 3% (8 choices); 0.25% (1 choices) |
| nether_supplies | 8 | 35% (9 choices); 2% (8 choices) |
| late_treasure | 4 | 25% (4 choices); 4% (3 choices); 4% (8 choices) |
| aether_provisions | 4 | 35% (10 choices) |
| armoury | 2 | 6% (8 choices) |
| village_households | 16 | 40% (38 choices); 2% (15 choices) |
| garden_stores | 6 | 35% (15 choices); 3% (3 choices); 0.75% (1 choices); 4% (3 choices) |
| rural_libraries | 4 | 35% (17 choices); 2% (5 choices); 1% (1 choices); 0.5% (1 choices); 0.2% (1 choices) |
| expedition_caches | 13 | 35% (13 choices); 3.5% (12 choices); 0.75% (1 choices) |
| dungeon_discoveries | 67 | 35% (12 choices); 3.5% (7 choices); 1% (2 choices); 2% (8 choices) |
| guard_stores | 6 | 35% (12 choices); 2.5% (2 choices); 3% (8 choices); 0.5% (1 choices) |
| coastal_caches | 10 | 35% (17 choices); 2% (1 choices); 2% (8 choices) |
| cold_caches | 7 | 35% (10 choices); 2% (1 choices); 2% (4 choices) |
| sparse_stores | 27 | 6% (11 choices); 0.5% (6 choices) |
| magic_resupply | 41 | 35% (8 choices); 2% (4 choices); 1% (2 choices) |
| nether_expeditions | 34 | 35% (9 choices); 3% (3 choices); 1% (3 choices) |
| end_expeditions | 9 | 35% (9 choices); 2.5% (3 choices); 0.75% (2 choices) |
| wardrobes | 3 | 35% (4 choices); 3% (8 choices); 0.25% (3 choices) |
| sparse_wardrobes | 1 | 6% (4 choices); 0.5% (8 choices) |
| domestic_stores | 2 | 35% (19 choices); 2% (12 choices) |
| music_rooms | 1 | 35% (15 choices); 3% (4 choices) |
| fishing_stores | 4 | 35% (17 choices); 3% (8 choices) |
| maritime_stores | 3 | 25% (12 choices); 2% (9 choices) |
| sparse_food | 1 | 6% (27 choices); 0.5% (5 choices) |
| sparse_supplies | 2 | 6% (7 choices); 0.5% (6 choices) |

Kitchens now rotate prepared meals, pastries, coffee, fruit drinks, red wine and selected
seafood. Guard/expedition/common-dungeon stores favor jerky, pickles, kippers, canned
herring, cookies, dried fruit and route supplies. Gardens favor preserves, seeds and
fruit portions. Household stores combine baking, drinks and modest domestic curios.
Workshop discovery gains trowels/abacuses, with an occasional apron; studies gain desk
instruments and drinks. Coastal caches gain seafood/tackle, cold caches warm food and
clothing, and magical stores teas, ordinary snacks and small curios.

New room profiles separate ordinary wardrobes, sparse laundry, domestic bedrooms,
music rooms, fishing stores, maritime stores, sparse dungeon food and sparse dungeon
supplies. Witch Villa laundry has **26 containers in one reviewed template**, so stays
at 6% provisions and 0.5% garment, with no cape pool. Ordinary wardrobes have 3% for
one of eight garments and 0.25% for one of three ordinary banner capes (no flight).
Music-room horns receive a real native instrument component. No empty scrolls or
mystery payloads were introduced. Satchels and sleeping bags use native default items.

Nether base selections include My Nether's Delight foods; ordinary Aether chests gain
Aether's Delight baking/drinks; End expeditions gain Ender's Delight foods. Each new
dimensional entry has an explicit eligible-dimension predicate as well as the existing
post-NeoForge filter. Earlier-stage items remain allowed later. End/Nether Remastered
exemptions, permanent-light restrictions, advanced machinery, boss rewards and crafting
incentives are preserved. No generic boss-derived meals or rare creature materials.

## Budget examples (analytical, per player)

- Twenty kitchen chests average 9 primary food/drink selections, 0.3 baskets,
  0.6 retained cheese samples and 0.2 culinary garments.
- Twenty ordinary households average 8 portions and 0.4 shared utility/decor finds.
- Twenty-four ordinary dungeon-discovery chests average 8.4 primary provisions and
  0.84 shared utility finds; existing depth/weapon conditions remain separate.
- Sixty-five sparse stores still average 3.9 provisions and 0.325 utility finds.
- Twenty-six laundry containers average 1.56 cloth/soap finds and 0.13 garments;
  probability of at least one garment is `1 - 0.995^26`, about 12.22%.
- Thirteen maritime supply containers average 3.25 provisions and 0.26 utility finds.
  Thirteen is a reviewed maximum in a template, not a complete ship census.
- Twenty ordinary wardrobes average 7 supplies, 0.6 garments and 0.05 capes.

Within a fully eligible one-roll pool, a specific item has chance `gate × weight / total
eligible weight`. For example each wardrobe garment is `3% / 8 = 0.375%`; each cape is
`0.25% / 3 ≈ 0.08333%`. Location and recipient restrictions must also pass. Entries
excluded by their location conditions do not participate in the eligible weight total;
the post-generation dimension guard removes a prohibited result without rerolling.
Independent pool chance of at least one reward is `1 - product(1 - gate)` where all
entries are eligible. Multiply aggregate expectations by independent Lootr players;
four players receive four separate budgets. No refresh/team-mode changes.

Template densities guided the sparse profiles; these are explicit scenarios, not a
whole-world economic measurement. Existing common-dungeon ink/scroll/native drops are
additional and have not been increased. All additions are made once to the outer roll,
so a bakery delegating to a farm does not receive both profiles.

## Exact newly added candidates

Native registry/codec/default-component verification and test scope are recorded in the
development report. This list is a content inventory, not a guarantee for every room.

- **aethersdelight:** Blue Berry Jam, Ginger Ale, Gingerbread Moa, Gingerbread Star, Peppermint Candy, Peppermint Tea, White Apple Pie Slice.
- **bannercapes:** Blue Banner Cape, Brown Banner Cape, Gray Banner Cape.
- **brewinandchewin:** Pasta with Cheese, Cocoa Fudge, Creamy Onion Soup, Ham and Cheese Sandwich, Jerky, Kimchi, Kippers, Pickled Pickles, Pizza Slice, Quiche Slice, Vegetable Omelet.
- **caverns_and_chasms:** Barometer.
- **chalk:** Blue Chalk, Green Chalk, Red Chalk, Yellow Chalk.
- **cocktailsdelight:** Cranberry Juice, Hard Cider, Lemon Limeade, Mulled Cider, Red Wine.
- **comforts:** White Hammock Cloth, Blue Sleeping Bag, Brown Sleeping Bag, White Sleeping Bag.
- **create:** Bar of Chocolate, Chocolate Glazed Berries, Honeyed Apple, Sweet Roll.
- **endersdelight:** Chorus Juice, Chorus Pie Slice, Endermite Stew, Strange Eclair, Twisted Cereal, Uncanny Cookies.
- **farmersdelight:** Dumplings, Mushroom Rice, Vegetable Noodles.
- **fruitsdelight:** Bayberry Cookie, Blueberry Jam, Blueberry Muffin, Cranberry Cookie, Cranberry Jam, Dried Persimmon, Fig Pudding Slice, Hawberry Tea, Lemon Cookie, Lychee Cherry Tea, Mango Tea, Orange Juice, Peach Tea, Pear Juice.
- **handcrafted:** Blue Bowl, Blue Cup, Blue Cushion, Red Cushion, Terracotta Cup, Terracotta Plate, White Bowl, White Cup, Wood Cup, Wood Plate.
- **hybrid_aquatic:** Cooked Crayfish, Cooked Lobster Tail, Cooked Mussel, Cooked Shrimp.
- **luckyswardrobe:** Blacksmith's Hat, Butcher's Apron, Chef Hat, Explorer's Hat, Farmer's Hat, Fishing Apron, Hat, Leather Apron, Mason's Apron, Scarf, Snowy Hat, Top Hat, Witch's Hat, Wool Vest.
- **minecraft:** goat_horn.
- **mynethersdelight:** Burnt Roll, Hotdog, Magma Cake Slice, Roasted Sausage, Sausage and Potatoes, Scotch Eggs, Spicy Hoglin Stew, Spicy Noodle Soup, Spicy Skewer, Stuffed Pepper, Toasts.
- **oceansdelight:** Cooked Stuffed Cod, Honey Fried Kelp, Seagrass Salad, Squid Rings.
- **quark:** Abacus, Trowel.
- **rusticdelight:** Bell Pepper Pasta, Bell Pepper Seeds, Cherry Blossom Cookie, Coffee, Slice of Coffee Cheesecake, Coffee Cookie, Cotton, Cotton Seeds, Fried Dumplings, Fried Mushrooms, Fruit Beignet, Honey Coffee, Honey Pancake, Milk Coffee, Potato Salad, Pumpkin Coffee, Spring Rolls, Stuffed Red Bell Pepper.
- **spawn:** Canned Herring, Clam Chowder, Date Cookie, Roasted Sunflower Seeds, Tuna Sandwich.
- **supplementaries:** Candy, Confetti Popper.
- **tide:** Apple Bobber, Bait, Blue Bobber, Climate Gauge, Depth Meter, Duck Bobber, Fish Satchel, Fishing Hook, Fishing Line, Pocket Watch, Red Bobber.
- **upgrade_aquatic:** Cooked Perch, Cooked Pike, Mulberry Bread, Mulberry Jam Bottle.

## Applying

Restart server/client before new rolls. Unopened table-backed containers and personal
Lootr inventories not yet generated use the new pools. Already generated inventories
stay unchanged. No existing world/player/save data was edited.
