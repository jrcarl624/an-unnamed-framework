import { world as World, MinecraftDimensionTypes } from "mojang-minecraft";

export const runCommand = (
	command: string = "",
	dimension: MinecraftDimensionTypes | string = "overworld",
	errorHandling?: (error) => any
) => {
	if (errorHandling instanceof Function)
		try {
			//@ts-ignore
			return World.getDimension(dimension).runCommand(command);
		} catch (error) {
			if (errorHandling instanceof Function) {
				return errorHandling(error);
			}
			return error;
		}
	//@ts-ignore
	return World.getDimension(dimension).runCommand(command);
};

const runCommands = (
	commands: string[],
	dimension: MinecraftDimensionTypes | string = "overworld",
	errorHandling?: (error) => any
) => {
	let commandsOutput = [];
	for (let i of commands) {
		if (i.startsWith("!")) {
			try {
				commandsOutput.push(runCommand(i.replace(/^!/, ""), dimension));
			} catch (error) {
				return commandsOutput;
			}
		}

		commandsOutput.push(runCommand(i, dimension, errorHandling));
	}
	return commandsOutput;
};
