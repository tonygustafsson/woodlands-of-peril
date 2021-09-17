import { user } from '../stores/user';
import { inventory } from '../stores/inventory';
import { get } from 'svelte/store';
import { spaces } from '../stores/spaces';
import { emptyContent, deadContent, userContent, spacesPerRow } from '../constants';
import type { Direction, Space } from '../types';

export const move = (direction: Direction): boolean | undefined => {
	const $user = get(user);
	const $spaces = get(spaces);
	let newPosition = $user.position;

	switch (direction) {
		case 'up':
			newPosition = $user.position - spacesPerRow;
			break;
		case 'down':
			newPosition = $user.position + spacesPerRow;
			break;
		case 'left':
			newPosition = $user.position % spacesPerRow === 0 ? $user.position : $user.position - 1;
			break;
		case 'right':
			newPosition =
				$user.position % spacesPerRow === spacesPerRow - 1 ? $user.position : $user.position + 1;
			break;
	}

	if (newPosition === $user.position) {
		return; // Same position as before
	}

	if (!$user.alive) {
		return; // You cannot move when you are dead
	}

	if (!$spaces[newPosition]) {
		user.setPosition($user.position, direction);
		return; // Space does not exist
	}

	if ($spaces[newPosition].content.solid) {
		user.setPosition($user.position, direction);
		return; // Cannot move through solid materials
	}

	if ($spaces[newPosition].content.collectable) {
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

	const newOldSpace: Space = {
		...$spaces[$user.position],
		content: emptyContent
	};
	spaces.setSpace($user.position, newOldSpace);

	const newUserContent = $spaces[newPosition].content.enemy ? deadContent : userContent;

	if ($spaces[newPosition].content.enemy) {
		user.setDead();
	}

	const newNewSpace: Space = {
		...$spaces[newPosition],
		content: newUserContent
	};

	spaces.setSpace(newPosition, newNewSpace);
	user.setPosition(newPosition, direction);

	return true;
};

export const handleKeyup = (e: KeyboardEvent): void => {
	if (!['w', 's', 'd', 'a'].includes(e.key.toLowerCase())) {
		return;
	}

	user.setMoving(false);
};

export const handleKeydown = (e: KeyboardEvent): void => {
	switch (e.key.toLowerCase()) {
		case 'w':
			move('up');
			break;
		case 's':
			move('down');
			break;
		case 'd':
			move('right');
			break;
		case 'a':
			move('left');
			break;
	}

	user.setMoving(true);
};
