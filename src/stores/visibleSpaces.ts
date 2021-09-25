import { get, writable } from 'svelte/store';
import { canvas } from './canvas';
import { spaces } from './spaces';

const $spaces = get(spaces);

const initValue = [];

const visibleSpacesStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		locateAndSave: (userRow: number, userColumn: number) => {
			const $canvas = get(canvas);

			const rowMin = userRow - Math.floor($canvas.cameraSpacesHeight / 2);
			const rowMax = userRow + Math.floor($canvas.cameraSpacesHeight / 2);
			const colMin = userColumn - Math.floor($canvas.cameraSpacesWidth / 2);
			const colMax = userColumn + Math.floor($canvas.cameraSpacesWidth / 2);

			const visibleSpaces = $spaces.filter(
				(space) =>
					space.row >= rowMin &&
					space.row <= rowMax &&
					space.column >= colMin &&
					space.column <= colMax
			);

			set(visibleSpaces);
		}
	};
};

export const visibleSpaces = visibleSpacesStore();
