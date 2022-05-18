import {
	world as World,
	Block,
	BeforeChatEvent,
	Dimension,
	BlockInventoryComponent,
	BlockPistonComponent,
	BlockComponent,
	BlockLavaContainerComponent,
	BlockPotionContainerComponent,
	BlockRecordPlayerComponent,
	BlockSnowContainerComponent,
	BlockWaterContainerComponent,
	Entity,
	IEntityComponent,
	EntityAddRiderComponent,
	EntityAgeableComponent,
	EntityBreathableComponent,
	EntityCanClimbComponent,
	EntityCanFlyComponent,
	EntityCanPowerJumpComponent,
	EntityColorComponent,
	EntityFireImmuneComponent,
	EntityFloatsInLiquidComponent,
	EntityFlyingSpeedComponent,
	EntityFrictionModifierComponent,
	EntityGroundOffsetComponent,
	EntityHealableComponent,
	EntityHealthComponent,
	EntityInventoryComponent,
	EntityIsBabyComponent,
	EntityIsChargedComponent,
	EntityIsChestedComponent,
	EntityIsDyableComponent,
	EntityIsHiddenWhenInvisibleComponent,
	EntityIsIgnitedComponent,
	EntityIsIllagerCaptainComponent,
	EntityIsSaddledComponent,
	EntityIsShakingComponent,
	EntityIsShearedComponent,
	EntityIsStackableComponent,
	EntityIsStunnedComponent,
	EntityIsTamedComponent,
	EntityLavaMovementComponent,
	EntityLeashableComponent,
	EntityMarkVariantComponent,
	EntityMountTamingComponent,
	EntityMovementAmphibiousComponent,
	EntityMovementBasicComponent,
	EntityMovementComponent,
	EntityMovementFlyComponent,
	EntityMovementGenericComponent,
	EntityMovementGlideComponent,
	EntityMovementHoverComponent,
	EntityMovementJumpComponent,
	EntityMovementSkipComponent,
	EntityMovementSwayComponent,
	EntityNavigationClimbComponent,
	EntityNavigationFloatComponent,
	EntityNavigationFlyComponent,
	EntityNavigationGenericComponent,
	EntityNavigationHoverComponent,
	EntityNavigationWalkComponent,
	EntityPushThroughComponent,
	EntityRideableComponent,
	EntityScaleComponent,
	EntitySkinIdComponent,
	EntityStrengthComponent,
	EntityTameableComponent,
	EntityUnderwaterMovementComponent,
	EntityVariantComponent,
	EntityWantsJockeyComponent,
	BlockPermutation,
	BlockLocation,
} from "mojang-minecraft";

interface CommandOptions {
	aliases: string[];
	description: string;
	errorCodes: string[];
	args: ArgType[][];
	tags?: string[];
}

/**
 * @param {string} label
 * @param {string} description
 * @param {string[]} aliases
 * @param {string[]} errorCodes
 * @param {ArgType[][]} args
 * @param {string[]} tags
 * @returns {Command}
 * @constructor
 */

interface ArgType {
	label: string;
	description: string;
	required?: boolean;
	default: string;
	aliases: string[];
	type: any[];

	regex: RegExp;

	errorCode: number;
}

const command = (callback: (...args) => {}, options: CommandOptions) => {};

const Arg: ArgType = {
	label: "",
	description: "",
	required: false,
	default: "",
	aliases: [],
	type: [],
};

const createType = (type: string, regex: RegExp, errorCode: "") => {};

const cfg = {
	prefix: "!",
	commands: {},
	blacklist: [],
};

const ChatBuilder = class {
	prefix;
	commands: Command[] = [];
	triggers: Trigger[] = [];
	blacklist: string[] = [];

	constructor() {
		//TODO: database to set configs
		if (typeof this.prefix === "undefined") {
			this.prefix = cfg.prefix;
		}

		if (this.blacklist == []) {
			this.blacklist = cfg.blacklist;
		}
		World.events.beforeChat.subscribe((data: BeforeChatEvent) => {
			if (data.message.startsWith(this.prefix)) {
				let commandName = data.message
					.split(" ")[1]
					.replace(cfg.prefix, "");
				for (let i of this.commands) {
					if (
						commandName === i.name ||
						i.options.aliases.indexOf(commandName) !== -1
					) {
						//TODO: arg stuff and execution

						return;
					} else continue;
				}
			}
			for (let i of this.triggers) {
				if (data.message.includes(i.trigger)) {
					i.callback(data.message);
					return;
				} else continue;
			}
			for (let i of this.blacklist) {
				if (data.message.includes(i)) {
					return;
				} else continue;
			}
		});
	}

	registerCommand(
		name: string,
		callback: (...args) => {},
		options: CommandOptions
	) {
		this.commands.push({
			name: name,
			callback: callback,
			options: options,
		});
	}
	registerTrigger(
		trigger: string,
		callback: (...args) => {},
		options: TriggerOptions
	) {
		this.triggers.push({
			trigger: trigger,
			callback: callback,
			options: options,
		});
	}
};

