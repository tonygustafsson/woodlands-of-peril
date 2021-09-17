export type Space = {
	id: number;
	row: number;
	column: number;
	content: SpaceContent;
};

export type SpaceContent = {
	spriteId?: string;
	tileId?: string;
	label: string;
	solid: boolean;
	collectable: boolean;
	enemy: boolean;
	tiles?: Record<string, string>;
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
	direction: 'left' | 'right';
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
