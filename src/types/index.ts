export type Space = {
	id: number;
	row: number;
	column: number;
	content: SpaceContent;
};

export type SpriteIds = 'coin' | 'monster' | 'wizard';

export type SpaceContent = {
	icon?: string;
	spriteId?: SpriteIds;
	label: string;
	solid: boolean;
	collectable: boolean;
	enemy: boolean;
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
};
