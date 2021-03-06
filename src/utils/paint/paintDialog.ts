import type { DialogContent } from '../../types';
import { get, screen, canvas, dialog, user, theme, sprites } from '../../stores';
import { fillTextWordWrap } from './';
import { sleep } from '$utils/sleep';
import { getDiceResult } from '$utils/random';

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
	const $theme = get(theme);

	const ctx = $canvas.dialogContext;

	if (!ctx) {
		return;
	}

	const backDropColor = 'rgba(0, 0, 0, 0.5)';
	const dialogWidth = $screen.size === 'sm' ? 360 : 600;
	const dialogHeight = 300;
	const dialogLeft = Math.floor($canvas.width / 2 - dialogWidth / 2);
	const dialogTop = Math.floor($canvas.height / 2 - dialogHeight / 2) - 40;
	const dialogBackgroundColor = '#000';
	const dialogBorderColor = $theme.brown;
	const dialogButtonBorderColor = $theme.brown;
	const dialogButtonWidth = $screen.size === 'sm' ? 140 : 200;
	const dialogButtonHeight = $screen.size === 'sm' ? 40 : 60;
	const dialogCtaButtonBorderColor = $theme.brownGolden;
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

	const addActionButtons = () =>
		new Promise((resolve) => {
			const width = dialogButtonWidth;
			const height = dialogButtonHeight;
			const buttonMargin = 20;
			const buttonAreaWidth = (width + buttonMargin) * content.actions.length;
			const buttonAreaX = dialogLeft + (dialogWidth - buttonAreaWidth) / 2;

			const loop = (timestamp: number, resolve: (value: unknown) => void) => {
				for (let i = 0; i < content.actions.length; i++) {
					const action = content.actions[i];
					const button = new Path2D();
					const x = buttonAreaX + (width + buttonMargin) * i + buttonMargin / 2;
					const y = dialogTop + dialogHeight - 80;

					button.rect(x, y, width, height);
					ctx.strokeStyle = action.cta ? dialogCtaButtonBorderColor : dialogButtonBorderColor;
					ctx.lineWidth = 6;
					ctx.stroke(button);
					ctx.fillStyle = '#000';
					ctx.fill(button);

					dialog.setButtonPath(i, button);

					ctx.fillStyle = dialogTextColor;
					ctx.font = `${dialogButtonFontSize} ${dialogFontFamily}`;
					const textSize = ctx.measureText(action.label.toUpperCase());
					ctx.fillText(
						action.label.toUpperCase(),
						x + width / 2 - textSize.width / 2,
						y + height / 2 + 8
					);
				}

				resolve('Done');
			};

			window.requestAnimationFrame((timestamp) => loop(timestamp, resolve));
		});

	await animateDialogRollDown();
	await animateDialogTitle();
	await animateDialogText();
	await addActionButtons();
};

const paintDialogDices = async (mode: 'user' | 'enemy') => {
	const $screen = get(screen);
	const $canvas = get(canvas);
	const $user = get(user);

	const ctx = $canvas.dialogContext;

	const dialogWidth = $screen.size === 'sm' ? 360 : 600;
	const dialogHeight = 300;
	const dialogLeft = Math.floor($canvas.width / 2 - dialogWidth / 2);
	const dialogTop = Math.floor($canvas.height / 2 - dialogHeight / 2) - 40;

	return new Promise((resolve) => {
		let x = 0;

		if ($screen.size === 'sm') {
			x = mode === 'user' ? dialogLeft + 70 : dialogLeft + 230;
		} else {
			x = mode === 'user' ? dialogLeft + 160 : dialogLeft + 380;
		}

		const y = dialogTop + 120;

		const $sprites = get(sprites);
		const sprite = $sprites['dice'];

		// Spin dice
		const diceAnimationTimer = setInterval(() => {
			ctx.drawImage(
				sprite.image,
				sprite.sw * (getDiceResult() - 1),
				sprite.sy,
				sprite.sw,
				sprite.sh,
				x,
				y,
				sprite.dw,
				sprite.dh
			);
		}, 75);

		// Show result
		setTimeout(async () => {
			clearInterval(diceAnimationTimer);

			const sw =
				mode === 'user'
					? sprite.sw * ($user.dieLastResult.user - 1)
					: sprite.sw * ($user.dieLastResult.enemy - 1);

			ctx.drawImage(sprite.image, sw, sprite.sy, sprite.sw, sprite.sh, x, y, sprite.dw, sprite.dh);

			// Show the dice result for a while
			await sleep(1000);

			// Done, keep on with what happens next
			resolve('Done');
		}, 1000);
	});
};

const paintUserDices = async () => {
	await paintDialogDices('user');
	await paintDialogDices('enemy');
};

dialog.subscribe(($dialog) => {
	if ($dialog.visible && !dialogVisible) {
		paintDialog($dialog);
		dialogVisible = true;
	} else if (!$dialog.visible && dialogVisible) {
		clearDialog();
		dialogVisible = false;
	}

	if ($dialog.rollingDice) {
		paintUserDices();
	}
});

export default paintDialog;
