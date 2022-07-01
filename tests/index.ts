const parse = (value: string) => {
	if (value.match(/\[/)) {
		let parsedArray = JSON.parse(
			value
				.replace(/@[spear]/, "")
				.replace(/\[/, '{"')
				.replace(/\[/, '"}')
				.replace(/([ ]?,[ ]?)/, '","')
				.replace(/[ ]?=[ ]?/, '":"')
		);
		let ParsedObject = {};
		for (let i in parsedArray) {
			var split = i.split("=");
			// Makes the query into a workable form

			switch (split[0]) {
				case "scores":
				case "hasitem":
					ParsedObject[split[0]] = JSON.parse(split[1]);
					break;
				default: //TODO: figure out how to do nots with the query ie, r=!2
					if (split[1].match(/[!]?[\d]+/)) {
						ParsedObject[split[0]] = parseInt(split[1]);
					} else {
						ParsedObject[split[0]] = split[1];
					}
			}
		}
	}
	return;
};

parse("@e[tag=tree,scor]");
