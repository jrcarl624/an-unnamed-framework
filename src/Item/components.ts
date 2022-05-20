import { ItemStack,ItemCooldownComponent,ItemDurabilityComponent,ItemEnchantsComponent,ItemFoodComponent,} from "mojang-minecraft";
export default class {
	item: ItemStack;
	constructor(item: ItemStack) {
		this.item = item;
	}
	
	get cooldown(): ItemCooldownComponent {
		return this.item.getComponent("cooldown") as ItemCooldownComponent;
	}
	get durability(): ItemDurabilityComponent {
		return this.item.getComponent("durability") as ItemDurabilityComponent;
	}
	get enchants(): ItemEnchantsComponent {
		return this.item.getComponent("enchants") as ItemEnchantsComponent;
	}
	get food(): ItemFoodComponent {
		return this.item.getComponent("food") as ItemFoodComponent;
	}
}