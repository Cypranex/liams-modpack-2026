ServerEvents.loaded(event => {
    // TODO: Does this cause issues with chunk loading?
    event.server.runCommandSilent('dh config generation.chunkMode INTERNAL_SERVER');
    event.server.runCommandSilent('dh config generation.plan DISABLED');

    event.server.runCommandSilent('gamerule reducedDebugInfo true');
    event.server.runCommandSilent('hiddenNames blocksHideName true');
    event.server.runCommandSilent('hiddenNames defaultVisible false');
    event.server.runCommandSilent('hiddenNames nameplateVisible false');
});