//formatting
interface Command {
	name: string;
	callback: (...args) => {};
	options: CommandOptions;
}
interface Trigger {
	trigger: string;
	callback: (...args) => {};
	options: TriggerOptions;
}
interface TriggerOptions {}

const EntityBuilder = class {
	entity: Entity;
	constructor(entity: Entity) {
		this.entity = entity;
	}

	get component(): EntityComponents {
		return; // this will be generated dynamically
	}
};

interface EntityComponents {
	addRider: EntityAddRiderComponent;
	ageable: EntityAgeableComponent;
	breathable: EntityBreathableComponent;
	canClimb: EntityCanClimbComponent;
	canFly: EntityCanFlyComponent;
	canPowerJump: EntityCanPowerJumpComponent;
	color: EntityColorComponent;
	fireImmune: EntityFireImmuneComponent;
	floatsInLiquid: EntityFloatsInLiquidComponent;
	flyingSpeed: EntityFlyingSpeedComponent;
	frictionModifier: EntityFrictionModifierComponent;
	groundOffset: EntityGroundOffsetComponent;
	healable: EntityHealableComponent;
	health: EntityHealthComponent;
	inventory: EntityInventoryComponent;
	isBaby: EntityIsBabyComponent;
	isCharged: EntityIsChargedComponent;
	isChested: EntityIsChestedComponent;
	isDyable: EntityIsDyableComponent;
	isHiddenWhenInvisible: EntityIsHiddenWhenInvisibleComponent;
	isIgnited: EntityIsIgnitedComponent;
	isIllagerCaptain: EntityIsIllagerCaptainComponent;
	isSaddled: EntityIsSaddledComponent;
	isShaking: EntityIsShakingComponent;
	isSheared: EntityIsShearedComponent;
	isStackable: EntityIsStackableComponent;
	isStunned: EntityIsStunnedComponent;
	isTamed: EntityIsTamedComponent;
	lavaMovement: EntityLavaMovementComponent;
	leashable: EntityLeashableComponent;
	markVariant: EntityMarkVariantComponent;
	mountTaming: EntityMountTamingComponent;
	movmentAmphibious: EntityMovementAmphibiousComponent;
	movementBasic: EntityMovementBasicComponent;
	movement: EntityMovementComponent;
	movementFly: EntityMovementFlyComponent;
	movementGeneric: EntityMovementGenericComponent;
	movementGlide: EntityMovementGlideComponent;
	movementHover: EntityMovementHoverComponent;
	movementJump: EntityMovementJumpComponent;
	movementSkip: EntityMovementSkipComponent;
	movmentSway: EntityMovementSwayComponent;
	navigationClimb: EntityNavigationClimbComponent;
	navigationFloat: EntityNavigationFloatComponent;
	navigationFly: EntityNavigationFlyComponent;
	navigationGeneric: EntityNavigationGenericComponent;
	navigationHover: EntityNavigationHoverComponent;
	navigationWalk: EntityNavigationWalkComponent;
	pushThrough: EntityPushThroughComponent;
	ridable: EntityRideableComponent;
	scale: EntityScaleComponent;
	skinId: EntitySkinIdComponent;
	strength: EntityStrengthComponent;
	tameable: EntityTameableComponent;
	entityUnderwaterMovement: EntityUnderwaterMovementComponent;
	variant: EntityVariantComponent;
	wantsJocky: EntityWantsJockeyComponent;
}

const BlockBuilder = class {
	block: Block;
	constructor(block?: Block) {}

	get location(): BlockLocation {
		return this.block.location;
	}

	set permutation(permutation: BlockPermutation) {
		this.block.setPermutation(permutation);
	}

	get component(): BlockComponents {
		return {
			inventory: this.block.getComponent("minecraft:inventory"),
			piston: this.block.getComponent("minecraft:piston"),
			lavaContainer: this.block.getComponent("lavaContainer"),
			potionContainer: this.block.getComponent("potionContainer"),
			recordPlayer: this.block.getComponent("recordPlayer"),
			snowContainer: this.block.getComponent("snowContainer"),
			waterContainer: this.block.getComponent("waterContainer"),
		};
	}
};

