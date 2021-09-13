import { spaceWidth } from '../constants';
import type { Space as SpaceType } from '../types';
import { getBoardPosition } from './board';
import { visibleSpaces } from '../stores/visibleSpaces';
import { user } from '../stores/user';
import { get } from 'svelte/store';
import { coinSprite, monsterSprite } from '../stores/sprites';

const getSpaceBackgroundColor = (space: SpaceType): string => {
	if (space.background === 'highlight') {
		return '#333';
	}

	if (space.content.solid) {
		return '#200000';
	}

	return '#000';
};

const startPainting = (
	canvas: HTMLCanvasElement,
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

		$visibleSpaces.forEach((space: SpaceType, index: number) => {
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

			ctx.fillStyle = getSpaceBackgroundColor(space);
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

export const paintBoard = (canvas: HTMLCanvasElement): void => {
	const continiousLoop = false;
	const showBoard = true;
	const showBeings = false;

	startPainting(canvas, continiousLoop, showBoard, showBeings);
};

export const paintAnimatedSpaces = (canvas: HTMLCanvasElement): void => {
	const continiousLoop = true;
	const showBoard = false;
	const showBeings = true;

	startPainting(canvas, continiousLoop, showBoard, showBeings);
};
