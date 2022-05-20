import * as fs from "fs";
import { Entity } from "mojang-minecraft";
import * as path from "path";

const minecraftTypes = fs.readFileSync(
	path.join(
		__dirname,
		"..",
		"node_modules",
		"@types",
		"mojang-minecraft",
		"index.d.ts"
	),
	"utf8"
);

const gameTestTypes = fs.readFileSync(
	path.join(
		__dirname,
		"..",
		"node_modules",
		"@types",
		"mojang-gametest",
		"index.d.ts"
	)
);

let componentTypes = {
	item: [],
	block: [],
	entity: [],
};

for (let line of minecraftTypes.split("\n")) {
	if (line.match(/extends IEntityComponent/)) {
		let match = line
			.match(/Entity[\s\S]+Component/)[0]
			.replace(/ extends IEntityComponent/, "");

		if (!componentTypes.entity.includes(match)) {
			componentTypes.entity.push(match);
		}
	}
	if (line.match(/Item[\s\S]+Component/)) {
		let match = line.match(/Item[\s\S]+Component/)[0];

		if (!componentTypes.item.includes(match)) {
			componentTypes.item.push(match);
		}
	}
	if (line.match(/Block[\s\S]+Component/)) {
		let match = line.match(/Block[\s\S]+Component/)[0];

		if (!componentTypes.block.includes(match)) {
			componentTypes.block.push(match);
		}
	}
}

var EntityComponentClass = `} from "mojang-minecraft";
export default class {
	entity: Entity;
	constructor(entity: Entity) {
		this.entity = entity;
	}
	`;

var EntityComponentImports = `import { Entity,`;
for (let i of componentTypes.entity) {
	let componentName =
		i
			.replace(/^Entity/, "")
			.replace(/Component$/, "")
			.charAt(0)
			.toLowerCase() +
		i

			.replace(/^Entity/, "")
			.replace(/Component$/, "")
			.slice(1);

	EntityComponentClass += `
	get ${componentName}(): ${i} {
		return this.entity.getComponent("${componentName}") as ${i};
	}`;
	EntityComponentImports += `${i},`;
}

EntityComponentClass += `
}`;

fs.writeFileSync(
	`./src/Entity/components.ts`,
	EntityComponentImports + EntityComponentClass
);

var BlockComponentClass = `} from "mojang-minecraft";
export default class {
	block: Block;
	constructor(block: Block) {
		this.block = block;
	}
	`;

var BlockComponentImports = `import { Block,`;
for (let i of componentTypes.block) {
	let componentName =
		i
			.replace(/^Block/, "")
			.replace(/Component$/, "")
			.charAt(0)
			.toLowerCase() +
		i

			.replace(/^Block/, "")
			.replace(/Component$/, "")
			.slice(1);

	BlockComponentClass += `
	get ${componentName}(): ${i} {
		return this.block.getComponent("${componentName}") as ${i};
	}`;
	BlockComponentImports += `${i},`;
}

BlockComponentClass += `
}`;

fs.writeFileSync(
	`./src/Block/components.ts`,
	BlockComponentImports + BlockComponentClass
);

var ItemComponentClass = `} from "mojang-minecraft";
export default class {
	item: ItemStack;
	constructor(item: ItemStack) {
		this.item = item;
	}
	`;

var ItemComponentImports = `import { ItemStack,`;
for (let i of componentTypes.item) {
	let componentName =
		i
			.replace(/^Item/, "")
			.replace(/Component$/, "")
			.charAt(0)
			.toLowerCase() +
		i

			.replace(/^Item/, "")
			.replace(/Component$/, "")
			.slice(1);

	ItemComponentClass += `
	get ${componentName}(): ${i} {
		return this.item.getComponent("${componentName}") as ${i};
	}`;
	ItemComponentImports += `${i},`;
}

ItemComponentClass += `
}`;

fs.writeFileSync(
	`./src/Item/components.ts`,
	ItemComponentImports + ItemComponentClass
);
