import { user } from '../stores/user';
import { inventory } from '../stores/inventory';
import { get } from 'svelte/store';
import { spaces } from '../stores/spaces';
import { emptyContent, deadContent, userContent, spacesPerRow } from '../constants';
import type { Direction, Space as SpaceType } from '../types';

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
		console.log('Space does not exist', $spaces[newPosition]);
		return; // Space does not exist
	}

	if ($spaces[newPosition].content.solid) {
		return; // Cannot move through solid materials
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
		...$spaces[$user.position],
		content: emptyContent,
		background: 'default',
		effect: null
	};
	spaces.setSpace($user.position, newOldSpace);

	const newUserContent = $spaces[newPosition].content.enemy ? deadContent : userContent;

	if ($spaces[newPosition].content.enemy) {
		user.setDead();
	}

	const newNewSpace: SpaceType = {
		...$spaces[newPosition],
		content: newUserContent,
		background: 'highlight',
		effect: null
	};

	spaces.setSpace(newPosition, newNewSpace);

	user.setPosition(newPosition);

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

let keyDownTimer;

export const handleKeydown = (e) => {
	if (keyDownTimer) {
		return clearTimeout(keyDownTimer);
	}

	setTimeout(() => {
		switch (e.keyCode) {
			case 87:
				// W UP
				if (!move('up')) {
					clearTimeout(keyDownTimer);
				}
				break;
			case 83:
				// S Down
				if (!move('down')) {
					clearTimeout(keyDownTimer);
				}
				break;
			case 68:
				// D Right
				if (!move('right')) {
					clearTimeout(keyDownTimer);
				}
				break;
			case 65:
				// A Left
				if (!move('left')) {
					clearTimeout(keyDownTimer);
				}
				break;
		}
	}, 100);
};
