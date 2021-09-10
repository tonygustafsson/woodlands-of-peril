import { get } from 'svelte/store';
import type { Space as SpaceType } from '../types';
import { spaces } from '../stores/spaces';
import { user } from '../stores/user';
import { userContent } from '../constants';
import { randomInArray } from '../utils/array';

export const positionCreator: () => void = () => {
	const $user = get(user);
	const $spaces = get(spaces);

	while ($user.position === 0) {
		const randomSpace = randomInArray($spaces);

		if (randomSpace.content.icon !== '') {
			continue;
		}

		const newSpace: SpaceType = {
			id: randomSpace.id,
			content: userContent,
			background: 'highlight',
			effect: 'zoomOut'
		};

		user.setPosition(randomSpace.id);
		spaces.setSpace(randomSpace.id, newSpace);
	}
};
