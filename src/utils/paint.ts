import { numberOfSpaces, spaceWidth } from '../constants';
import type { Space as SpaceType } from '../types';
import { getBoardPosition } from '../utils/board';
import { spaces } from '../stores/spaces';
import { user } from '../stores/user';
import { get } from 'svelte/store';

export const paint = (
	canvas: HTMLCanvasElement,
	cameraSpacesWidth: number,
	cameraSpacesHeight: number
): (() => void) => {
	if (!canvas) return;

	const loop = () => {
		window.requestAnimationFrame(loop);

		const $user = get(user);
		const $spaces = get(spaces);

		const userY = canvas.height / 2 - spaceWidth / 2;
		const userX = canvas.width / 2 - spaceWidth / 2;

		const ctx = canvas.getContext('2d');

		// Clear it
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Canvas settings
		ctx.font = '20px verdana';
		ctx.lineWidth = 1;

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

			const top = userY + rowsFromUser * spaceWidth;
			const left = userX + columnsFromUser * spaceWidth;
			const space: SpaceType = $spaces[x];

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
