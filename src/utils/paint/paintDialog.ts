import type { DialogContent } from '../../types';
import { screen } from '$stores/screen';
import { canvas } from '$stores/canvas';
import { get } from 'svelte/store';
import { fillTextWordWrap } from './';
import { dialog } from '$stores/dialogs';

let dialogVisible = false;

const clearDialog = () => {
	const $canvas = get(canvas);
	const ctx = $canvas.dialogContext;

	if (ctx) {
		ctx.clearRect(0, 0, $canvas.width, $canvas.height);
	}
};

const paintDialog = async (content: DialogContent): Promise<void> => {
	const $screen = get(screen);
	const $canvas = get(canvas);

	const ctx = $canvas.dialogContext;

	const backDropColor = 'rgba(0, 0, 0, 0.5)';
	const dialogWidth = $screen.size === 'sm' ? 360 : 600;
	const dialogHeight = 300;
	const dialogLeft = Math.floor($canvas.width / 2 - dialogWidth / 2);
	const dialogTop = Math.floor($canvas.height / 2 - dialogHeight / 2) - 40;
	const dialogBackgroundColor = '#000';
	const dialogBorderColor = '#2e1500';
	const dialogFontFamily = 'Trebuchet MS';
	const dialogFontSize = '16px';
	const dialogHeadingFontSize = $screen.size === 'sm' ? '22px' : '32px';
	const dialogButtonFontSize = '24px';
	const dialogTextColor = '#ddd';

	let currentDialogHeight = 0;

	const animateDialogRollDown = () =>
		new Promise((resolve) => {
			const loop = (timestamp: number, resolve: (value: unknown) => void) => {
				if (currentDialogHeight > dialogHeight) {
					return resolve('Done');
				}

				// Clear it
				ctx.clearRect(0, 0, $canvas.width, $canvas.height);
				ctx.fillStyle = backDropColor;
				ctx.fillRect(0, 0, $canvas.width, $canvas.height);

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
				const button = new Path2D();
				button.rect(x, y, width, height);
				ctx.strokeStyle = dialogBorderColor;
				ctx.lineWidth = 6;
				ctx.stroke(button);
				ctx.fillStyle = '#000';
				ctx.fill(button);

				dialog.setButtonPath(button);

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

dialog.subscribe(($dialog) => {
	if ($dialog.visible && !dialogVisible) {
		paintDialog($dialog);
		dialogVisible = true;
	} else if (!$dialog.visible && dialogVisible) {
		clearDialog();
		dialogVisible = false;
	}
});

export default paintDialog;
