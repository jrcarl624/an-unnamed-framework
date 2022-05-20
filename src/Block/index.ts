import {
	Vector,
	Block as _Block,
	BlockPermutation,
	Location,
	BlockLocation,
	world as World,
	MinecraftDimensionTypes,
	Dimension,
	ItemStack,
	NumberRange as _NumberRange,
	IEntityComponent,
	Entity,
	MinecraftBlockTypes,
} from "mojang-minecraft";

const Matrix: any = "";

const example = "!we 3 5 3 8 3 7 ";

const error = (code: number | string, line: number, message?: string) => {
	switch (code) {
		case 1:
			message = "Each blocks dimension must be the same";

		default:
			// @ts-ignore
			if (!line) line = "unknown location";
			if (!message) message = "no message specified";
			return console.error(`Error: ${code} at ${line}, ${message}`);
	}
};

const frame = (
	x: number,
	y: number,
	z: number,
	dx: number,
	dy: number,
	dz: number
) => {};

const pointToVector = () => {};

const square = (bl1: Location, bl2: Location) => {
	let a = bl1,
		b,
		c,
		d,
		e = bl2,
		f,
		g,
		h;
};

type BlockPermutationChunkData = Record<
	number,
	Record<number, Record<number, BlockPermutation>>
>;

let BlockChunkDataExample = {
	"1": {
		"1": {
			"1": World.getDimension("overworld").getBlock(
				new BlockLocation(1, 1, 1)
			),
		},
	},
};

const BlockPermutationChunk = class {
	//TODO: make sure to not include air blocks

	data: BlockPermutationChunkData;

	get depth() {
		var z;
		for (let i in this.data) {
			for (let j in this.data[i]) {
				for (let k in this.data[i][j]) {
					if (new Number(k) > z) {
						z = new Number(k);
					}
				}
			}
		}
		return z;
	}

	get width() {
		var x;
		for (let i in this.data) {
			for (let j in this.data[i]) {
				for (let k in this.data[i][j]) {
					if (new Number(k) > x) {
						x = new Number(k);
					}
				}
			}
		}
		return x;
	}
	get height() {
		var y;
		for (let i in this.data) {
			for (let j in this.data[i]) {
				for (let k in this.data[i][j]) {
					if (new Number(k) > y) {
						y = new Number(k);
					}
				}
			}
		}
		return y;
	}

	constructor(block: Block, dBlock: Block, data?) {
		if (data) {
			this.data = data;
		} else {
			if (block.dimension.id !== dBlock.dimension.id) throw error(1, 109);
			for (let i of block.location.blocksBetween(dBlock.location))
				data[
					i.x -
						Math.sqrt(
							Math.pow(dBlock.location.x - block.location.x, 2)
						)
				][
					i.y -
						Math.sqrt(
							Math.pow(dBlock.location.y - block.location.y, 2)
						)
				][
					i.z -
						Math.sqrt(
							Math.pow(dBlock.location.z - block.location.z, 2)
						)
				] = World.getDimension(block.dimension.id)
					.getBlock(i)
					.permutation.clone();
		}
	}

	fill(
		location: BlockLocation,
		locationD: BlockLocation,
		permutation: BlockPermutation,
		dimension: string,
		options?: FillOptions
	) {
		for (let i of location.blocksBetween(locationD)) {
			World.getDimension(dimension)
				.getBlock(location)
				.setPermutation(permutation);
		}
	}
};

// @ts-ignore
new BlockChunk(new Block(1, 1, 1), new Block(2, 2, 2));

interface FillOptions {
	mode?: "fill" | "hollow" | "outline";
	outline?: boolean;
	hollow?: boolean;
	destroyList?: BlockPermutation[];
	replaceList?: BlockPermutation[];
	blockPallet?: BlockPermutation[];
}

interface graphOptions {}

const graph = class {
	data: typeof Matrix;
	options: graphOptions = {};
	constructor(matrix: typeof Matrix, options?: graphOptions) {
		this.data = matrix;
		if (options) this.options = options;
	}
};

type Identifier = `${Lowercase<string>}:${Lowercase<string>}`;

class Block extends _Block implements _Block {
	constructor(
		dimension: Dimension,
		location: BlockLocation,
		permutation: BlockPermutation
	) {
		super();
		dimension.getBlock(location).setPermutation(permutation);
	}
}

class BlockAreaSize implements BlockAreaSize {}

//Idea: new block container with any block that has a container

//example block constructor
new Block(
	World.getDimension("overworld"),
	new BlockLocation(1, 1, 1),
	MinecraftBlockTypes.stone.createDefaultBlockPermutation()
);

class NumberRange extends _NumberRange implements _NumberRange {
	constructor(max: number, min: number) {
		super();
		this.max = max;
		this.min = min;
	}
	next(): number {
		return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
	}
}

export const BlockBuilder = class {
	block: Block;
	constructor(
		block: Block,
		dimension?: Dimension,
		location?: BlockLocation,
		permutation?: BlockPermutation
	) {
		block = block || new Block(dimension, location, permutation);
	}

	get location(): BlockLocation {
		return this.block.location;
	}

	set permutation(permutation: BlockPermutation) {
		this.block.setPermutation(permutation);
	}
	get component(): BlockComponents {
		return new BlockComponents(this.block);
	}
};
