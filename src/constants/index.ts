import type { SpaceContent } from '../types';

export const numberOfSpaces = 10000;
export const spaceWidth = 36;
export const spacesPerRow = 100;

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
export const deadContent: SpaceContent = {
	icon: '🪦',
	label: 'User',
	solid: true,
	eatable: false,
	enemy: false
};
export const surroundings: SpaceContent[] = [
	{ icon: '🌲', label: 'Pine tree', solid: true, eatable: false, enemy: false },
	{ icon: '🌴', label: 'Palm tree', solid: true, eatable: false, enemy: false },
	{ icon: '🌵', label: 'Cactus', solid: true, eatable: false, enemy: false },
	{ icon: '🪨', label: 'Stone', solid: true, eatable: false, enemy: false },
	{ icon: '🌻', label: 'Sunflower', solid: true, eatable: false, enemy: false },
	{ icon: '🌾', label: 'Sheif of rice', solid: true, eatable: false, enemy: false }
];
export const eatables: SpaceContent[] = [
	{ spriteId: 'coin', label: 'Money', solid: false, eatable: true, enemy: false },
	{ icon: '🍒', label: 'Cherry', solid: false, eatable: true, enemy: false },
	{ icon: '🍖', label: 'Meat bone', solid: false, eatable: true, enemy: false },
	{ icon: '🍇', label: 'Grapes', solid: false, eatable: true, enemy: false },
	{ icon: '🍉', label: 'Watermelon', solid: false, eatable: true, enemy: false },
	{ icon: '🍊', label: 'Orange', solid: false, eatable: true, enemy: false },
	{ icon: '🍍', label: 'Pinaple', solid: false, eatable: true, enemy: false },
	{ icon: '🍎', label: 'Apple', solid: false, eatable: true, enemy: false },
	{ icon: '🍓', label: 'Strawberry', solid: false, eatable: true, enemy: false },
	{ icon: '🥝', label: 'Kiwi', solid: false, eatable: true, enemy: false },
	{ icon: '🍄', label: 'Mushroom', solid: false, eatable: true, enemy: false },
	{ icon: '🥐', label: 'Croissant', solid: false, eatable: true, enemy: false },
	{ icon: '🧀', label: 'Cheese', solid: false, eatable: true, enemy: false },
	{ icon: '🍰', label: 'Cake', solid: false, eatable: true, enemy: false }
];
export const enemies: SpaceContent[] = [
	{ icon: '🐙', label: 'Squid', solid: false, eatable: false, enemy: true },
	{ icon: '🦂', label: 'Scorpion', solid: false, eatable: false, enemy: true },
	{ icon: '🕷', label: 'Spider', solid: false, eatable: false, enemy: true },
	{ icon: '😈', label: 'Devil', solid: false, eatable: false, enemy: true },
	{ icon: '👻', label: 'Ghost', solid: false, eatable: false, enemy: true },
	{ icon: '🦍', label: 'Gorilla', solid: false, eatable: false, enemy: true },
	{ icon: '🐅', label: 'Lion', solid: false, eatable: false, enemy: true },
	{ icon: '🦇', label: 'Bat', solid: false, eatable: false, enemy: true },
	{ icon: '🐊', label: 'Crocodile', solid: false, eatable: false, enemy: true }
];
