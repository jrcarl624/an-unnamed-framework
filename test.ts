interface testOptions {
	J?: string;
}
/**
 * @param r used to kill the process
 */
class test {
	/**
	 * used to kill the process
	 */
	public a: string = "kill";
	/**
	 * used to eat the process
	 * @returns {string}
	 */
	get b(): string {
		return "eat";
	}
	/**
	 * used to kill the process
	 */
	r: string;
	J: string;
	constructor(r: string, options: testOptions) {
		this.r = r;
		this.J = options.J || "3";
	}

	aFunc() {
		return "dirt";
	}
}
