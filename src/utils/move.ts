import { position } from '../stores/position';
import { get } from 'svelte/store';
import { spaces } from '../stores/spaces';
import { emptyIcon, userIcon, spacesPerRow } from '../constants';
import type { Direction, Space as SpaceType } from '../types';

export const move = (direction: Direction): void => {
	const $position = get(position);
	const $spaces = get(spaces);
	let newPosition = $position;

	switch (direction) {
		case 'up':
			newPosition = $position - spacesPerRow;
			break;
		case 'down':
			newPosition = $position + spacesPerRow;
			break;
		case 'left':
			newPosition = $position - 1;
			break;
		case 'right':
			newPosition = $position + 1;
			break;
	}

	if (newPosition !== $position && !$spaces[newPosition].icon.solid) {
		const newOldSpace: SpaceType = {
			...$spaces[$position],
			icon: emptyIcon,
			background: 'default',
			effect: null
		};
		spaces.setSpace($position, newOldSpace);

		const newNewSpace: SpaceType = {
			...$spaces[newPosition],
			icon: userIcon,
			background: 'highlight',
			effect: null
		};
		spaces.setSpace(newPosition, newNewSpace);

		position.set(newPosition);
	}
};
