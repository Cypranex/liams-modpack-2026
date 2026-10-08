ServerEvents.loaded(event => {
    // Commenting this out for now, it seems to cause issues with chunk loading?
    // event.server.runCommandSilent('dh config generation.chunkMode INTERNAL_SERVER');
    event.server.runCommandSilent('gamerule reducedDebugInfo true');
    event.server.runCommandSilent('hiddenNames blocksHideName true');
    event.server.runCommandSilent('hiddenNames defaultVisible false');
    event.server.runCommandSilent('hiddenNames nameplateVisible false');
});