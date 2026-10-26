# Disable Simply Swords pity — 2026-10-25

> Historical plan: the pity disable was undone on 2026-10-26. See
> [native pity restoration](RESTORE-PITY-PLAN.md); the discovery pools remain enabled.

User decision: disable the pity system. Keep the existing base unique chances,
weapon selection/initialization, enchanted ordinary weapons and restrictions.

Installed 1.70.2-1.21.1 has no pity-enable toggle. Its validated unique/tablet
hard thresholds have a minimum of 1; zero would be invalid, and a very large
threshold would only postpone the guarantee. Setting only the soft increment
to zero would leave hard pity active.

Add a small companion mod targeting the installed shared container roller's
`advancePity` boolean argument. Force that argument false at method entry, as
the mod already does for its native BASE_ONLY simulation. This retains its base
rolls, weighted unique registry, natural-drop initialization and insertion while
skipping soft/hard pity, counter resets/increments and region-credit calls for
both uniques and tablets. Vanilla and Lootr container hooks share this method.
Saved state is left intact and ignored; do not scan or migrate saves. Keep the
dragon's native 5% route and the exact six chest rates (0.10–0.35%) unchanged.

Ship the compiled companion jar in the authoritative pack's `mods` folder like
the existing local compatibility mods. Keep source/build instructions under
`/home/liam/Projects/minecraft-mods/simplyswords-no-pity`. Require the audited
Simply Swords version and one successful injection; fail clearly on incompatible
updates rather than silently restoring pity. Set the soft increment to 0 as a
secondary safeguard and document that validated hard thresholds are inactive.

Update agent instructions and current probability calculations to independent
base rolls, preserving prior test evidence as historical. Test fresh and large
saved miss counters, repeated regions, two independent Lootr players, native
BASE_ONLY/PITY_PROGRESSION equivalence and tablet pity in an isolated runtime.
Rerun the established loot suite; sync only relevant source files/new companion
jar, refresh packwiz, verify hashes and document restart/application behavior.
