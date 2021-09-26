import type { DialogContent } from '../../types';
import { screen } from '$stores/screen';
import { get } from 'svelte/store';
import { fillTextWordWrap } from './';

const paintDialog = async (
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
				fillTextWordWrap(ctx, content.text.substr(0, currentLetter), x, y, 20, width);

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

export default paintDialog;
