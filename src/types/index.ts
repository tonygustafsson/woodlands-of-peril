export type Space = {
	id: number;
	row: number;
	column: number;
	content: SpaceContent;
	background?: 'default' | 'highlight';
	effect?: 'zoomOut';
};

export type SpriteIds = 'coin' | 'monster';

export type SpaceContent = {
	icon?: string;
	spriteId?: SpriteIds;
	label: string;
	solid: boolean;
	eatable: boolean;
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
