import { numberOfSpaces, spaceWidth } from '../constants';
import type { Space as SpaceType } from '../types';
import { getBoardPosition } from './board';
import { spaces } from '../stores/spaces';
import { user } from '../stores/user';
import { get } from 'svelte/store';

const paint = (
	canvas: HTMLCanvasElement,
	cameraSpacesWidth: number,
	cameraSpacesHeight: number,
	continiousLoop: boolean,
	showBoard: boolean,
	showBeings: boolean
): (() => void) => {
	if (!canvas) return;

	const fontSize = 20;
	const font = 'verdana';
	const lineWidth = 1;

	const loop = () => {
		if (continiousLoop) {
			window.requestAnimationFrame(loop);
		}

		const $user = get(user);
		const $spaces = get(spaces);

		const userY = canvas.height / 2 - spaceWidth / 2;
		const userX = canvas.width / 2 - spaceWidth / 2;

		const ctx = canvas.getContext('2d');

		// Clear it
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Canvas settings
		ctx.font = `${fontSize}px ${font}`;
		ctx.lineWidth = lineWidth;

		for (let x = 0; x < numberOfSpaces; x++) {
			const spacePos = getBoardPosition(x);

			const rowsFromUser = spacePos.row - $user.row;
			const columnsFromUser = spacePos.column - $user.column;

			if (
				Math.abs(rowsFromUser) > cameraSpacesHeight / 2 ||
				Math.abs(columnsFromUser) > cameraSpacesWidth / 2
			) {
				// No need to paint spaces that are not in the camera view
				continue;
			}

			const space: SpaceType = $spaces[x];

			if (showBoard && (space.content.enemy || space.content.eatable)) {
				// Only paint board
				continue;
			}

			if (showBeings && !space.content.enemy && !space.content.eatable) {
				// Only paint beings
				continue;
			}

			const top = userY + rowsFromUser * spaceWidth;
			const left = userX + columnsFromUser * spaceWidth;

			ctx.fillStyle = space.background === 'highlight' ? '#333' : '#000';
			ctx.strokeStyle = space.background === 'highlight' ? '#888' : '#333';

			// Draw rectangle
			ctx.beginPath();
			ctx.rect(left, top, spaceWidth, spaceWidth);
			ctx.fill();
			ctx.stroke();

			// Add icon
			ctx.fillText(space.content.icon, left + 6, top + spaceWidth - 11);
		}
	};

	window.requestAnimationFrame(loop);
};

export const paintBoard = (
	canvas: HTMLCanvasElement,
	cameraSpacesWidth: number,
	cameraSpacesHeight: number
): (() => void) => {
	if (!canvas) return;

	const continiousLoop = false;
	const showBoard = true;
	const showBeings = false;

	paint(canvas, cameraSpacesWidth, cameraSpacesHeight, continiousLoop, showBoard, showBeings);
};

export const paintBeings = (
	canvas: HTMLCanvasElement,
	cameraSpacesWidth: number,
	cameraSpacesHeight: number
): (() => void) => {
	if (!canvas) return;

	const continiousLoop = true;
	const showBoard = false;
	const showBeings = true;

	paint(canvas, cameraSpacesWidth, cameraSpacesHeight, continiousLoop, showBoard, showBeings);
};
