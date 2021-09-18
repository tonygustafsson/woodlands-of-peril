import type { SpaceContent } from '../types';

export const numberOfSpaces = 10000;
export const spaceWidth = 36;
export const spacesPerRow = 100;

export const emptyContent: SpaceContent = {
	label: '',
	solid: false,
	collectable: false,
	enemy: false
};
export const userContent: SpaceContent = {
	spriteId: 'user',
	label: 'User',
	solid: true,
	collectable: false,
	enemy: false
};
export const deadContent: SpaceContent = {
	tileId: 'skull',
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
	{ spriteId: 'apple', label: 'Apple', solid: false, collectable: true, enemy: false },
	{ spriteId: 'heart', label: 'Heart', solid: false, collectable: true, enemy: false }
];
export const enemies: SpaceContent[] = [
	{ spriteId: 'bull', label: 'Bull', solid: false, collectable: false, enemy: true },
	{ spriteId: 'bird', label: 'Bird', solid: false, collectable: false, enemy: true },
	{ spriteId: 'wizard', label: 'Wizard', solid: false, collectable: false, enemy: true },
	{ spriteId: 'bat', label: 'Bat', solid: false, collectable: false, enemy: true },
	{ spriteId: 'rhino', label: 'Rhino', solid: false, collectable: false, enemy: true },
	{ spriteId: 'spider', label: 'Spider', solid: false, collectable: false, enemy: true }
];
