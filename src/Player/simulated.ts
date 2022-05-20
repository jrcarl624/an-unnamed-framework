import { register, registerAsync, SimulatedPlayer } from "mojang-gametest";
import { BlockLocation, Dimension } from "mojang-minecraft";

// This is all still work in progress

export const spawnSimulatedPlayer = (
	dimension: Dimension,
	blockLocation: BlockLocation,
	name: string,
	gameMode?
): SimulatedPlayer => {
	register("unnamedFramework", `spawnSimulatedPlayer:${name}`, (test) => {
		let player = test.spawnSimulatedPlayer(blockLocation, name, gameMode);
		return player;
	});
	dimension.runCommand(
		`gametest run unnamedFramework:spawnSimulatedPlayer:${name}`
	);

	return;
};
