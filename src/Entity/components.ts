import { Entity,EntityAddRiderComponent,EntityAgeableComponent,EntityBreathableComponent,EntityCanClimbComponent,EntityCanFlyComponent,EntityCanPowerJumpComponent,EntityColorComponent,EntityFireImmuneComponent,EntityFloatsInLiquidComponent,EntityFlyingSpeedComponent,EntityFrictionModifierComponent,EntityGroundOffsetComponent,EntityHealableComponent,EntityHealthComponent,EntityInventoryComponent,EntityIsBabyComponent,EntityIsChargedComponent,EntityIsChestedComponent,EntityIsDyableComponent,EntityIsHiddenWhenInvisibleComponent,EntityIsIgnitedComponent,EntityIsIllagerCaptainComponent,EntityIsSaddledComponent,EntityIsShakingComponent,EntityIsShearedComponent,EntityIsStackableComponent,EntityIsStunnedComponent,EntityIsTamedComponent,EntityLavaMovementComponent,EntityLeashableComponent,EntityMarkVariantComponent,EntityMountTamingComponent,EntityMovementAmphibiousComponent,EntityMovementBasicComponent,EntityMovementComponent,EntityMovementFlyComponent,EntityMovementGenericComponent,EntityMovementGlideComponent,EntityMovementHoverComponent,EntityMovementJumpComponent,EntityMovementSkipComponent,EntityMovementSwayComponent,EntityNavigationClimbComponent,EntityNavigationFloatComponent,EntityNavigationFlyComponent,EntityNavigationGenericComponent,EntityNavigationHoverComponent,EntityNavigationWalkComponent,EntityPushThroughComponent,EntityRideableComponent,EntityScaleComponent,EntitySkinIdComponent,EntityStrengthComponent,EntityTameableComponent,EntityUnderwaterMovementComponent,EntityVariantComponent,EntityWantsJockeyComponent,} from "mojang-minecraft";
export default class {
	entity: Entity;
	constructor(entity: Entity) {
		this.entity = entity;
	}
	
