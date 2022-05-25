import { Entity, Events, IEntityComponent } from "mojang-minecraft";
import EntityComponents from "./components";

export const EntityBuilder = class {
	entity: Entity;
	constructor(entity: Entity) {
		this.entity = entity;
	}
	get component(): EntityComponents {
		return new EntityComponents(this.entity);
	}
	get components(): EntityComponents {
		let list = {};
		for (let i in this.component) {
			list[i] = this.component[i];
		}
		//
		return list as EntityComponents;
	}
};
