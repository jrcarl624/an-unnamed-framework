import * as tsOptions from "../tsconfig.json";
import * as browserify from "browserify";
import tsify from "tsify";

browserify()
	.add("main.ts")
	.plugin(tsify, tsOptions.compilerOptions)
	.bundle()
	.on("error", function (error) {
		console.error(error.toString());
	})
	.pipe(process.stdout);
