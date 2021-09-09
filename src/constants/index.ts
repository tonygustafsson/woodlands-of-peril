import type { SpaceContent } from '../types';

export const emptyContent: SpaceContent = {
	icon: '',
	label: '',
	solid: false,
	eatable: false,
	enemy: false
};
export const userContent: SpaceContent = {
	icon: '😺',
	label: 'User',
	solid: true,
	eatable: false,
	enemy: false
};
export const surroundings: SpaceContent[] = [
	{ icon: '🌲', label: 'Pine tree', solid: true, eatable: false, enemy: false },
	{ icon: '🌴', label: 'Palm tree', solid: true, eatable: false, enemy: false },
	{ icon: '🌵', label: 'Cactus', solid: true, eatable: false, enemy: false },
	{ icon: '🪨', label: 'Stone', solid: true, eatable: false, enemy: false }
];
export const eatables: SpaceContent[] = [
	{ icon: '🍒', label: 'Cherry', solid: false, eatable: true, enemy: false },
	{ icon: '🍖', label: 'Meat bone', solid: false, eatable: true, enemy: false },
	{ icon: '💰', label: 'Money bag', solid: false, eatable: true, enemy: false }
];
export const enemies: SpaceContent[] = [
	{ icon: '🐙', label: 'Squid', solid: false, eatable: false, enemy: true },
	{ icon: '🐞', label: 'Ladybug', solid: false, eatable: false, enemy: true },
	{ icon: '🕷', label: 'Spider', solid: false, eatable: false, enemy: true }
];

export const numberOfSpaces = 6000;
export const spaceWidth = 36;
export const spacesPerRow = 100;
