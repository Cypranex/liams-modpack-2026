// Sable Ragdolls 0.8.1: keep normal mob deaths, including deaths during a ragdoll.
// Living-mob reactions and player ragdolls/corpse inventories remain enabled.
const mobDeathRagdollPriority = Java.loadClass('net.neoforged.bus.api.EventPriority')
const mobDeathRagdollMob = Java.loadClass('net.minecraft.world.entity.Mob')
const mobDeathRagdollAssembly = Java.loadClass('dev.leo.sableplayerragdoll.mob.MobRagdollAssembly')
const mobDeathRagdollRecovery = Java.loadClass('dev.leo.sableplayerragdoll.mob.MobRagdollSourceRecovery')
const mobDeathRagdollReason = Java.loadClass('dev.leo.sableplayerragdoll.mob.api.MobRagdollEndEvent$Reason')

NativeEvents.onEvent(mobDeathRagdollPriority.LOWEST,
  Java.loadClass('dev.leo.sableplayerragdoll.mob.api.MobRagdollStartEvent'), event => {
    const entity = event.entity()
    if (entity instanceof mobDeathRagdollMob && !entity.isAlive()) {
      // This event precedes the model-extraction packet and physics assembly.
      event.setCanceled(true)
    }
  })

NativeEvents.onEvent(mobDeathRagdollPriority.LOWEST,
  Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingDeathEvent'), event => {
    if (event.isCanceled()) return
    const entity = event.getEntity()
    if (!(entity instanceof mobDeathRagdollMob) || entity.isAlive()) return
    const level = entity.level()
    if (level.isClientSide()) return
    const session = mobDeathRagdollAssembly.sessionId(entity)
    if (session === null) return
    // Expire the recovery deadline so a held body cannot defer death cleanup.
    // Native termination restores visibility/AI/collision, syncs the source,
    // posts its end event and removes only this session's body blocks.
    mobDeathRagdollRecovery.extend(entity, 0)
    mobDeathRagdollAssembly.releaseSession(level, entity, session, mobDeathRagdollReason.ENTITY_DEATH)
  })
