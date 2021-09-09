import { position } from '../stores/position';
import { get } from 'svelte/store';
import { spaces } from '../stores/spaces';
import { emptyIcon, userIcon, spacesPerRow } from '../constants';
import type { Direction, Space as SpaceType } from '../types';

export const move = (direction: Direction): boolean | undefined => {
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
			newPosition = $position % spacesPerRow === 0 ? $position : $position - 1;
			break;
		case 'right':
			newPosition = $position % spacesPerRow === spacesPerRow - 1 ? $position : $position + 1;
			break;
	}

	if (newPosition === $position) {
		return; // Same position as before
	}

	if (!$spaces[newPosition]) {
		console.log('Space does not exist', $spaces[newPosition]);
		return; // Space does not exist
	}

	if ($spaces[newPosition].icon.solid) {
		return; // Cannot move through solid materials
	}

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

	const userDomNode = document.querySelector('.highlight');
	if (userDomNode) {
		userDomNode.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});
	}

	return true;
};
