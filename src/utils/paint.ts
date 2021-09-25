import { spaceWidth } from '../constants';
import type { Space, User } from '../types';
import { visibleSpaces } from '$stores/visibleSpaces';
import { user } from '$stores/user';
import { get } from 'svelte/store';
import sprites from '$stores/sprites';
import assets from '$stores/assets';

const getSpaceBackgroundColor = (space: Space, $user: User): string => {
	if (space.content.label === 'User' && $user.isHurting) {
		return '#ff0000';
	}

	if (space.content.label === 'User') {
		return '#333';
	}

	if (space.content.enemy) {
		return 'rgba(255, 0, 0, 0.1)';
	}

	if (space.content.solid) {
		return 'rgba(0, 255, 0, 0.075)';
	}

	return 'transparent';
};

const getSpaceStrokeColor = (space: Space): string => {
	if (space.content.label === 'User') {
		return '#888';
	}

	return '#333';
};

const startPainting = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	continiousLoop: boolean,
	showBoard: boolean,
	showBeings: boolean
): void => {
	const lineWidth = 1;

	const loop = () => {
		if (continiousLoop) {
			window.requestAnimationFrame(loop);
		}

		const $assets = get(assets);
		const $sprites = get(sprites);
		const $user = get(user);
		const $visibleSpaces = get(visibleSpaces);

		// Clear it
		ctx.clearRect(0, 0, width, height);

		// Canvas settings
		ctx.lineWidth = lineWidth;

		$visibleSpaces.forEach((space: Space) => {
			const rowsFromUser = space.row - $user.row;
			const columnsFromUser = space.column - $user.column;

			if (showBoard && space.content.spriteId) {
				// Only paint none animated spaces
				return;
			}

			if (showBeings && !space.content.spriteId) {
				// Only paint animated spaces
				return;
			}

			const userY = Math.floor(height / 2 - spaceWidth / 2);
			const userX = Math.floor(width / 2 - spaceWidth / 2);
			const top = userY + rowsFromUser * spaceWidth;
			const left = userX + columnsFromUser * spaceWidth;

			ctx.fillStyle = getSpaceBackgroundColor(space, $user);
			ctx.strokeStyle = getSpaceStrokeColor(space);

			if (space.content.spriteId || space.content.tileId) {
				// Draw rectangle
				ctx.beginPath();
				ctx.rect(left, top, spaceWidth, spaceWidth);
				ctx.fill();
				ctx.stroke();
			}

			// Add sprite
			if (space.content.spriteId) {
				const sprite = $sprites[space.content.spriteId];
				const dx = left + sprite.leftMargin;
				const dy = top + sprite.topMargin;

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

			// Add tile
			if (space.content.tileId) {
				const tileImage = $assets.tiles.find((tile) => tile.id === space.content.tileId);

				if (tileImage) {
					ctx.drawImage(tileImage.image, left + 1, top + 1);
				}
			}
		});
	};

	window.requestAnimationFrame(loop);
};

export const paintBoard = async (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
): Promise<void> => {
	const continiousLoop = false;
	const showBoard = true;
	const showBeings = false;

	startPainting(ctx, width, height, continiousLoop, showBoard, showBeings);
};

export const paintAnimatedSpaces = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
): void => {
	const continiousLoop = true;
	const showBoard = false;
	const showBeings = true;

	startPainting(ctx, width, height, continiousLoop, showBoard, showBeings);
};
