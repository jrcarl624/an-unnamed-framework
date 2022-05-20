import { Entity } from "mojang-minecraft";
import EntityComponents from "./components";

export const EntityBuilder = class {
	entity: Entity;
	constructor(entity: Entity) {
		this.entity = entity;
	}

	get components(): EntityComponents {
		return new EntityComponents(this.entity);
	}
};