interface BlockComponents {
	inventory: BlockInventoryComponent;
	piston: BlockPistonComponent;
	lavaContainer: BlockLavaContainerComponent;
	potionContainer: BlockPotionContainerComponent;
	recordPlayer: BlockRecordPlayerComponent;
	snowContainer: BlockSnowContainerComponent;
	waterContainer: BlockWaterContainerComponent;
}
const EventBuilder = class {};

interface PluginFunction {
	[key: string]: (...args) => {};
}

interface Plugin {
	name: string;
	group: string;
	function: (...args) => {};
}

const ItemBuilder = class {};

const WorldBuilder = class {};

const DimensionBuilder = class {};

const DatabaseBuilder = class {};

var MathFuntions = [
	{
		Function: "`math.abs(value)`",
		Description: "Absolute value of value",
	},
	{
		Function: "`math.acos(value)`",
		Description: "arccos of value",
	},
	{
		Function: "`math.asin(value)`",
		Description: "arcsin of value",
	},
	{
		Function: "`math.atan(value)`",
		Description: "arctan of value",
	},
	{
		Function: "`math.atan2(y, x)`",
		Description: "arctan of y/x.  NOTE: the order of arguments!",
	},
	{
		Function: "`math.ceil(value)`",
		Description: "Round value up to nearest integral number",
	},
	{
		Function: "`math.clamp(value, min, max)`",
		Description: "Clamp value to between min and max inclusive",
	},
	{
		Function: "`math.cos(value)`",
		Description: "Cosine (in degrees) of value",
	},
	{
		Function: "`math.die_roll(num, low, high)`",
		Description:
			"returns the sum of 'num' random numbers, each with a value from low to high. Note: the generated random numbers are not integers like normal dice.  For that, use `math.die_roll_integer`.",
	},
	{
		Function: "`math.die_roll_integer(num, low, high)`",
		Description:
			"returns the sum of 'num' random integer numbers, each with a value from low to high.  Note: the generated random numbers are integers like normal dice.",
	},
	{
		Function: "`math.exp(value)`",
		Description: "Calculates e to the value 'nth' power",
	},
	{
		Function: "`math.floor(value)`",
		Description: "Round value down to nearest integral number",
	},
	{
		Function: "`math.hermite_blend(value)`",
		Description:
			"Useful for simple smooth curve interpolation using one of the Hermite Basis functions: `3t^2 - 2t^3`.  Note that while any valid float is a valid input, this function works best in the range [0,1].",
	},
	{
		Function: "`math.lerp(start, end, 0_to_1)`",
		Description: "Lerp from start to end via 0_to_1",
	},
	{
		Function: "`math.lerprotate(start, end, 0_to_1)`",
		Description:
			"Lerp the shortest direction around a circle from start degrees to end degrees via 0_to_1",
	},
	{
		Function: "`math.ln(value)`",
		Description: "Natural logarithm of value",
	},
	{
		Function: "`math.max(A, B)`",
		Description: "Return highest value of A or B",
	},
	{
		Function: "`math.min(A, B)`",
		Description: "Return lowest value of A or B",
	},
	{
		Function: "`math.min_angle(value)`",
		Description:
			"Minimize angle magnitude (in degrees) into the range [-180, 180)",
	},
	{
		Function: "`math.mod(value, denominator)`",
		Description: "Return the remainder of value / denominator",
	},
	{
		Function: "`math.pi`",
		Description: "Returns the float representation of the constant pi.",
	},
	{
		Function: "`math.pow(base, exponent)`",
		Description: "Elevates `base` to the `exponent`'th power",
	},
	{
		Function: "`math.random(low, high)`",
		Description: "Random value between low and high inclusive",
	},
	{
		Function: "`math.random_integer(low, high)`",
		Description: "Random integer value between low and high inclusive",
	},
	{
		Function: "`math.round(value)`",
		Description: "Round value to nearest integral number",
	},
	{
		Function: "`math.sin(value)`",
		Description: "Sine (in degrees) of value",
	},
	{
		Function: "`math.sqrt(value)`",
		Description: "Square root of value",
	},
	{
		Function: "`math.trunc(value)`",
		Description: "Round value towards zero",
	},
];

