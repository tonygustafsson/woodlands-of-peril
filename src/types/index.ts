export type Space = {
	id: number;
	content: SpaceContent;
	background?: 'default' | 'highlight';
	effect?: 'zoomOut';
};

export type SpaceContent = {
	icon: string;
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
