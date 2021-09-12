import { derived, get } from 'svelte/store';
import { user } from './user';
import { spaces } from './spaces';
import { numberOfSpaces, spaceWidth } from '../constants';
import { getBoardPosition } from '../utils/board';

const $spaces = get(spaces);

const canvasWidth =
	document.body.clientWidth < 600
		? document.body.clientWidth
		: Math.floor(document.body.clientWidth * 0.7);
const canvasHeight =
	document.body.clientWidth < 600
		? document.body.clientHeight
		: Math.floor(document.body.clientHeight * 0.7);

const cameraSpacesWidth = Math.floor(canvasWidth / spaceWidth);
const cameraSpacesHeight = Math.floor(canvasHeight / spaceWidth);

const visibleSpacesStore = () => {
	const { subscribe } = derived(user, ($user) => {
		const visibleSpaces = [];
		console.log('hej1', $user);
		// TODO: UPDATES ALL THE TIME, FIX

		for (let x = 0; x < numberOfSpaces; x++) {
			const spacePos = getBoardPosition(x);

			const rowsFromUser = spacePos.row - $user.row;
			const columnsFromUser = spacePos.column - $user.column;

			if (
				Math.abs(rowsFromUser) > cameraSpacesHeight / 2 ||
				Math.abs(columnsFromUser) > cameraSpacesWidth / 2
			) {
				continue;
			}

			visibleSpaces[x] = $spaces[x];
		}

		return visibleSpaces;
	});

	return {
		subscribe
	};
};

export const visibleSpaces = visibleSpacesStore();
