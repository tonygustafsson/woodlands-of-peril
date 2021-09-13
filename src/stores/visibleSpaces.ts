import { get, writable } from 'svelte/store';
import { canvas } from './canvas';
import { spaces } from './spaces';
import { numberOfSpaces } from '../constants';
import { getBoardPosition } from '../utils/board';

const $spaces = get(spaces);

const initValue = [];

const visibleSpacesStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		locateAndSave: (userRow, userColumn) => {
			const visibleSpaces = [];
			const $canvas = get(canvas);

			for (let x = 0; x < numberOfSpaces; x++) {
				const spacePos = getBoardPosition(x);

				const rowsFromUser = spacePos.row - userRow;
				const columnsFromUser = spacePos.column - userColumn;

				if (
					Math.abs(rowsFromUser) > $canvas.cameraSpacesHeight / 2 &&
					Math.abs(columnsFromUser) > $canvas.cameraSpacesWidth / 2
				) {
					continue;
				}

				visibleSpaces[x] = $spaces[x];
			}

			set(visibleSpaces);
		}
	};
};

export const visibleSpaces = visibleSpacesStore();
