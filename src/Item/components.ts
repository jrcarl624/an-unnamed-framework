import {
	ItemStack,
	ItemCooldownComponent,
	ItemDurabilityComponent,
	ItemEnchantsComponent,
	ItemFoodComponent,
} from "mojang-minecraft";
export default class {
	private item: ItemStack;
	constructor(item: ItemStack) {
		this.item = item;
	}
	get itemCooldown(): ItemCooldownComponent {
		return this.item.getComponent("itemCooldown") as ItemCooldownComponent;
	}
	get itemDurability(): ItemDurabilityComponent {
		return this.item.getComponent(
			"itemDurability"
		) as ItemDurabilityComponent;
	}
	get itemEnchants(): ItemEnchantsComponent {
		return this.item.getComponent("itemEnchants") as ItemEnchantsComponent;
	}
	get itemFood(): ItemFoodComponent {
		return this.item.getComponent("itemFood") as ItemFoodComponent;
	}
}
