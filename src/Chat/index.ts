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
