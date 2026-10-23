// Shared depth policy for all hostile species. In Control owns equipment and
// extra spawning; this script owns health, speed, and attributed incoming damage.
// Overrides may supply health/damage/speed arrays for future per-species tuning.
// No overrides are enabled: every eligible monster uses the same curve.
const undergroundMobPolicy = {
  health: [1.10, 1.25, 1.5, 1.75, 2.0, 2.50],
  damage: [1.25, 1.5, 1.75, 2.0, 2.5, 3.00],
  speed: [1.00, 1.02, 1.05, 1.08, 1.12, 1.16],
  overrides: {}
}
const undergroundTierKey = 'liams_depth_damage_tier'
const undergroundPriority = Java.loadClass('net.neoforged.bus.api.EventPriority')
const undergroundLiving = Java.loadClass('net.minecraft.world.entity.LivingEntity')
const undergroundEnemy = Java.loadClass('net.minecraft.world.entity.monster.Enemy')
const undergroundPlayer = Java.loadClass('net.minecraft.world.entity.player.Player')
const undergroundOwnable = Java.loadClass('net.minecraft.world.entity.OwnableEntity')
const undergroundTameable = Java.loadClass('net.minecraft.world.entity.TamableAnimal')
const undergroundFangsTameable = Java.loadClass('net.raptorzizi.fangs_n_claws.entity.tame.TamableCreature')
const undergroundPassiveCreeper = Java.loadClass('tech.thatgravyboat.creeperoverhaul.common.entity.base.PassiveCreeper')
const undergroundPassiveEnderman = Java.loadClass('tech.alexnijjar.endermanoverhaul.common.entities.base.PassiveEnderman')
const undergroundGenericBoss = Java.loadClass('net.acetheeldritchking.aces_spell_utils.entity.mobs.GenericBossEntity')
const undergroundUniqueBoss = Java.loadClass('net.acetheeldritchking.aces_spell_utils.entity.mobs.GenericUniqueBossEntity')
const undergroundCataclysmBoss = Java.loadClass('com.github.L_Ender.cataclysm.entity.AnimationMonster.BossMonsters.LLibrary_Boss_Monster')
const undergroundCataclysmInternalBoss = Java.loadClass('com.github.L_Ender.cataclysm.entity.InternalAnimationMonster.IABossMonsters.IABoss_monster')
const undergroundAquaticBoss = Java.loadClass('dev.hybridlabs.aquatic.entity.base.HAMinibossEntity')
const undergroundShark = Java.loadClass('dev.hybridlabs.hapi.entity.base.aquatic.BaseSharkEntity')
const undergroundSummon = Java.loadClass('io.redspace.ironsspellbooks.entity.mobs.IMagicSummon')
const undergroundCategory = Java.loadClass('net.minecraft.world.entity.MobCategory')
const undergroundAttributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
const undergroundModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const undergroundOperation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')
const undergroundLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const undergroundBossTag = undergroundLocation.parse('c:bosses')
const undergroundExcludedTag = undergroundLocation.parse('liams_modpack:depth_scaling_excluded')
const undergroundAdditionalTag = undergroundLocation.parse('liams_modpack:depth_scaling_hostiles')
const undergroundHealthId = undergroundLocation.parse('liams_modpack:depth_health')
const undergroundSpeedId = undergroundLocation.parse('liams_modpack:depth_speed')
// Only loaded creatures needing ownership cleanup are watched, never all mobs.
const undergroundOwnershipWatch = new Map()
let undergroundMaintenanceTicks = 0
// Server scripts get a fresh scope on /reload; loaded entities do not rejoin.
let undergroundOwnershipRebuildPending = true

function undergroundEntityType(entity) {
  // KubeJS exposes native Entity.getType() as getEntityType(). A mod may
  // shadow the bean property "type" with unrelated data (Creeper Overhaul).
  return entity.getEntityType()
}

function undergroundExcluded(entity) {
  const type = undergroundEntityType(entity)
  // hasTag has one signature; EntityType.is has ambiguous Rhino overloads.
  return type.hasTag(undergroundBossTag) || type.hasTag(undergroundExcludedTag)
}

