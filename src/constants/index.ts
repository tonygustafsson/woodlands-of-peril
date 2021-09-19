import type { SpaceContent } from '../types';

export const numberOfSpaces = 10000;
export const spaceWidth = 36;
export const spacesPerRow = 100;

export const emptyContent: SpaceContent = {
	label: ''
};
export const userContent: SpaceContent = {
	spriteId: 'user',
	label: 'User',
	solid: true
};
export const deadContent: SpaceContent = {
	spriteId: 'skull',
	label: 'User',
	solid: true
};
export const surroundings: SpaceContent[] = [
	{ tileId: 'grass', label: 'Grass', solid: true },
	{ tileId: 'rock', label: 'Rock', solid: true },
	{ tileId: 'water', label: 'Water', solid: true },
	{ tileId: 'tree1', label: 'Tree 1', solid: true },
	{ tileId: 'tree2', label: 'Tree 2', solid: true },
	{ tileId: 'flower1', label: 'Flower 1', solid: true }
];
export const collectables: SpaceContent[] = [
	{ spriteId: 'coin', label: 'Money', giveMoney: true },
	{ spriteId: 'pizza', label: 'Pizza', giveEnergy: true },
	{ spriteId: 'heart', label: 'Heart', giveEnergy: true }
];
export const enemies: SpaceContent[] = [
	{ spriteId: 'bull', label: 'Bull', enemy: true },
	{ spriteId: 'bird', label: 'Bird', enemy: true },
	{ spriteId: 'wizard', label: 'Wizard', enemy: true },
	{ spriteId: 'bat', label: 'Bat', enemy: true },
	{ spriteId: 'rhino', label: 'Rhino', enemy: true },
	{ spriteId: 'spider', label: 'Spider', enemy: true }
];
