import { Block,BlockPistonComponent,BlockInventoryComponent,BlockLavaContainerComponent,BlockPotionContainerComponent,BlockRecordPlayerComponent,BlockSnowContainerComponent,BlockWaterContainerComponent,} from "mojang-minecraft";
export default class {
	private block: Block;
	constructor(block: Block) {
		this.block = block;
	}
	
	get piston(): BlockPistonComponent {
		return this.block.getComponent("piston") as BlockPistonComponent;
	}
	get inventory(): BlockInventoryComponent {
		return this.block.getComponent("inventory") as BlockInventoryComponent;
	}
	get lavaContainer(): BlockLavaContainerComponent {
		return this.block.getComponent("lavaContainer") as BlockLavaContainerComponent;
	}
	get potionContainer(): BlockPotionContainerComponent {
		return this.block.getComponent("potionContainer") as BlockPotionContainerComponent;
	}
	get recordPlayer(): BlockRecordPlayerComponent {
		return this.block.getComponent("recordPlayer") as BlockRecordPlayerComponent;
	}
	get snowContainer(): BlockSnowContainerComponent {
		return this.block.getComponent("snowContainer") as BlockSnowContainerComponent;
	}
	get waterContainer(): BlockWaterContainerComponent {
		return this.block.getComponent("waterContainer") as BlockWaterContainerComponent;
	}
}