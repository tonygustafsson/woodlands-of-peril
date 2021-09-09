import { position } from '../stores/position';
import { inventory } from '../stores/inventory';
import { get } from 'svelte/store';
import { spaces } from '../stores/spaces';
import { emptyContent, userContent, spacesPerRow } from '../constants';
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

	if ($spaces[newPosition].content.solid) {
		return; // Cannot move through solid materials
	}

	if ($spaces[newPosition].content.enemy) {
		return; // Cannot move through enemies materials
	}

	if ($spaces[newPosition].content.eatable) {
		// Eat it!
		inventory.update((inventory) => {
			const oldValue = inventory.find((item) => item.label === $spaces[newPosition].content.label);

			if (oldValue) {
				oldValue.quantity++;
			} else {
				inventory.push({
					label: $spaces[newPosition].content.label,
					quantity: 1
				});
			}

			return inventory;
		});
	}

	const newOldSpace: SpaceType = {
		...$spaces[$position],
		content: emptyContent,
		background: 'default',
		effect: null
	};
	spaces.setSpace($position, newOldSpace);

	const newNewSpace: SpaceType = {
		...$spaces[newPosition],
		content: userContent,
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