var geometry = {};
var texture = {};
var material = {};
var math = {
	/**
	 *
	 * @param value
	 * @description Absolute value of value
	 */
	abs: (value) => {
		return `math.abs(${value})`;
	},
	/**
	 * @param value
	 * @description arccos of value
	 */
	acos: (value) => {
		return `math.acos(${value})`;
	},
	/**
	 * @param value
	 * @description arcsin of value
	 */
	asin: (value) => {
		return `math.asin(${value})`;
	},
	/**
	 * @param value
	 * @description arctan of value
	 */
	atan: (value) => {
		return `math.atan(${value})`;
	},
	/**
	 * @param y
	 * @param x
	 * @description arctan of y/x.  NOTE: the order of arguments!
	 */
	atan2: (y, x) => {
		return `math.atan2(${y}, ${x})`;
	},
	/**
	 * @param value
	 * @description Round value up to nearest integral number
	 */
	ceil: (value) => {
		return `math.ceil(${value})`;
	},
	/**
	 * @param value
	 * @param min
	 * @param max
	 * @description Clamp value to between min and max inclusive
	 */
	clamp: (value, min, max) => {
		return `math.clamp(${value}, ${min}, ${max})`;
	},
	/**
	 * @param value
	 * @description Cosine (in degrees) of value
	 */
	cos: (value) => {
		return `math.cos(${value})`;
	},
	/**
	 * @param num
	 * @param low
	 * @param high
	 * @description returns the sum of 'num' random numbers, each with a value from low to high. Note: the generated random numbers are not integers like normal dice.  For that, use `math.die_roll_integer`
	 */
	die_roll: (num, low, high) => {
		return `math.die_roll(${num}, ${low}, ${high})`;
	},
	/**
	 * @param num
	 * @param low
	 * @param high
	 * @description returns the sum of 'num' random integers, each with a value from low to high
	 */
	die_roll_integer: (num, low, high) => {
		return `math.die_roll_integer(${num}, ${low}, ${high})`;
	},
	/**
	 * @param value
	 * @description Exponent of value
	 */
	exp: (value) => {
		return `math.exp(${value})`;
	},
	/**
	 * @param value
	 * @description Round value down to nearest integral number
	 */
	floor: (value) => {
		return `math.floor(${value})`;
	},
	/**
	 * @param value
	 * @description Useful for simple smooth curve interpolation using one of the Hermite Basis functions: `3t^2 - 2t^3`.  Note that while any valid float is a valid input, this function works best in the range [0,1].
	 */
	hermite_blend: (value) => {
		return `math.hermite_blend(${value})`;
	},
	/**
	 * @param start
	 * @param end
	 * @param 0_to_1
	 * @description Lerp from start to end via 0_to_1
	 */
	lerp: (start, end, _0_to_1) => {
		return `math.lerp(${start}, ${end}, ${_0_to_1})`;
	},
	/**
	 * @param start
	 * @param end
	 * @param _0_to_1
	 * @description Lerp the shortest direction around a circle from start degrees to end degrees via 0_to_1
	 */
	lerprotate: (start, end, _0_to_1) => {
		return `math.lerprotate(${start}, ${end}, ${_0_to_1})`;
	},
	/**
	 * @param value
	 * @description Natural logarithm of value
	 */
	log: (value) => {
		return `math.log(${value})`;
	},
	/**
	 * @param value
	 * @description Logarithm of value to base 2
	 */
};
var query = {};
var variable: Record<string, any> = {};
var temp: Record<string, any> = {};

interface Context {
	readonly [key: string]: string;
}

var context: Context = {};

var c = context;
var g = geometry;
var t = temp;
let v = variable;

// source https://github.com/microsoft/TypeScript/issues/15480 for the next 26 lines
type PrependNextNum<A extends Array<unknown>> = A["length"] extends infer T
	? ((t: T, ...a: A) => void) extends (...x: infer X) => void
		? X
		: never
	: never;

type EnumerateInternal<A extends Array<unknown>, N extends number> = {
	0: A;
	1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A["length"] ? 0 : 1];

export type Enumerate<N extends number> = EnumerateInternal<
	[],
	N
> extends (infer E)[]
	? E
	: never;

export type Range<FROM extends number, TO extends number> = Exclude<
	Enumerate<TO>,
	Enumerate<FROM>
>;

type E1 = Enumerate<43>;

type R2 = Range<0, 43>;
//////////////////////////////////

interface MoLang {
	loop(count: 1024 | number, expression: () => void): void;
}
