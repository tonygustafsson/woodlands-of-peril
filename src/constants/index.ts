import type { Stuff } from '../types';

export const emptyIcon: Stuff = { content: '', label: '', solid: false };
export const userIcon: Stuff = { content: '😺', label: 'User', solid: true };
export const surroundings: Stuff[] = [
	{ content: '🌲', label: 'Pine tree', solid: true },
	{ content: '🌴', label: 'Palm tree', solid: true },
	{ content: '🌵', label: 'Cactus', solid: true },
	{ content: '🪨', label: 'Stone', solid: true }
];
export const unusualStuff: Stuff[] = [
	{ content: '🍒', label: 'Cherry', solid: false },
	{ content: '🐙', label: 'Squid', solid: false },
	{ content: '🐞', label: 'Ladybug', solid: false },
	{ content: '🕷', label: 'Spider', solid: false },
	{ content: '🍖', label: 'Meat bone', solid: false },
	{ content: '💰', label: 'Money bag', solid: false }
];

export const numberOfSpaces = 6000;
export const spaceWidth = 36;
export const spacesPerRow = 100;
