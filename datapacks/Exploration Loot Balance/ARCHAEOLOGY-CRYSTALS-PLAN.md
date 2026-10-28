# Archaeology crystals: 2% revision — 2026-10-27

User authorized replacing the uneven weight-1 rates with 2% per selected brushed
reward and explicitly required maintenance instructions for mod changes.
Use only Blueprint Remolder JSON edits; no production code, extra rewards,
progression/player checks, saves or structure changes. Maintain the 21-table
coverage and unassigned/fixed-item exclusions of the earlier revision.

For ordinary tables, wrap the existing pool entries in an alternatives entry:
2% crystal, otherwise a group containing the original weighted entries. Read
those entries dynamically after native Remolders (priority 10000); retain other
mods' additions without copying full tables. Remove the old native crystal from
desert_pyramid before wrapping, so it cannot remain in the normal fallback.

Better Archeology's two parent tables already delegate to now-2% vanilla tables.
Leave those delegated entries intact and apply 2% only to their nondelegating
artifact-shards branch, retaining its weight/quality. This makes the composed
rate 2%, not 3.96%, and preserves noncrystal reward proportions.

For the two shared chest tables, use vanilla table-level set_item at 2% gated
on suspicious vanilla/Lootr sand/gravel at origin, then reset the converted
crystal to quantity 1 and clean default components. C&C/Quark append entries
after JSON remolding; a pool wrapper would miss those native additions. Table
functions cover those entries while preserving the normal pools unchanged.
The cleanup is generated/verified against native component registries and the
fresh crystal's components. No ordinary chest output is converted. Sample the
first returned stack, which native brushing actually selects.

Update root and loot AGENTS.md, readable loot reference, machine reference,
static/native checks and audit evidence. Lock original tables and relevant
Remolder inputs to installed fingerprints, test full loaded noncrystal fallback,
2% outcomes and nested delegation, and run existing loot regressions. Review tips
without adding discovery spoilers; do not refresh unrelated drift baselines.
Deploy source to Local Testing, refresh packwiz and validate deployed bytes.
