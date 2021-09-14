import type { SpaceContent } from '../types';

export const numberOfSpaces = 10000;
export const spaceWidth = 36;
export const spacesPerRow = 100;

export const emptyContent: SpaceContent = {
	icon: '',
	label: '',
	solid: false,
	collectable: false,
	enemy: false
};
export const userContent: SpaceContent = {
	icon: '😺',
	label: 'User',
	solid: true,
	collectable: false,
	enemy: false
};
export const deadContent: SpaceContent = {
	icon: '🪦',
	label: 'User',
	solid: true,
	collectable: false,
	enemy: false
};
export const surroundings: SpaceContent[] = [
	{ tileId: 'grass', label: 'Grass', solid: true, collectable: false, enemy: false },
	{ tileId: 'rock', label: 'Rock', solid: true, collectable: false, enemy: false },
	{ tileId: 'water', label: 'Water', solid: true, collectable: false, enemy: false },
	{ tileId: 'tree1', label: 'Tree 1', solid: true, collectable: false, enemy: false },
	{ tileId: 'tree2', label: 'Tree 2', solid: true, collectable: false, enemy: false },
	{ tileId: 'flower1', label: 'Flower 1', solid: true, collectable: false, enemy: false }
];
export const collectables: SpaceContent[] = [
	{ spriteId: 'coin', label: 'Money', solid: false, collectable: true, enemy: false },
	{ icon: '🍒', label: 'Cherry', solid: false, collectable: true, enemy: false },
	{ icon: '🍖', label: 'Meat bone', solid: false, collectable: true, enemy: false },
	{ icon: '🍇', label: 'Grapes', solid: false, collectable: true, enemy: false },
	{ icon: '🍉', label: 'Watermelon', solid: false, collectable: true, enemy: false },
	{ icon: '🍊', label: 'Orange', solid: false, collectable: true, enemy: false },
	{ icon: '🍍', label: 'Pinaple', solid: false, collectable: true, enemy: false },
	{ icon: '🍎', label: 'Apple', solid: false, collectable: true, enemy: false },
	{ icon: '🍓', label: 'Strawberry', solid: false, collectable: true, enemy: false },
	{ icon: '🍄', label: 'Mushroom', solid: false, collectable: true, enemy: false },
	{ icon: '🥐', label: 'Croissant', solid: false, collectable: true, enemy: false },
	{ icon: '🧀', label: 'Cheese', solid: false, collectable: true, enemy: false },
	{ icon: '🍰', label: 'Cake', solid: false, collectable: true, enemy: false }
];
export const enemies: SpaceContent[] = [
	{ spriteId: 'monster', label: 'Monster', solid: false, collectable: false, enemy: true },
	{ spriteId: 'wizard', label: 'Wizard', solid: false, collectable: false, enemy: true },
	{ icon: '🦂', label: 'Scorpion', solid: false, collectable: false, enemy: true },
	{ icon: '🕷', label: 'Spider', solid: false, collectable: false, enemy: true },
	{ icon: '😈', label: 'Devil', solid: false, collectable: false, enemy: true },
	{ icon: '👻', label: 'Ghost', solid: false, collectable: false, enemy: true },
	{ icon: '🦍', label: 'Gorilla', solid: false, collectable: false, enemy: true },
	{ icon: '🐅', label: 'Lion', solid: false, collectable: false, enemy: true },
	{ icon: '🦇', label: 'Bat', solid: false, collectable: false, enemy: true },
	{ icon: '🐊', label: 'Crocodile', solid: false, collectable: false, enemy: true }
];
