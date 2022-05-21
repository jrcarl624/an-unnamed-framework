export const cfg = {
	prefix: "!",
	commands: {},
	blacklist: [],
};

export * from "./Chat";
export * from "./Block";
export * from "./Player";
export * from "./Entity";
export * from "./World";
export * from "./Molang";

interface PluginFunction {
	[key: string]: (...args) => {};
}

interface Plugin {
	name: string;
	group: string;
	function: (...args) => {};
}

console.log(12141342341124);
