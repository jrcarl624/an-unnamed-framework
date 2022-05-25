export class Language {
	id: string;
	map = {};
	constructor(id: string) {
		this.id = id;
	}

	get(key: string, args: string[]) {
		let str: string = this.map[key];
		let i = 0;
		return str.replace(/\%(\d|s)/g, (match, arg) => {
			if (arg == "s") {
				i++;
				return args[i];
			} else return args[parseInt(arg)];
		});
	}
	set(key, value) {
		this.map[key] = value;
	}
}

/* Example:
const languages = {
  en_US: new Language();
}

languages.en_US.set('example.lang', '%s was killed by %s');
languages.en_US.set('example.lang2', '%2 killed %1');

const args = ["Player1", "Player2"];
languages.get('example.lang', args); // Player1 was killed by Player2
languages.get('example.lang2', args); // Player2 killed Player1
*/
