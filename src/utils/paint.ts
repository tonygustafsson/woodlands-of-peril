import { numberOfSpaces, spaceWidth } from '../constants';
import type { Space as SpaceType } from '../types';
import { getBoardPosition } from './board';
import { spaces } from '../stores/spaces';
import { user } from '../stores/user';
import { get } from 'svelte/store';
import { coinSprite, monsterSprite } from '../stores/sprites';

const startPainting = (
	canvas: HTMLCanvasElement,
	cameraSpacesWidth: number,
	cameraSpacesHeight: number,
	continiousLoop: boolean,
	showBoard: boolean,
	showBeings: boolean
): void => {
	const fontSize = 20;
	const font = 'verdana';
	const lineWidth = 1;

	const loop = () => {
		if (continiousLoop) {
			window.requestAnimationFrame(loop);
		}

		const $user = get(user);
		const $spaces = get(spaces);

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

			const userY = Math.floor(canvas.height / 2 - spaceWidth / 2);
			const userX = Math.floor(canvas.width / 2 - spaceWidth / 2);
			const top = userY + rowsFromUser * spaceWidth;
			const left = userX + columnsFromUser * spaceWidth;

			ctx.fillStyle = space.background === 'highlight' ? '#333' : '#000';
			ctx.strokeStyle = space.background === 'highlight' ? '#888' : '#333';

			// Draw rectangle
			ctx.beginPath();
			ctx.rect(left, top, spaceWidth, spaceWidth);
			ctx.fill();
			ctx.stroke();

			// Add sprite
			if (space.content.spriteId) {
				const dx = left + 6;
				const dy = top + 6;
				let sprite;

				switch (space.content.spriteId) {
					case 'coin':
						sprite = get(coinSprite);
						break;
					case 'monster':
						sprite = get(monsterSprite);
						break;
				}

				ctx.drawImage(
					sprite.image,
					sprite.sx,
					sprite.sy,
					sprite.sw,
					sprite.sh,
					dx,
					dy,
					sprite.dw,
					sprite.dh
				);
			}

			// Add icon
			if (space.content.icon) {
				ctx.fillText(space.content.icon, left + 6, top + spaceWidth - 11);
			}
		}
	};

	window.requestAnimationFrame(loop);
};

export const paintBoard = (
	canvas: HTMLCanvasElement,
	cameraSpacesWidth: number,
	cameraSpacesHeight: number
): void => {
	const continiousLoop = false;
	const showBoard = true;
	const showBeings = false;

	startPainting(
		canvas,
		cameraSpacesWidth,
		cameraSpacesHeight,
		continiousLoop,
		showBoard,
		showBeings
	);
};

export const paintAnimatedSpaces = (
	canvas: HTMLCanvasElement,
	cameraSpacesWidth: number,
	cameraSpacesHeight: number
): void => {
	const continiousLoop = true;
	const showBoard = false;
	const showBeings = true;

	startPainting(
		canvas,
		cameraSpacesWidth,
		cameraSpacesHeight,
		continiousLoop,
		showBoard,
		showBeings
	);
};