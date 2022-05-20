import { ItemStack } from "mojang-minecraft";
import EntityComponents from "./components";

const ItemBuilder = class {
	item: ItemStack;

	constructor(item: ItemStack) {
		this.item = item;
	}

	get components(): EntityComponents {
		return new EntityComponents(this.item);
	}
	set lore(loreList: string[]) {
		this.item.setLore(loreList);
	}
	get lore(): string[] {
		return this.item.getLore();
	}
};
