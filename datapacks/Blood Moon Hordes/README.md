# Blood Moon Hordes

The KubeJS bridge at `kubejs/server_scripts/blood_moon_hordes.js` starts one horde per online Overworld player when Enhanced Celestials 2 reports an active Blood Moon or Super Blood Moon. It stops that player's horde within 20 ticks of the lunar event ending or the player leaving the Overworld. The Hordes is set to command-only mode, so it does not schedule separate nights. The bridge marks only events it starts; it leaves admin-started hordes alone.

Edit `BLOOD_MOON_HORDES.normal` and `.super` in the script to change wave size, interval, speed, and weighted preset pool. The global concurrent horde cap is `hordeSpawnMax` in `config/hordes-common.toml`. Keep this cap conservative because Enhanced Celestials already raises natural monster spawning.

Preset tables are under `data/liamshordes/horde_data/tables/`. They use monsters from Variants & Ventures, Spider Overhaul, Creeper Overhaul, Caverns & Chasms, Enderman Overhaul, and Cataclysm. Super Blood Moon tables include rare stronger Cataclysm enemies. A horde stops producing waves at moonset; surviving monsters remain in the world and follow their ordinary despawn rules.

The bridge checks the lunar event every second and starts a horde for players who log in during an active moon. Its marker persists across logout and server restart, so it can stop an interrupted horde on the next login. Test with Enhanced Celestials' event command, then inspect `latest.log` for `[Blood Moon Hordes]` and The Hordes' table loading messages.
