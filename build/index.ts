import browserify from "browserify";
import tsify from "tsify";
import fs from "fs";
import * as json from "jsonc-parser";
import { Options } from "browserify";
import * as packageJson from "../package.json";
import config from "../unnamed.config";
import path from "path";

//import chalk from "chalk";
//const chalk = import("chalk");

const tsConfig = json.parse(
	fs.readFileSync("./tsconfig.json", "utf8")
) as Record<string, any>;

const _requireESM_ = (m) => {};

let browserifyConfig: Options = {
	browserField: "minecraft-bedrock",
	detectGlobals: true,
	ignoreMissing: true,
	insertGlobalVars: {
		//setTimeout: require("mbcore-gametest").setTickTimeout,
		//setInterval: require("mbcore-gametest").setTickInterval,
		//clearTimeout: require("mbcore-gametest").clearTickTimeout,
		//clearInterval: require("mbcore-gametest").clearTickInterval,
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

//b.plugin("tinyify", { env: {} });

const bundle = b.bundle();

b.on("error", (error) => {
	console.error(error.toString());
});
// use allowed modules some how
bundle.pipe(
	fs.createWriteStream(config.outFile).on("close", () => {
		let outFile = fs.readFileSync(config.outFile, "utf8");

		let duplicates: string[] = [];
		let _requireMojangEsmModuleImports_ = "";
		let _requireMojangEsmModule_ = `export default (module) => {
	switch (module) {\n`;

		outFile = outFile.replace(
			/require\(\"(mojang[a-z\-]*)\"\)/g,
			(match, p1): string => {
				console.log(match);
				if (duplicates.indexOf(p1) == -1) {
					let p1Replace = p1.replace("-", "_");
					_requireMojangEsmModuleImports_ += `import ${p1Replace} from "${p1}"\n`;
					_requireMojangEsmModule_ += `		case "${p1}": return ${p1Replace};\n`;
					duplicates.push(p1);
				}
				return `_requireMojangEsmModule_("${p1}")`;
			}
		);
		let beforeExeDir = config.outFile.split("/");
		beforeExeDir.pop();
		fs.writeFileSync(
			beforeExeDir.join("/") + "/beforeBrowserify.js",
			_requireMojangEsmModuleImports_ + _requireMojangEsmModule_ + "	}\n}"
		);
		fs.writeFileSync(
			config.outFile,
			`import _requireMojangEsmModule_ from "./beforeBrowserify.js"\n` +
				outFile
		);
	})
);

const requireESM = (module) => {
	let esmModule;
	(async () => {
		esmModule = await import(module);
	})();
	return esmModule;
};