function undergroundEligible(entity, recursion) {
  if (!(entity instanceof undergroundLiving) || entity instanceof undergroundPlayer || undergroundExcluded(entity)
    || entity instanceof undergroundGenericBoss || entity instanceof undergroundUniqueBoss
    || entity instanceof undergroundCataclysmBoss || entity instanceof undergroundCataclysmInternalBoss
    || entity instanceof undergroundAquaticBoss || entity instanceof undergroundPassiveCreeper
    || entity instanceof undergroundPassiveEnderman) return false
  if (entity instanceof undergroundTameable && entity.isTame()) return false
  if (entity instanceof undergroundFangsTameable && entity.isTamed()) return false
  // Player spells/pets do not qualify. Hostile caster summons do, except when
  // the summoner is missing, a boss, or part of a cyclic ownership chain.
  if (entity instanceof undergroundSummon) {
    if ((recursion || 0) >= 4) return false
    const caster = entity.getSummoner()
    return caster != null && undergroundEligible(caster, (recursion || 0) + 1)
  }
  if (entity instanceof undergroundOwnable && entity.getOwnerUUID() != null) return false
  // Hybrid Aquatic predators use aquatic categories rather than Enemy. Keep
  // passive sharks out; aggressive/neutral sharks can inhabit cave water.
  if (entity instanceof undergroundShark) return !entity.isPassive()
  // Enemy catches ambient Evil Bats and hostile Fangs horses. Category and the
  // additional tag cover hostile mods that do not implement Enemy.
  if (entity instanceof undergroundEnemy) return true
  const type = undergroundEntityType(entity)
  return type.getCategory().equals(undergroundCategory.MONSTER)
    || type.hasTag(undergroundAdditionalTag)
}

function undergroundTier(entity) {
  const data = entity.persistentData
  if (data.contains(undergroundTierKey, 3)) {
    const saved = data.getInt(undergroundTierKey)
    if (saved >= -1 && saved <= 5) return saved
  }
  let tier = -1
  if (entity.level.isOverworld()) {
    // Historical health rule indices identify SAVED mobs only. The current
    // equipment-only spawn.json must not be used to reinterpret these tags.
    const tags = entity.getTags()
    for (let index = 1; index <= 34; index++) {
      if (!tags.contains('ctrlHealthM' + index)) continue
      tier = index <= 6 ? 6 - index : index <= 12 ? 12 - index
        : index <= 18 ? 18 - index : index <= 24 ? 24 - index
          : index <= 29 ? 30 - index : index <= 33 ? 35 - index : 1
      break
    }
    if (tier === -1) {
      const y = Math.floor(entity.y)
      if (y >= -320 && y <= 639 && (y < 0 || !entity.level.canSeeSky(entity.blockPosition()))) {
        tier = y < -256 ? 5 : y < -128 ? 4 : y < -64 ? 3 : y < 0 ? 2 : y < 48 ? 1 : 0
      }
    }
  }
  data.putInt(undergroundTierKey, tier)
  return tier
}

function undergroundHasLegacy(entity, attribute) {
  const pattern = attribute === 'damage' ? /^ctrlDamage(?:M|A|S|Set)?\d+$/ : /^ctrl(?:Health|Speed)(?:M|A|S|Set)?\d+$/
  const tags = entity.getTags().toArray()
  for (let i = 0; i < tags.length; i++) if (pattern.test(String(tags[i]))) return true
  return false
}

function undergroundCurve(entity, attribute) {
  const override = undergroundMobPolicy.overrides[String(undergroundEntityType(entity).getId())]
  return override != null && override[attribute] != null ? override[attribute] : undergroundMobPolicy[attribute]
}

function undergroundSetModifier(entity, attribute, id, multiplier) {
  const instance = entity.getAttribute(attribute)
  if (instance == null) return false
  const old = instance.getModifier(id)
  const amount = multiplier - 1
  if (old != null && old.amount() === amount) return false
  // KubeJS's single-signature helper selects the ResourceLocation overload
  // inside Java, avoiding AttributeInstance.removeModifier's overload pair.
  if (old != null) entity.removeAttribute(attribute, id)
  if (amount !== 0) instance.addPermanentModifier(new undergroundModifier(id, amount, undergroundOperation.ADD_MULTIPLIED_TOTAL))
  return old != null || amount !== 0
}

function undergroundUpdateStats(entity) {
  if (!(entity instanceof undergroundLiving) || entity.level.isClientSide()) return
  const eligible = entity.level.isOverworld() && undergroundEligible(entity)
  const tier = eligible ? undergroundTier(entity) : -1
  // Never multiply saved In Control base changes a second time. Fresh mobs get
  // identifiable, replaceable modifiers; no base attributes are overwritten.
  const apply = tier >= 0 && !undergroundHasLegacy(entity, 'stats')
  const oldMaximum = entity.getMaxHealth()
  const oldHealth = entity.getHealth()
  const changed = undergroundSetModifier(entity, undergroundAttributes.MAX_HEALTH, undergroundHealthId,
    apply ? undergroundCurve(entity, 'health')[tier] : 1)
  undergroundSetModifier(entity, undergroundAttributes.MOVEMENT_SPEED, undergroundSpeedId,
    apply ? undergroundCurve(entity, 'speed')[tier] : 1)
  if (changed && oldMaximum > 0) {
    // Preserve injury fraction when adding/changing scaling. Removing a pet or
    // boss buff only clamps HP. An unchanged rejoin cannot heal the entity.
    const maximum = entity.getMaxHealth()
    entity.setHealth(maximum > oldMaximum ? oldHealth * maximum / oldMaximum : Math.min(oldHealth, maximum))
  }
}

