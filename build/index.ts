import browserify from "browserify";
import tsify from "tsify";
import fs from "fs";
import * as json from "jsonc-parser";
import { Options } from "browserify";
import * as packageJson from "../package.json";
import config from "../unnamed.config";

//import chalk from "chalk";
//const chalk = import("chalk");
console.time("compile");

const tsConfig = json.parse(
	fs.readFileSync("./tsconfig.json", "utf8")
) as Record<string, any>;

const _requireESM_ = (m) => {
	let M;
	(async () => {
		M = await import(m);
	})();
	return M;
};

let browserifyConfig: Options = {
	browserField: "minecraft-bedrock",
	detectGlobals: true,
	ignoreMissing: true,
	insertGlobalVars: {
		_requireESM_: (m) => {
			let M;
			(async () => {
				M = await import(m);
			})();
			return M;
		},
		setTimeout: require("mbcore-gametest").setTickTimeout,
		setInterval: require("mbcore-gametest").setTickInterval,
		clearTimeout: require("mbcore-gametest").clearTickTimeout,
		clearInterval: require("mbcore-gametest").clearTickInterval,
	},
	plugin: [[tsify, tsConfig]],
};

//console.log(browserifyConfig, tsConfig.includes);

const b = browserify(tsConfig.include, browserifyConfig);

//for (let i of config.minecraftModules) {b.ignore(i);}

/*
b.plugin((b, opts) => {
	b.on("file", (file, id, parent) => {
		let fileRead = fs.readFileSync(file, "utf8");
		let fileSplit = fileRead.split("\n")
		for ( fil)
		if (fileRead.match(/require\(\"(mojang[a-z\-]*)\"\)/g)) {
			let module = fileRead.match(/require\(\"(mojang[a-z\-]*)\"\)/g)[1];
			console.log(module);
			b.ignore(module);
			//fs.writeFileSync(file, fileSplit.join("\n"));
		}
	});
});*/
b.transform("brfs");
//b.transform("json");

//b.plugin("tinyify", { env: {} });

const bundle = b.bundle();

b.on("error", (error) => {
	console.error(error.toString());
});

bundle.pipe(
	fs.createWriteStream(config.outFile).on("close", () => {
		let fileRead = fs.readFileSync("beforeExecution.js", "utf8");
		+fs.readFileSync(config.outFile, "utf8");

		fs.writeFileSync(
			config.outFile,
			fileRead.replace(
				/require\(\"(mojang[a-z\-]*)\"\)/g,
				(match, p1): string => {
					return `_requireESM_("${p1}")`;
				}
			)
		);
	})
);

console.timeEnd("compile");

const requireESM = (module: string) => {
	let esmModule;
	(async () => {
		esmModule = await import(module);
	})();
	return esmModule;
};
