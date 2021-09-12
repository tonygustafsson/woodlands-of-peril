import { get, writable } from 'svelte/store';
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

const initValue = [];

let userRow = 0;
let userColumn = 0;

const visibleSpacesStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		setVisibleBlocks: () => {
			const visibleSpaces = [];
			let noOfBlocks = 0;

			for (let x = 0; x < numberOfSpaces; x++) {
				const spacePos = getBoardPosition(x);

				const rowsFromUser = spacePos.row - userRow;
				const columnsFromUser = spacePos.column - userColumn;

				if (
					Math.abs(rowsFromUser) > cameraSpacesHeight / 2 &&
					Math.abs(columnsFromUser) > cameraSpacesWidth / 2
				) {
					continue;
				}

				noOfBlocks++;
				visibleSpaces[x] = $spaces[x];
			}

			console.log('Visible blocks', noOfBlocks);
			set(visibleSpaces);
		}
	};
};

export const visibleSpaces = visibleSpacesStore();

user.subscribe(($user) => {
	userRow = $user.row;
	userColumn = $user.column;
	visibleSpaces.setVisibleBlocks();
});
