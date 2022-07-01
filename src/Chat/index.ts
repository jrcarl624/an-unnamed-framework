import {
	world as World,
	BeforeChatEvent,
	Location,
	Player,
	Entity,
} from "mojang-minecraft";
import { cfg } from "../";
import { runCommand } from "../Utils";
const example = "!we 3 5 3 8 3 7 ";




const command = (callback: (...args) => {}, options: CommandOptions) => {};
//@ts-ignore
const Arg: ArgType = {
	label: "",
	description: "",
	required: false,
	default: "",
	aliases: [],
	type: [],
};

const ChatBuilder = class {
	prefix;
	commands: Command[] = [];
	commandTypes: typeof CommandType[]
	triggers: Trigger[] = [];
	blacklist: string[] = [];

	constructor() {
		//TODO: database to set configs
		if (typeof this.prefix === "undefined") {
			this.prefix = cfg.prefix;
		}

		this.blacklist = cfg.blacklist;

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
interface ArgType {
	name: string;
	description: string;
	required?: boolean;
	default: string;
	type: (typeof CommandType)[];
}
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

interface CommandOptions {
	aliases: string[];
	description: string;
	args: ArgType[];
	tags?: string[];
	permissions?: string[];
}


type CommandOverload = (...args: (typeof CommandType)[]) => {
	error: boolean;
	statusMessage: string;
	output: string;
}

const Command = class {
	overloads: CommandOverload[];

	constructor(name: string, defaultOverload: CommandOverload, options: CommandOptions) {
		this.overloads.push(defaultOverload);

	}
	overload(CommandOverload, options: CommandOptions) {

	}
};

const CommandType = class {
	RegExpValidation: RegExp;
	value: any;
	id: string;
	description: string;
	error: (value) => Error = (value) => {
		return new Error(value)
	};
	examples: string[];
	parse
	constructor(
		type: string,
		regExp: RegExp,
		parser: (value) => any,
		error?: ((value: any) => Error) | string,
		description?: string,
		examples?: string[]
	) {
		this.id = type;
		this.RegExpValidation = regExp
		this.parse = parser
		this.description = description
		this.examples = examples
		this.error = error
	}
	validate(value: string) {
		if (value.match(this.RegExpValidation)) {
			return value;
		}
		throw this.error(value); //TODO error Handling, 0 is temp
	}
};


//IDEA: whitelist command on bds that adds to json and reloads whitelist same with perms, also where server properties are added to the variables.json, plugin builder that compiles the packs together so they can use the same variables if needed or there is a default variables.json i can use

const StringType = new CommandType(
	"string",
	/(?:"[^"]+")|(?:(\S)+)/,
	(value: string): string => {
		return new String(value).toString();
	}
);

const IntegerType = new CommandType(
	"integer",
	/[-]?\d+/,
	(value: string): number => {
		return parseInt(value);
	}
);
const FloatType = new CommandType(
	"float",
	/[-]?\d+\.\d+/,
	(value: string): number => {
		return parseFloat(value);
	}
);

const LocationType = new CommandType(
	"location",
	/[^~][-]?\d+ [^~][-]?\d+ [^~][-]?\d+/,
	(value: string): Location => {
		let parsed = value.split(" ");
		if (value.match(/[~]|[\^]/)) {
			//TODO: relative location and ^, rn its using parseInt for convenience
		}

		return new Location(
			parseInt(parsed[0]),
			parseInt(parsed[1]),
			parseInt(parsed[2])
		);
	}
);

// add custom query parameters which is extendable

const targetType = new CommandType(
	"target",
	/(?:@[spear])|(?:(?:\[(?:)\])?)/,
	(value: string): Player | Entity => {
		if (value.match(/\[/)) {
			let parsedArray = JSON.parse(
				value
					.replace(/@[spear]/, "")
					.replace(/\[/, '{"')
					.replace(/\[/, '"}')
					.replace(/([ ]?,[ ]?)/, '","')
					.replace(/[ ]?=[ ]?/, '":"')
			);
			let ParsedObject = {};
			for (let i in parsedArray) {
				var split = i.split("=");
				// Makes the query into a workable form

				switch (split[0]) {
					case "scores":
					case "hasitem":
						ParsedObject[split[0]] = JSON.parse(split[1]);
						break;
					default: //TODO: figure out how to do nots with the query ie, r=!2
						if (split[1].match(/[!]?[\d]+/)) {
							ParsedObject[split[0]] = parseInt(split[1]);
						} else {
							ParsedObject[split[0]] = split[1];
						}
				}
			}
		} else if ()
		return;
	}
);

const Chat = new ChatBuilder()
Chat.commands[]
