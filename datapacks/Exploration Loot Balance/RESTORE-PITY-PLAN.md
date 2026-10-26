# Restore Simply Swords pity — 2026-10-26

User decision: undo the pity disable. The only runtime override is the local
`simplyswords-no-pity` companion; the soft increment was additionally set to 0.
The pre-disable configuration is available in the development backups.

| Setting / reward | Restored behavior |
|---|---|
| Unique soft pity | Start at 25 prior credited misses; +0.2 percentage points per subsequent credited miss |
| Unique hard pity | Guaranteed on the 75th credited eligible attempt |
| Eligibility / base rates | Existing six exact late treasure tables, 0.10–0.35%; dragon remains 5% |
| Tablets | Remove the override, retain native threshold 60; generic tablet weight stays 0, so no generic tablet pity rolls |
| Other loot | Existing targeted weapons, tablets, discoveries and progression restrictions remain |

Remove only the companion jar from source and testing instance (back it up
outside the distributable pack); restore the soft increment to 0.2 in both TOML
copies. Keep the existing table allowlist, all generic injection weights at 0,
and Remastered progression exemptions. Saved counters/regions are preserved;
when native pity resumes, existing state applies to future eligible rolls.

Update maintenance instructions, current balance reference and verification/sync
tools. Preserve historical no-pity evidence, then run static/deployment checks
and an isolated native runtime verifying hard pity, soft pity, same-region
exclusion and independent Lootr players. No existing worlds or inventories are
edited. Restart is required; already generated loot is unchanged.

## Completed validation

Static/deployed audit passed (330 exact recipients, 385 nested references,
72 disabled integrations, 85 authored item IDs, 6,100,000 seeded offline draws).
An isolated 99-mod-ID native runtime passed 36,000 soft/hard pity seed checks,
two independent Lootr players, same-region/easy-table exclusions, 270,000
combined chest rolls, 170 dimension/nested checks and 13,001 component rolls.
The prior no-pity report is archived; current evidence and limitations are in
DEV `docs/exploration-loot/VALIDATION.md`. 53 recipients remain static-only;
this was not a full client or persisted multiplayer test.
