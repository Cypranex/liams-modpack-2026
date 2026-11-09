# Hedge’s Bestiary combat drops — balance reference

Adds the approved 13-species existing-item drops as direct themed salvage.
This unpacked Paxi datapack uses
exact missing `hedges_bestiary:entities/<species>` native table IDs.
No new items, recipes, weapons, interactions or mod updates. Six native entity
loot tables, carried equipment/inventories, scale trade and eggs remain intact.

Overlap: installed Bestiary 1.1.4 has six native entity JSONs; the 13 target
IDs have none. Native HBEntities builders use normal species loot IDs. Source
KubeJS and incontrol loot have no Bestiary edits. New drops require a credited
player kill and a non-baby entity; no automatic wild-predation salvage litter.
Looting adds 0..1 per level only to food/feathers/ink/bones. Salvage, tackle and
rare rolls have fixed counts/rates and zero Luck bonus. No XP changes.

Pools (quantities before Looting):
- Zippermouth: 2–4 fish (cod/salmon/Tide anchovy/Hybrid mackerel), 1–3 Tide fish
  bones; one tackle choice: bait 50% (2–4), line 30% (1–2), hook 10%, copper
  line 10%; one rare roll 5%, equal compass/emerald/Hybrid pearl (1.6667% each).
- Zipperling: 1–2 fish, one bait or fish bone (50/50); fishing line 10%.
- Ferocetus: 1–2 Hybrid raw tentacles, 2–4 fish; ink 50% (1–2); shark tooth 5%.
- Spotted Striker: 1–2 Hybrid raw shrimp, 1 tropical fish; fish bones 50%; pearl 2%.
- Tearacuda: 1–2 fish bones; 1–2 cod 75%; fishing hook 3%.
- Blurpum: 1–3 Upgrade Aquatic perch; coastal Variant=1 substitutes Hybrid
  shrimp. One bottom-junk roll: bone 50%, clay 40%, flint 10%; 5% useful junk
  roll: iron nugget 75%, fishing hook 25% (3.75% / 1.25% final).
- Nib Nib: 1–2 ink sacs, 1–2 Ocean's Delight cut tentacles; extra tentacle 25%.
- Burodon: 2–4 mutton, 1–2 leather, 1–2 bones; rabbit hide 20%, foot 1%.
- Dawn Dove: 2–4 feathers, 1–2 rabbit, 1–2 bones; valuables 3%, gold nugget
  80% / emerald 20% (2.4% / 0.6% final).
- Zappet: 1–2 feathers; scrap 25%, flint/copper nugget/iron nugget weights
  6/3/1 (15% / 7.5% / 2.5% final); gold nugget 1%.
- Plombo: two foraging rolls, each one apple/brown mushroom/red mushroom/wheat
  seeds/melon seeds/stick; flax or flax seeds 10% total (5% each).
- Chub: 1 Tide fish slice; bait 15%.
- Gild Glider: 1 Tide fish slice; gold nugget 5%, Hybrid pearl 0.5%.

Small schooling-mob valuables are capped at count 1 without Looting. No
nether/Aether/End materials, restricted metals, permanent lighting, keys,
archaeology rewards, exclusive equipment, special fishing catches/hooks,
heart of the sea or Zippermouth scales. Check registry IDs, recipes/provenance,
and stage policy for every reward. Hybrid pearls and teeth are ordinary
Overworld animal resources, not boss drops. No dimension-filter broadening.
These are shared mob drops, not per-player Lootr rewards; school totals are
linear in kills, not independently multiplied by party size.

Validation: native registry/table resolution and seeded pool sampling, actual
death-loot calls, babies/non-player exclusions, coastal variant, Looting and
Luck checks, unchanged native tables and scale trade. Existing exploration and
archaeology checks run separately; report pre-existing fingerprint drift without
refreshing unrelated baselines. Review tips (omit reward spoilers), targeted
source-to-instance sync, packwiz refresh and deployed equality checks. Existing
saves/inventories are never edited; restart server/client for consistent loading.
