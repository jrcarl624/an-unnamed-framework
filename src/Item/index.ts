import { ItemStack } from "mojang-minecraft";
import EntityComponents from "./components";

const ItemBuilder = class {
	item: ItemStack;

	get amount(): number {
		return this.item.amount;
	}
	set amount(amount: number) {
		this.item.amount = amount;
	}
	get data(): number {
		return this.item.data;
	}
	set data(amount: number) {
		this.item.data = amount;
	}
	get id() {
		return this.item.id;
	}
	get nameTag() {
		return this.item.nameTag;
	}
	set nameTag(name: string) {
		this.item.nameTag = name;
	}
	triggerEvent(event: string) {
		this.item.triggerEvent(event);
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
	constructor(item: ItemStack) {
		this.item = item;
	}
};
