# Nether Remastered Overworld progression correction

Nether Remastered 2.6 supplies pre-Nether progression items, not Nether-exclusive
materials. Its native modifier adds seal_piece_4 to the vanilla pillager outpost
at 10% per chest and seal_piece_1 to abandoned mineshafts at 10% per chest.
The namespace stage 1 restriction incorrectly deleted these Overworld rewards.

Remove nether_remastered from namespace_stages so all its items use default
stage 0. Preserve native sources, weights, quantities and other dimension rules;
add no reward pools or modded-outpost routes. Document the exception and assert
that every installed Nether Remastered item model resolves to stage 0. Native
runtime validation is subject to the cached exact-version runtime being available.
Sync using the loot workflow and refresh packwiz. Existing generated loot stays
unchanged; restart the client/server before new loot rolls.

## Validation

The current static checker passed: 330 recipients, 385 reachable references,
72 disabled integration rules, JSON/script checks, native fingerprints and
6,100,000 seeded offline draws. The new regression check verifies all installed
Nether Remastered item-model IDs resolve to stage 0, including seal_piece_4.
These are static/simulated results, not new native chest-roll results.

Native preparation was attempted but stopped because the cached exact-version
`/tmp/liams-exploration-loot-smoke/neoforge-21.1.264-merged.jar` is missing.
Previous native results do not validate this correction. No existing saves or
Lootr inventories were edited. Source and installed copies are checked by the
standard deployed identity check after sync and packwiz refresh.
