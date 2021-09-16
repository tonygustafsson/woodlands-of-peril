export type Space = {
	id: number;
	row: number;
	column: number;
	content: SpaceContent;
};

export type SpriteIds = 'coin' | 'monster' | 'wizard';
export type TileIds = 'grass' | 'rock' | 'water' | 'tree1' | 'tree2' | 'flower1';

export type SpaceContent = {
	icon?: string;
	spriteId?: SpriteIds;
	tileId?: TileIds;
	label: string;
	solid: boolean;
	collectable: boolean;
	enemy: boolean;
};

export type BoardPosition = {
	row: number;
	column: number;
};

export type Direction = 'left' | 'right' | 'up' | 'down';

export type Inventory = {
	label: string;
	quantity: number;
};

export type User = {
	position: number;
	row: number;
	column: number;
	alive: boolean;
};

export type AssetImage = {
	id: string;
	image: HTMLImageElement;
};

export type Assets = {
	tiles: AssetImage[];
	sprites: AssetImage[];
	done: boolean;
};

export type Sprite = {
	image: HTMLImageElement;
	sx: number;
	sy: number;
	sw: number;
	sh: number;
	dx: number;
	dy: number;
	dw: number;
	dh: number;
	currentFrame: number;
};
