import type { Stuff, Space as SpaceType } from '../types';
import { spaces } from '../stores/spaces';
import { emptyIcon, surroundings, unusualStuff, numberOfSpaces } from '../constants';
import { randomInArray } from '../utils/array';

export const spaceCreator: () => void = () => {
	const newSpaces = [];

	for (let x = 0; x < numberOfSpaces; x++) {
		let icon: Stuff = emptyIcon;

		if (Math.random() > 0.85) {
			icon = randomInArray(surroundings);
		} else if (Math.random() > 0.97) {
			icon = randomInArray(unusualStuff);
		}

		const newSpace: SpaceType = {
			id: x,
			icon: icon,
			background: 'default'
		};

		newSpaces.push(newSpace);
	}

	spaces.set(newSpaces);
};
