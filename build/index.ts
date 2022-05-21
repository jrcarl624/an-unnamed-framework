import browserify from "browserify";
import tsify from "tsify";
import fs from "fs";
import * as json from "jsonc-parser";

const tsconfig = fs.readFileSync("./tsconfig.json", "utf8");

browserify(["./src/index.ts"], {
	builtins: true,
})
	.plugin(tsify, json.parse(tsconfig))
	.bundle()
	.on("error", (error) => {
		console.error(error.toString());
	})
	.pipe(fs.createWriteStream("./build/index.js"));
