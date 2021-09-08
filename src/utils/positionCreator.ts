import { get } from 'svelte/store';
import type { Space as SpaceType } from '../types';
import { spaces } from '../stores/spaces';
import { position } from '../stores/position';
import { userIcon } from '../constants';
import { randomInArray } from '../utils/array';

export const positionCreator: () => void = () => {
	let $position = get(position);
	const $spaces = get(spaces);

	while ($position === 0) {
		const randomSpace = randomInArray($spaces);

		if (randomSpace.icon.content !== '') {
			continue;
		}

		const newSpace: SpaceType = {
			id: randomSpace.id,
			icon: userIcon,
			background: 'highlight',
			effect: 'zoomOut'
		};

		position.set(randomSpace.id);
		spaces.setSpace(randomSpace.id, newSpace);
		$position = get(position);
	}
};