	get addRider(): EntityAddRiderComponent {
		return this.entity.getComponent("addRider") as EntityAddRiderComponent;
	}
	get ageable(): EntityAgeableComponent {
		return this.entity.getComponent("ageable") as EntityAgeableComponent;
	}
	get breathable(): EntityBreathableComponent {
		return this.entity.getComponent("breathable") as EntityBreathableComponent;
	}
	get canClimb(): EntityCanClimbComponent {
		return this.entity.getComponent("canClimb") as EntityCanClimbComponent;
	}
	get canFly(): EntityCanFlyComponent {
		return this.entity.getComponent("canFly") as EntityCanFlyComponent;
	}
	get canPowerJump(): EntityCanPowerJumpComponent {
		return this.entity.getComponent("canPowerJump") as EntityCanPowerJumpComponent;
	}
	get color(): EntityColorComponent {
		return this.entity.getComponent("color") as EntityColorComponent;
	}
	get fireImmune(): EntityFireImmuneComponent {
		return this.entity.getComponent("fireImmune") as EntityFireImmuneComponent;
	}
	get floatsInLiquid(): EntityFloatsInLiquidComponent {
		return this.entity.getComponent("floatsInLiquid") as EntityFloatsInLiquidComponent;
	}
	get flyingSpeed(): EntityFlyingSpeedComponent {
		return this.entity.getComponent("flyingSpeed") as EntityFlyingSpeedComponent;
	}
	get frictionModifier(): EntityFrictionModifierComponent {
		return this.entity.getComponent("frictionModifier") as EntityFrictionModifierComponent;
	}
	get groundOffset(): EntityGroundOffsetComponent {
		return this.entity.getComponent("groundOffset") as EntityGroundOffsetComponent;
	}
	get healable(): EntityHealableComponent {
		return this.entity.getComponent("healable") as EntityHealableComponent;
	}
	get health(): EntityHealthComponent {
		return this.entity.getComponent("health") as EntityHealthComponent;
	}
	get inventory(): EntityInventoryComponent {
		return this.entity.getComponent("inventory") as EntityInventoryComponent;
	}
	get isBaby(): EntityIsBabyComponent {
		return this.entity.getComponent("isBaby") as EntityIsBabyComponent;
	}
	get isCharged(): EntityIsChargedComponent {
		return this.entity.getComponent("isCharged") as EntityIsChargedComponent;
	}
	get isChested(): EntityIsChestedComponent {
		return this.entity.getComponent("isChested") as EntityIsChestedComponent;
	}
	get isDyable(): EntityIsDyableComponent {
		return this.entity.getComponent("isDyable") as EntityIsDyableComponent;
	}
	get isHiddenWhenInvisible(): EntityIsHiddenWhenInvisibleComponent {
		return this.entity.getComponent("isHiddenWhenInvisible") as EntityIsHiddenWhenInvisibleComponent;
	}
	get isIgnited(): EntityIsIgnitedComponent {
		return this.entity.getComponent("isIgnited") as EntityIsIgnitedComponent;
	}
	get isIllagerCaptain(): EntityIsIllagerCaptainComponent {
		return this.entity.getComponent("isIllagerCaptain") as EntityIsIllagerCaptainComponent;
	}
	get isSaddled(): EntityIsSaddledComponent {
		return this.entity.getComponent("isSaddled") as EntityIsSaddledComponent;
	}
	get isShaking(): EntityIsShakingComponent {
		return this.entity.getComponent("isShaking") as EntityIsShakingComponent;
	}
	get isSheared(): EntityIsShearedComponent {
		return this.entity.getComponent("isSheared") as EntityIsShearedComponent;
	}
	get isStackable(): EntityIsStackableComponent {
		return this.entity.getComponent("isStackable") as EntityIsStackableComponent;
	}
	get isStunned(): EntityIsStunnedComponent {
		return this.entity.getComponent("isStunned") as EntityIsStunnedComponent;
	}
	get isTamed(): EntityIsTamedComponent {
		return this.entity.getComponent("isTamed") as EntityIsTamedComponent;
	}
	get lavaMovement(): EntityLavaMovementComponent {
		return this.entity.getComponent("lavaMovement") as EntityLavaMovementComponent;
	}
	get leashable(): EntityLeashableComponent {
		return this.entity.getComponent("leashable") as EntityLeashableComponent;
	}
	get markVariant(): EntityMarkVariantComponent {
		return this.entity.getComponent("markVariant") as EntityMarkVariantComponent;
	}
	get mountTaming(): EntityMountTamingComponent {
		return this.entity.getComponent("mountTaming") as EntityMountTamingComponent;
	}
	get movementAmphibious(): EntityMovementAmphibiousComponent {
		return this.entity.getComponent("movementAmphibious") as EntityMovementAmphibiousComponent;
	}
	get movementBasic(): EntityMovementBasicComponent {
		return this.entity.getComponent("movementBasic") as EntityMovementBasicComponent;
	}
	get movement(): EntityMovementComponent {
		return this.entity.getComponent("movement") as EntityMovementComponent;
	}
	get movementFly(): EntityMovementFlyComponent {
		return this.entity.getComponent("movementFly") as EntityMovementFlyComponent;
	}
	get movementGeneric(): EntityMovementGenericComponent {
		return this.entity.getComponent("movementGeneric") as EntityMovementGenericComponent;
	}
	get movementGlide(): EntityMovementGlideComponent {
		return this.entity.getComponent("movementGlide") as EntityMovementGlideComponent;
	}
	get movementHover(): EntityMovementHoverComponent {
		return this.entity.getComponent("movementHover") as EntityMovementHoverComponent;
	}
	get movementJump(): EntityMovementJumpComponent {
		return this.entity.getComponent("movementJump") as EntityMovementJumpComponent;
	}
	get movementSkip(): EntityMovementSkipComponent {
		return this.entity.getComponent("movementSkip") as EntityMovementSkipComponent;
	}
	get movementSway(): EntityMovementSwayComponent {
		return this.entity.getComponent("movementSway") as EntityMovementSwayComponent;
	}
	get navigationClimb(): EntityNavigationClimbComponent {
		return this.entity.getComponent("navigationClimb") as EntityNavigationClimbComponent;
	}
	get navigationFloat(): EntityNavigationFloatComponent {
		return this.entity.getComponent("navigationFloat") as EntityNavigationFloatComponent;
	}
	get navigationFly(): EntityNavigationFlyComponent {
		return this.entity.getComponent("navigationFly") as EntityNavigationFlyComponent;
	}
	get navigationGeneric(): EntityNavigationGenericComponent {
		return this.entity.getComponent("navigationGeneric") as EntityNavigationGenericComponent;
	}
	get navigationHover(): EntityNavigationHoverComponent {
		return this.entity.getComponent("navigationHover") as EntityNavigationHoverComponent;
	}
	get navigationWalk(): EntityNavigationWalkComponent {
		return this.entity.getComponent("navigationWalk") as EntityNavigationWalkComponent;
	}
	get pushThrough(): EntityPushThroughComponent {
		return this.entity.getComponent("pushThrough") as EntityPushThroughComponent;
	}
	get rideable(): EntityRideableComponent {
		return this.entity.getComponent("rideable") as EntityRideableComponent;
	}
	get scale(): EntityScaleComponent {
		return this.entity.getComponent("scale") as EntityScaleComponent;
	}
	get skinId(): EntitySkinIdComponent {
		return this.entity.getComponent("skinId") as EntitySkinIdComponent;
	}
	get strength(): EntityStrengthComponent {
		return this.entity.getComponent("strength") as EntityStrengthComponent;
	}
	get tameable(): EntityTameableComponent {
		return this.entity.getComponent("tameable") as EntityTameableComponent;
	}
	get underwaterMovement(): EntityUnderwaterMovementComponent {
		return this.entity.getComponent("underwaterMovement") as EntityUnderwaterMovementComponent;
	}
	get variant(): EntityVariantComponent {
		return this.entity.getComponent("variant") as EntityVariantComponent;
	}
	get wantsJockey(): EntityWantsJockeyComponent {
		return this.entity.getComponent("wantsJockey") as EntityWantsJockeyComponent;
	}
}