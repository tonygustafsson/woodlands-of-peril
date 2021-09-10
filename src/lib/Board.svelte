<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceCreator } from '../utils/spaceCreator';
	import { positionCreator } from '../utils/positionCreator';
	import { spaces } from '../stores/spaces';
	import { numberOfSpaces, spaceWidth, spacesPerRow } from '../constants';
	import { move } from '../utils/move';
	import type { Space as SpaceType } from '../types';
	import { user } from '../stores/user';
	import { getBoardPosition } from '../utils/board';

	const keyDownTimer = null;
	let canvas;

	$: canvasWidth = spaceWidth * 23;
	$: canvasHeight = spaceWidth * 23;

	const handleKeydown = (e) => {
		if (keyDownTimer) {
			return clearTimeout(keyDownTimer);
		}

		setTimeout(() => {
			switch (e.keyCode) {
				case 87:
					// W UP
					if (!move('up')) {
						clearTimeout(keyDownTimer);
					}
					break;
				case 83:
					// S Down
					if (!move('down')) {
						clearTimeout(keyDownTimer);
					}
					break;
				case 68:
					// D Right
					if (!move('right')) {
						clearTimeout(keyDownTimer);
					}
					break;
				case 65:
					// A Left
					if (!move('left')) {
						clearTimeout(keyDownTimer);
					}
					break;
			}
		}, 100);
	};

	const loop = () => {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let x = 0; x < numberOfSpaces; x++) {
			const space: SpaceType = $spaces[x];
			const spacePos = getBoardPosition(x);

			const rowsFromUser = spacePos.row - $user.row;
			const columnsFromUser = spacePos.column - $user.column;

			const userY = canvas.height / 2 - spaceWidth / 2;
			const userX = canvas.width / 2 - spaceWidth / 2;

			const top = userY + rowsFromUser * spaceWidth;
			const left = userX + columnsFromUser * spaceWidth;

			ctx.fillStyle = space.background === 'highlight' ? '#333' : '#000';
			ctx.strokeStyle = space.background === 'highlight' ? '#888' : '#333';

			ctx.beginPath();
			ctx.rect(left, top, spaceWidth, spaceWidth);
			ctx.fill();
			ctx.stroke();
			ctx.fillText(space.content.icon, left + 6, top + spaceWidth - 11);
		}
	};

	user.subscribe((value) => {
		loop();
	});

	onMount(async () => {
		console.log('start');
		await spaceCreator();
		console.log('Done created spaces');
		await positionCreator();
		console.log('Done positioned spaces');

		const ctx = canvas.getContext('2d');
		ctx.lineWidth = 1;
		ctx.font = '20px verdana';
		let frame = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<canvas
	style="margin-left: 300px; margin-top: 100px"
	width={canvasWidth}
	height={canvasHeight}
	bind:this={canvas}
/>
