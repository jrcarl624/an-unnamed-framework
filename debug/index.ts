import * as EventEmitter from "events";
import * as bedrock from "bedrock-protocol";
import chalk from "chalk";

import { motdParser } from "@sfirew/mc-motd-parser";

const format = (string) => {
	return (
		string
			.replace(/§0/g, mcColors[`§0`])
			.replace(/§1/g, mcColors[`§1`])
			.replace(/§2/g, mcColors[`§2`])
			.replace(/§3/g, mcColors[`§3`])
			.replace(/§4/g, mcColors[`§4`])
			.replace(/§5/g, mcColors[`§5`])
			.replace(/§g/g, mcColors[`§g`])
			.replace(/§7/g, mcColors[`§7`])
			.replace(/§8/g, mcColors[`§8`])
			.replace(/§9/g, mcColors[`§9`])
			.replace(/§a/g, mcColors[`§a`])
			.replace(/§b/g, mcColors[`§b`])
			.replace(/§c/g, mcColors[`§c`])
			.replace(/§d/g, mcColors[`§d`])
			.replace(/§e/g, mcColors[`§e`])
			.replace(/§f/g, mcColors[`§f`])
			.replace(/§r/g, mcColors[`§r`])
			.replace(/§k/g, mcColors[`§k`])
			.replace(/§l/g, mcColors[`§l`])
			.replace(/§m/g, mcColors[`§m`])
			.replace(/§n/g, mcColors[`§n`])
			.replace(/§o/g, mcColors[`§o`]) + `\x1b[0m`
	);
};
const mcColors = {
	"§0": `\x1b[38;2;0;0;0m`,
	"§1": `\x1b[38;2;0;0;170m`,
	"§2": `\x1b[38;2;0;170;0m`,
	"§3": `\x1b[38;2;0;170;170m`,
	"§4": `\x1b[38;2;170;0;0m`,
	"§5": `\x1b[38;2;170;0;170m`,
	"§g": `\x1b[38;2;221;214;05m`,
	"§7": `\x1b[38;2;170;170;170m`,
	"§8": `\x1b[38;2;85;85;85m`,
	"§9": `\x1b[38;2;85;85;255m`,
	"§a": `\x1b[38;2;85;255;85m`,
	"§b": `\x1b[38;2;85;255;255m`,
	"§c": `\x1b[38;2;255;85;85m`,
	"§d": `\x1b[38;2;255;85;255m`,
	"§e": `\x1b[38;2;255;255;85m`,
	"§f": `\x1b[38;2;255;255;255m`,
	"§6": `\x1b[38;2;255;170;0m`,
	"§r": `\x1b[0m`,
	//obfuscated
	"§k": `\x1b[8m`,
	//bold
	"§l": `\x1b[1m`,
	//strikethrough
	"§m": `\x1b[9m`,
	//underline
	"§n": `\x1b[4m`,
	//italics
	"§o": `\x1b[3m`,
};

class TermBuilder extends EventEmitter.EventEmitter {
	listenerBinded;
	isStopped;
	constructor() {
		super();
		this.isStopped = true;
		this.listenerBinded = this.listener.bind(this);
		this.start();
	}
	listener(data) {
		this.emit("input", data.toString().replace(/(\n|\r)/g, ""));
	}
	start() {
		if (this.isStopped) {
			process.stdin.resume();
			process.stdin.on("data", this.listenerBinded);
			this.isStopped = false;
		}
	}
	stop() {
		if (!this.isStopped) {
			process.stdin.pause();
			process.stdin.removeListener("data", this.listenerBinded);
			this.isStopped = true;
		}
	}
}
let client = bedrock.createClient({
	host: "localhost",
	port: 5555,
	username: "Debug Bot",
	offline: true,
});

client.on("text", (packet: any) => {
	switch (packet.type) {
		case "chat":
			console.log(format(`<${packet.source_name}> ${packet.message}`));
			break;
		case "json_whisper":
			let json = JSON.parse(packet.message);

			for (let i of json.rawtext) {
				console.log(format(`<Json Wisper> ${i.text}`));
			}
	}
});

client.on("command_output", (packet: any) => {
	console.log(packet.output);
});

const Term = new TermBuilder();
Term.on("input", (data) => {
	if (data.startsWith("/")) {
		client.queue("command_request", {
			command: data,
			origin: {
				size: 0,
				type: 0,
				uuid: "",
				request_id: "",
				player_entity_id: "",
			},
			interval: false,
		});
	} else
		client.queue("text", {
			type: "chat",
			needs_translation: false,
			source_name: "Debug Bot",
			xuid: "",
			platform_chat_id: "",
			message: data,
		});
});
