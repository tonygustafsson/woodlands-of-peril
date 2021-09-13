import { writable, get } from 'svelte/store';
import { emptyContent, surroundings, eatables, enemies, numberOfSpaces } from '../constants';
import { randomInArray } from '../utils/array';
import type { SpaceContent, Space as SpaceType } from '../types';
import { userContent } from '../constants';
import { user } from './user';
import { getBoardPosition } from '../utils/board';

const createSpaces: () => SpaceType[] = () => {
	const spaces = [];

	for (let x = 0; x < numberOfSpaces; x++) {
		let newContent: SpaceContent = emptyContent;
		const boardPosition = getBoardPosition(x);

		if (Math.random() > 0.7) {
			newContent = randomInArray(surroundings);
		} else if (Math.random() > 0.97) {
			newContent = randomInArray(eatables);
		} else if (Math.random() > 0.96) {
			newContent = randomInArray(enemies);
		}

		const newSpace: SpaceType = {
			id: x,
			row: boardPosition.row,
			column: boardPosition.column,
			content: newContent,
			background: 'default'
		};

		spaces.push(newSpace);
	}

	// Add user
	const $user = get(user);

	while ($user.position === 0) {
		const randomSpace = randomInArray(spaces);

		if (randomSpace.content.icon !== '') {
			continue;
		}

		const boardPosition = getBoardPosition(randomSpace.id);

		const newSpace: SpaceType = {
			id: randomSpace.id,
			row: boardPosition.row,
			column: boardPosition.column,
			content: userContent,
			background: 'highlight',
			effect: 'zoomOut'
		};

		user.setPosition(randomSpace.id);
		spaces[randomSpace.id] = newSpace;
	}

	return spaces;
};

const initValue: SpaceType[] = createSpaces();

const spacesStore = () => {
	const { subscribe, set, update } = writable(initValue);

	return {
		subscribe,
		set,
		setSpace: (id: number, newSpace: SpaceType) => {
			update((spaces) => {
				spaces[id] = newSpace;
				return spaces;
			});
		}
	};
};

export const spaces = spacesStore();
