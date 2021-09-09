import type { SpaceContent, Space as SpaceType } from '../types';
import { spaces } from '../stores/spaces';
import { emptyContent, surroundings, eatables, enemies, numberOfSpaces } from '../constants';
import { randomInArray } from '../utils/array';

export const spaceCreator: () => void = () => {
	const newSpaces = [];

	for (let x = 0; x < numberOfSpaces; x++) {
		let newContent: SpaceContent = emptyContent;

		if (Math.random() > 0.85) {
			newContent = randomInArray(surroundings);
		} else if (Math.random() > 0.97) {
			newContent = randomInArray(eatables);
		} else if (Math.random() > 0.96) {
			newContent = randomInArray(enemies);
		}

		const newSpace: SpaceType = {
			id: x,
			content: newContent,
			background: 'default'
		};

		newSpaces.push(newSpace);
	}

	spaces.set(newSpaces);
};
