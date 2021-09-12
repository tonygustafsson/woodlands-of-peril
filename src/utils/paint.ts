import { spaceWidth } from '../constants';
import { getBoardPosition } from './board';
import { visibleSpaces } from '../stores/visibleSpaces';
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
		const $visibleSpaces = get(visibleSpaces);

		const ctx = canvas.getContext('2d');

		// Clear it
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Canvas settings
		ctx.font = `${fontSize}px ${font}`;
		ctx.lineWidth = lineWidth;

		$visibleSpaces.forEach((space, index) => {
			const spacePos = getBoardPosition(index);

			const rowsFromUser = spacePos.row - $user.row;
			const columnsFromUser = spacePos.column - $user.column;

			if (showBoard && (space.content.enemy || space.content.eatable)) {
				// Only paint board
				return;
			}

			if (showBeings && !space.content.enemy && !space.content.eatable) {
				// Only paint beings
				return;
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
		});
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
