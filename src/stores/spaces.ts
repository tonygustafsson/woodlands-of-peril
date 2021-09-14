import { writable, get } from 'svelte/store';
import {
	emptyContent,
	surroundings,
	collectables,
	enemies,
	numberOfSpaces,
	spacesPerRow
} from '../constants';
import { randomInArray } from '../utils/array';
import type { SpaceContent, Space as SpaceType } from '../types';
import { userContent } from '../constants';
import { user } from './user';
import { getBoardPosition } from '../utils/board';

const createSpaces: () => SpaceType[] = () => {
	const spaces: SpaceType[] = [];

	for (let x = 0; x < numberOfSpaces; x++) {
		let newContent: SpaceContent = emptyContent;

		const random = Math.random();

		const topSpace = spaces[x - spacesPerRow];
		const bottomSpace = spaces[x + spacesPerRow];
		const leftSpace = spaces[x - 1];
		const rightSpace = spaces[x + 1];

		if (leftSpace?.content.solid && Math.random() > 0.75) {
			newContent = leftSpace.content;
		} else if (rightSpace?.content.solid && Math.random() > 0.75) {
			newContent = rightSpace.content;
		} else if (topSpace?.content.solid && Math.random() > 0.75) {
			newContent = topSpace.content;
		} else if (bottomSpace?.content.solid && Math.random() > 0.75) {
			newContent = bottomSpace.content;
		} else if (random > 0.65 && random <= 0.85) {
			// Create same as surrounding block
			const topSpace = spaces[x - spacesPerRow];
			const bottomSpace = spaces[x + spacesPerRow];
			const leftSpace = spaces[x - 1];
			const rightSpace = spaces[x + 1];

			if (leftSpace?.content.solid) {
				newContent = leftSpace.content;
			} else if (rightSpace?.content.solid) {
				newContent = rightSpace.content;
			} else if (topSpace?.content.solid) {
				newContent = topSpace.content;
			} else if (bottomSpace?.content.solid) {
				newContent = bottomSpace.content;
			} else {
				newContent = randomInArray(surroundings);
			}
		}

		if (random > 0.85 && random <= 0.93) {
			// Create colletable
			newContent = randomInArray(collectables);
		}

		if (random > 0.93) {
			// Create enemy
			newContent = randomInArray(enemies);
		}

		const boardPosition = getBoardPosition(x);

		const newSpace: SpaceType = {
			id: x,
			row: boardPosition.row,
			column: boardPosition.column,
			content: newContent
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
			content: userContent
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
