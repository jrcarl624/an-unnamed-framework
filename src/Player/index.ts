import { EntityBuilder } from "../Entity";
import { Player } from "mojang-minecraft";

const PLayerBuilder = class extends EntityBuilder {
	constructor(player: Player) {
		super(player);
	}
};
