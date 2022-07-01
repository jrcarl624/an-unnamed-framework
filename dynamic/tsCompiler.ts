// make classes and interfaces with TypeScript functions will also writing ts doc comments
const fs = require("fs");
const prettier = require("prettier");
interface PropertiesValue {
	value?: any;

	setterType?: string;

	type: string;
	description?: string;
	propertyType?: "get" | "set" | "declaration";
	declaration?: "public" | "private" | "protected" | "readonly";
}

interface ArgumentsValue {
	value: any;
	type: string;
	optional: boolean;
	description?: string;
	assignToProperty?: boolean;
	declaration?: "public" | "private";
}

//TODO FORMAT WITH PRETTIER

const createClass = (
	name: string,
	description: string,
	properties: Record<string, PropertiesValue>,
	//@ts-ignore
	arguments: Record<string, ArgumentsValue>,
	constructor: string,
	methods: Record<string, string>
): string => {
	var classComment = `/**`;

	var classProperties = "";
	var classConstructor = `\n`;
	var classMethods = `\n`;

	for (let i in properties) {
		let property = "    ";
		let propertyComment = `${
			properties[i].description
				? `    /**\n     * ${properties[i].description}`
				: ""
		}`;

		switch (properties[i].propertyType) {
			case "get":
				property += `\nget ${i}(): ${properties[i].type} {${properties[i].value}}`;
				propertyComment += `\n * @returns {${properties[i].type}}\n */`;
				break;
			case "set":
				property +=
					`\nset ${i}(value` +
					(properties[i].setterType ? properties[i].setterType : "") +
					`): ${properties[i].type} {${properties[i].value}}`;
				propertyComment += `\n * @returns {${properties[i].type}}\n */`;

				break;
			case "declaration":
			default:
				if (properties[i].declaration) {
					property += `${properties[i].declaration} `;
				}
				property += `${i}`;
				property += `: ${properties[i].type}`;
				if (properties[i].value) {
					property += `= ${properties[i].value}`;
				}
				propertyComment += "\n */\n";
				break;
		}
		classProperties += propertyComment + property;
	}
	classConstructor += ``;

	var classArguments = "";
	var optionals: ArgumentsValue[] = [];
	for (let i in arguments) {
		if (arguments[i].optional) {
			optionals[i] = arguments[i];
		} else {
			classArguments += `${i}`;
			if (arguments[i].type) {
				classArguments += `: ${arguments[i].type}`;
			}
			classArguments += `, `;

			if (arguments[i].description) {
				classComment += `\n * @param ${i} ${arguments[i].description}`;
			}

			if (arguments[i].value && arguments[i].assignToProperty) {
				classConstructor += `this.${i} = ${i};\n`;

				if (arguments[i].description) {
					classProperties += `/**\n * ${arguments[i].description}\n*/\n`;
				}

				classProperties += `${i}: ${arguments[i].type};\n`;
			}
		}
	}

	classArguments += `options: ${name}Options) {\n`;
	let optionsInterface = `interface ${name}Options {\n`;

	for (let i in optionals) {
		optionsInterface += `${i}?:${optionals[i].type ?? "any"};\n`;
		if (optionals[i].value && optionals[i].assignToProperty) {
			classConstructor += `this.${i} = options.${i} ${
				optionals[i].value ? ` || ${optionals[i].value}` : ""
			};`;
			classProperties += `${
				optionals[i].description
					? `/** \n* ${optionals[i].description}\n*/\n`
					: ""
			}        ${
				optionals[i].declaration ? `${optionals[i].declaration} ` : ""
			} ${i}: ${optionals[i].type};\n`;
		}
	}
	optionsInterface += `}\n`;

	for (let i in methods) {
		classMethods += `    ${i}${methods[i]}\n`;
	}
	return prettier.format(
		optionsInterface +
			classComment +
			`\n */\nclass ${name} {\n\n` +
			classProperties +
			"constructor(" +
			classArguments +
			classConstructor +
			"\n}\n" +
			classMethods +
			"}",
		{
			useTabs: true,
			tabWidth: 4,
			parser: "typescript",
		}
	);
};
fs.writeFileSync(
	"test.ts",
	createClass(
		"test",
		"this is a test class",
		{
			a: {
				value: `"kill"`,
				type: "string",
				description: "used to kill the process",
				propertyType: "declaration",
				declaration: "public",
			},
			b: {
				value: `return "eat"`,
				type: "string",
				description: "used to eat the process",
				propertyType: "get",
			},
		},
		{
			r: {
				value: `"kill"`,
				type: "string",
				description: "used to kill the process",
				optional: false,
				assignToProperty: true,
			},
			J: {
				value: `"3"`,
				type: "string",
				optional: true,
				assignToProperty: true,
			},
		},
		`return this`,
		{
			aFunc: `() {return "dirt"}`,
		}
	)
);
