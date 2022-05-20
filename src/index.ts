const cfg = {
	prefix: "!",
	commands: {},
	blacklist: [],
};

interface PluginFunction {
	[key: string]: (...args) => {};
}

interface Plugin {
	name: string;
	group: string;
	function: (...args) => {};
}
