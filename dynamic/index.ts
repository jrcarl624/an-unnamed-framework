import fs from "fs";
import path from "path";

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

const firstCharLowerCase = (str: string) => {
	return str.charAt(0).toLowerCase() + str.slice(1);
};

const gameTestTypes = fs.readFileSync(
	path.join(
		__dirname,
		"..",
		"node_modules",
		"@types",
		"mojang-gametest",
		"index.d.ts"
	),
	"utf8"
);

var componentTypes: Record<string, string[]> = {
	item: [],
	block: [],
	entity: [],
};

var eventTypes: string[] = [];
for (let line of minecraftTypes.split("\n")) {
	if (line.match(/readonly '[ \S]+': \S+EventSignal/)) {
		let match = line.match(/(?:': )(\S+)(?:EventSignal)/);
		eventTypes.push(firstCharLowerCase(match[1]));
	}

	if (line.match(/extends IEntityComponent/)) {
		//@ts-ignore
		let match = line
			.match(/Entity[\s\S]+Component/)[0]
			.replace(/ extends IEntityComponent/, "");

		if (!componentTypes.entity.includes(match)) {
			componentTypes.entity.push(match);
		}
	}
	if (line.match(/Item[\s\S]+Component/)) {
		//@ts-ignore
		let match = line.match(/Item[\s\S]+Component/)[0];

		if (!componentTypes.item.includes(match)) {
			componentTypes.item.push(match);
		}
	}
	if (line.match(/Block[\s\S]+Component/)) {
		//@ts-ignore
		let match = line.match(/Block[\s\S]+Component/)[0];

		if (!componentTypes.block.includes(match)) {
			componentTypes.block.push(match);
		}
	}
}

var EntityComponentClass = `} from "mojang-minecraft";
export default class {
	private entity: Entity;
	constructor(entity: Entity) {
		this.entity = entity;
	}
	`;

var EntityComponentImports = `import { Entity,`;
for (let i of componentTypes.entity) {
	let componentName = firstCharLowerCase(
		i.replace(/^Entity/, "").replace(/Component$/, "")
	);

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
	private block: Block;
	constructor(block: Block) {
		this.block = block;
	}
	`;

var BlockComponentImports = `import { Block,`;
for (let i of componentTypes.block) {
	let componentName = firstCharLowerCase(
		i.replace(/^Block/, "").replace(/Component$/, "")
	);

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
	private item: ItemStack;
	constructor(item: ItemStack) {
		this.item = item;
	}
	`;

var ItemComponentImports = `import { ItemStack,`;
for (let i of componentTypes.item) {
	let componentName = firstCharLowerCase(
		i.replace(/^Entity/, "").replace(/Component$/, "")
	);

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

var EventClass = `} from "mojang-minecraft";
export default class {
	private item: ItemStack;
	constructor(item: ItemStack) {
		this.item = item;
	}`;

var EventImports = `import { ItemStack,`;
for (let i of eventTypes) {
	EventClass += `
	get ${i}(): ${i} {
		return this.item.getComponent("${i}") as ${i};
	}`;
	EventImports += `${i},`;
}

ItemComponentClass += `
}`;

fs.writeFileSync(`./src/Item/components.ts`, EventImports + EventClass);
