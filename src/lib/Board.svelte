<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceCreator } from '../utils/spaceCreator';
	import { positionCreator } from '../utils/positionCreator';
	import { spaces } from '../stores/spaces';
	import { numberOfSpaces, spaceWidth, spacesPerRow } from '../constants';
	import Space from './Space.svelte';
	import { move } from '../utils/move';
	import type { Space as SpaceType } from '../types';
	import { user } from '../stores/user';

	const keyDownTimer = null;
	let canvas;

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
			const spaceY = Math.floor(x / spacesPerRow + 1);
			const spaceX = x - (spaceY - 1) * spacesPerRow + 1;

			const top = (spaceY - 1) * spaceWidth;
			const left = (spaceX - 1) * spaceWidth;

			ctx.fillStyle = space.background === 'highlight' ? '#333' : '#000';
			ctx.strokeStyle = space.background === 'highlight' ? '#888' : '#0f0f0f';

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
	width={spaceWidth * spacesPerRow}
	height={spaceWidth * (numberOfSpaces / spacesPerRow)}
	bind:this={canvas}
/>