function undergroundHasDynamicOwner(entity) {
  return entity instanceof undergroundLiving && entity.level.isOverworld()
    && (entity instanceof undergroundTameable || entity instanceof undergroundFangsTameable
      || entity instanceof undergroundOwnable || entity instanceof undergroundSummon)
}

function undergroundTrackOwnership(entity) {
  if (!undergroundHasDynamicOwner(entity)) return
  const health = entity.getAttribute(undergroundAttributes.MAX_HEALTH)
  const speed = entity.getAttribute(undergroundAttributes.MOVEMENT_SPEED)
  const unresolvedSummon = entity instanceof undergroundSummon && entity.getSummoner() == null
  if ((health != null && health.getModifier(undergroundHealthId) != null)
    || (speed != null && speed.getModifier(undergroundSpeedId) != null) || unresolvedSummon) {
    undergroundOwnershipWatch.set(String(entity.getUuid()), {entity: entity, eligible: undergroundEligible(entity)})
  }
}

NativeEvents.onEvent(undergroundPriority.LOWEST,
  Java.loadClass('net.neoforged.neoforge.event.entity.EntityJoinLevelEvent'), event => {
    if (event.isCanceled() || event.getLevel().isClientSide()) return
    const entity = event.getEntity()
    undergroundUpdateStats(entity)
    undergroundTrackOwnership(entity)
  })

NativeEvents.onEvent(undergroundPriority.LOWEST,
  Java.loadClass('net.neoforged.neoforge.event.entity.EntityLeaveLevelEvent'), event => {
    // This event also fires for lightning, projectiles and dropped items.
    const entity = event.getEntity()
    if (entity instanceof undergroundLiving && !event.getLevel().isClientSide()) {
      undergroundOwnershipWatch.delete(String(entity.getUuid()))
    }
  })

NativeEvents.onEvent(undergroundPriority.LOWEST,
  Java.loadClass('net.neoforged.neoforge.event.tick.ServerTickEvent$Post'), event => {
    // Scan loaded Overworld entities once after loading/reloading this script.
    // Reconcile stats before recording eligibility, including pets tamed while
    // the script was reloading. getAllEntities does not load additional chunks.
    if (undergroundOwnershipRebuildPending) {
      undergroundOwnershipRebuildPending = false
      undergroundOwnershipWatch.clear()
      for (const entity of event.getServer().getOverworld().getAllEntities()) {
        if (entity.isRemoved() || !undergroundHasDynamicOwner(entity)) continue
        undergroundUpdateStats(entity)
        undergroundTrackOwnership(entity)
      }
    }
    // Ordinary ticks only visit the ownership watch, never the entity list.
    if (++undergroundMaintenanceTicks < 20) return
    undergroundMaintenanceTicks = 0
    undergroundOwnershipWatch.forEach((state, id) => {
      const entity = state.entity
      if (entity.isRemoved() || !entity.level.isOverworld()) {
        undergroundOwnershipWatch.delete(id)
        return
      }
      const eligible = undergroundEligible(entity)
      if (eligible !== state.eligible) {
        undergroundUpdateStats(entity)
        state.eligible = eligible
      }
      // Stop watching excluded pets/resolved player summons. Unresolved
      // summons remain watched so an owner assigned after joining is handled.
      if (!eligible && (!(entity instanceof undergroundSummon) || entity.getSummoner() != null)) {
        undergroundOwnershipWatch.delete(id)
      }
    })
  })

NativeEvents.onEvent(undergroundPriority.LOWEST,
  Java.loadClass('net.neoforged.neoforge.event.server.ServerStoppedEvent'), event => {
    undergroundOwnershipWatch.clear()
    undergroundMaintenanceTicks = 0
    undergroundOwnershipRebuildPending = true
  })

NativeEvents.onEvent(undergroundPriority.LOWEST,
  Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingIncomingDamageEvent'), event => {
    if (event.isCanceled()) return
    const victim = event.getEntity()
    if (victim.level.isClientSide() || !victim.level.isOverworld()) return
    // Responsible shooter/caster, rather than projectile or victim Y.
    // KubeJS remaps DamageSource.getEntity() to getActual().
    const attacker = event.getSource().getActual()
    if (attacker == null || attacker.level.isClientSide() || !attacker.level.isOverworld() || !undergroundEligible(attacker)
      || undergroundHasLegacy(attacker, 'damage')) return
    const tier = undergroundTier(attacker)
    if (tier < 0) return
    const multiplier = undergroundCurve(attacker, 'damage')[tier]
    const amount = event.getAmount()
    if (multiplier > 1 && amount > 0 && Number.isFinite(amount)) event.setAmount(amount * multiplier)
  })
