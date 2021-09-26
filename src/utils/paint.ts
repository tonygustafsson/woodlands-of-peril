import { spaceWidth } from '../constants';
import type { Space, User } from '../types';
import { visibleSpaces } from '$stores/visibleSpaces';
import { user } from '$stores/user';
import { get } from 'svelte/store';
import sprites from '$stores/sprites';
import assets from '$stores/assets';
import { screen } from '$stores/screen';

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

export const paintSprites = (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number
): void => {
	const continiousLoop = true;
	const showBoard = false;
	const showBeings = true;

	startPainting(ctx, width, height, continiousLoop, showBoard, showBeings);
};

type DialogContent = {
	title: string;
	text: string;
	actions: {
		cta?: boolean;
		label: string;
		action: () => void;
	}[];
};

export const printAtWordWrap = (
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	lineHeight: number,
	fitWidth = 0
): void => {
	if (fitWidth <= 0) {
		ctx.fillText(text, x, y);
		return;
	}

	let words = text.split(' ');
	let currentLine = 0;
	let idx = 1;

	while (words.length > 0 && idx <= words.length) {
		const str = words.slice(0, idx).join(' ');
		const w = ctx.measureText(str).width;

		if (w > fitWidth) {
			if (idx == 1) {
				idx = 2;
			}
			ctx.fillText(words.slice(0, idx - 1).join(' '), x, y + lineHeight * (currentLine + 1));
			currentLine++;
			words = words.splice(idx - 1);
			idx = 1;
		}

		idx++;
	}
	if (idx > 0) ctx.fillText(words.join(' '), x, y + lineHeight * (currentLine + 1));
};

export const paintDialog = async (
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	content: DialogContent
): Promise<void> => {
	const $screen = get(screen);

	const dialogWidth = $screen.size === 'sm' ? 360 : 600;
	const dialogHeight = 300;
	const dialogLeft = Math.floor(width / 2 - dialogWidth / 2);
	const dialogTop = Math.floor(height / 2 - dialogHeight / 2);
	const dialogBackgroundColor = 'rgba(0, 0, 0, 0.9)';
	const dialogBorderColor = '#170d0b';
	const dialogFontFamily = 'Trebuchet MS';
	const dialogFontSize = '16px';
	const dialogHeadingFontSize = $screen.size === 'sm' ? '22px' : '32px';
	const dialogButtonFontSize = '24px';
	const dialogTextColor = '#fff';

	let currentDialogHeight = 0;

	const animateDialogRollDown = () =>
		new Promise((resolve) => {
			const loop = (timestamp: number, resolve: (value: unknown) => void) => {
				if (currentDialogHeight > dialogHeight) {
					return resolve('Done');
				}

				// Clear it
				ctx.clearRect(0, 0, width, height);

				ctx.fillStyle = dialogBackgroundColor;
				ctx.strokeStyle = dialogBorderColor;
				ctx.lineWidth = 6;

				// Create rectangle
				ctx.beginPath();
				ctx.rect(dialogLeft, dialogTop, dialogWidth, currentDialogHeight);
				ctx.fill();
				ctx.stroke();

				currentDialogHeight += 20;
				window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
			};

			window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
		});

	const animateDialogTitle = () =>
		new Promise((resolve) => {
			const width = dialogWidth - 40;
			const height = 40;
			const x = dialogLeft + 20;
			const y = dialogTop + 20;

			let currentLetter = 0;

			const loop = (timestamp: number, resolve: (value: unknown) => void) => {
				if (currentLetter > content.title.length) {
					return resolve('Done');
				}

				ctx.fillStyle = dialogBackgroundColor;
				ctx.clearRect(x, y, width, height);
				ctx.fillRect(x, y, width, height);

				ctx.font = `${dialogHeadingFontSize} ${dialogFontFamily}`;
				ctx.fillStyle = dialogTextColor;
				ctx.fillText(content.title.substr(0, Math.floor(currentLetter)), x, y + 30);

				currentLetter += 1;
				window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
			};

			window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
		});

	const animateDialogText = () =>
		new Promise((resolve) => {
			const width = dialogWidth - 40;
			const height = dialogHeight - 140;
			const x = dialogLeft + 20;
			const y = dialogTop + 70;

			let currentLetter = 0;

			const loop = (timestamp: number, resolve: (value: unknown) => void) => {
				if (currentLetter > content.text.length + 3) {
					return resolve('Done');
				}

				ctx.fillStyle = dialogBackgroundColor;
				ctx.clearRect(x, y, width, height);
				ctx.fillRect(x, y, width, height);

				ctx.font = `${dialogFontSize} ${dialogFontFamily}`;
				ctx.fillStyle = dialogTextColor;
				printAtWordWrap(ctx, content.text.substr(0, currentLetter), x, y, 20, width);

				currentLetter += 4;
				window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
			};

			window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
		});

	const addActionButton = () =>
		new Promise((resolve) => {
			const width = 200;
			const height = 60;
			const x = dialogLeft + dialogWidth / 2 - width / 2;
			const y = dialogTop + dialogHeight - 80;

			const loop = (timestamp: number, resolve: (value: unknown) => void) => {
				ctx.beginPath();
				ctx.rect(x, y, width, height);
				ctx.strokeStyle = dialogBorderColor;
				ctx.lineWidth = 6;
				ctx.stroke();
				ctx.fillStyle = '#000';
				ctx.fill();

				ctx.fillStyle = dialogTextColor;
				ctx.font = `${dialogButtonFontSize} ${dialogFontFamily}`;
				const textSize = ctx.measureText(content.actions[0].label.toUpperCase());
				ctx.fillText(
					content.actions[0].label.toUpperCase(),
					x + width / 2 - textSize.width / 2,
					y + height / 2 + 8
				);

				resolve('Done');
			};

			window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
		});

	await animateDialogRollDown();
	await animateDialogTitle();
	await animateDialogText();
	await addActionButton();
};
