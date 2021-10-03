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
	solid?: boolean;
	enemy?: boolean;
	level?: number;
	giveEnergy?: boolean;
	giveMoney?: boolean;
};

export type BoardPosition = {
	row: number;
	column: number;
};

export type Direction = 'left' | 'right' | 'up' | 'down';

export type Inventory = {
	money: number;
	energy: number;
};

export type Event = {
	type: 'enemy' | 'greeting' | 'none';
	enemylevel?: number;
	enemyType?: string;
};

export type User = {
	position: number;
	row: number;
	column: number;
	direction: Direction;
	level: number;
	moving: boolean;
	alive: boolean;
	nextPosition: number;
	isHurting: boolean;
	event: Event;
	inventory: Inventory;
};

export type AssetImage = {
	id: string;
	image: HTMLImageElement;
};

export type AssetAudio = {
	id: string;
	audio: HTMLAudioElement;
};

export type Assets = {
	tiles: AssetImage[];
	sprites: AssetImage[];
	soundEffects: AssetAudio[];
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
	topMargin: number;
	leftMargin: number;
	currentFrame: number;
};

export type DialogContent = {
	title: string;
	text: string;
	actions: {
		cta?: boolean;
		label: string;
		action: () => void;
	}[];
};
