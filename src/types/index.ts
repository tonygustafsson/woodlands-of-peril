export type Space = {
	id: number;
	icon: Stuff;
	background?: 'default' | 'highlight';
	effect?: 'zoomOut';
};

export type Stuff = {
	content: string;
	label: string;
	solid: boolean;
};

export type Direction = 'left' | 'right' | 'up' | 'down';
