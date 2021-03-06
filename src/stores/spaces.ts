import { writable, get } from 'svelte/store';
import {
	emptyContent,
	surroundings,
	collectables,
	unusualCollectables,
	enemies,
	numberOfSpaces,
	spacesPerRow
} from '../constants';
import { inArray, randomNumber } from '$utils/random';
import type { SpaceContent, Space } from '../types';
import { userContent } from '../constants';
import user from './user';
import { getBoardPosition } from '$utils/board';
import storage from '$utils/storage';

const createSpaces: () => Space[] = () => {
	const spaces: Space[] = [];

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
				newContent = inArray(surroundings);
			}
		}

		if (random > 0.85 && random <= 0.91) {
			// Create colletable
			newContent = inArray(collectables);
		}

		if (random > 0.91 && random <= 0.912) {
			newContent = inArray(unusualCollectables);
		}

		if (random > 0.912) {
			// Create enemy
			newContent = inArray(enemies);
			newContent.level = randomNumber(0, 8);
		}

		const boardPosition = getBoardPosition(x);

		const newSpace: Space = {
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
		const randomSpace = inArray(spaces);

		if (randomSpace.content.spriteId || randomSpace.content.tileId) {
			continue;
		}

		const boardPosition = getBoardPosition(randomSpace.id);

		const newSpace: Space = {
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

let initValue: Space[] = createSpaces();
const [storageValue, storeStorage] = storage<Space[]>('spaces', initValue);
initValue = storageValue;

const spacesStore = () => {
	const { subscribe, set, update } = writable(initValue);

	return {
		subscribe,
		set,
		setSpace: (id: number, newSpace: Space) => {
			update((spaces) => {
				spaces[id] = newSpace;
				return spaces;
			});
		},
		clearStorage: () => {
			storeStorage.clear();
		}
	};
};

const spaces = spacesStore();

let storageTimer;

// Fetch changes to store and save it to LocalStorage
spaces.subscribe((value) => {
	clearTimeout(storageTimer);

	storageTimer = setTimeout(() => {
		if (Object.keys(value).length <= 0) {
			// Do not save empty set, from startup
			return;
		}

		storeStorage.set(value);
	}, 500);
});

export default spaces;
