<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceCreator } from '../utils/spaceCreator';
	import { positionCreator } from '../utils/positionCreator';
	import { spaceWidth } from '../constants';
	import { handleKeydown } from '../utils/move';
	import { user } from '../stores/user';
	import { paint } from '../utils/paint';

	const keyDownTimer = null;
	let canvas;

	$: canvasWidth = 0;
	$: canvasHeight = 0;
	$: cameraSpacesWidth = 0;
	$: cameraSpacesHeight = 0;

	user.subscribe(() => {
		paint(canvas, cameraSpacesWidth, cameraSpacesHeight);
	});

	onMount(async () => {
		spaceCreator();
		positionCreator();

		canvasWidth = document.body.clientWidth;
		canvasHeight = document.body.clientHeight;
		cameraSpacesWidth = Math.floor(canvasWidth / spaceWidth);
		cameraSpacesHeight = Math.floor(canvasHeight / spaceWidth);

		const frame = requestAnimationFrame(() => paint(canvas, cameraSpacesWidth, cameraSpacesHeight));

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<canvas width={canvasWidth} height={canvasHeight} bind:this={canvas} />
