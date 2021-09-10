<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceCreator } from '../utils/spaceCreator';
	import { positionCreator } from '../utils/positionCreator';
	import { spaceWidth } from '../constants';
	import { handleKeydown } from '../utils/move';
	import { paint } from '../utils/paint';

	let canvas;

	$: canvasWidth = 0;
	$: canvasHeight = 0;
	$: cameraSpacesWidth = 0;
	$: cameraSpacesHeight = 0;

	onMount(() => {
		spaceCreator();
		positionCreator();

		canvasWidth =
			document.body.clientWidth < 600
				? document.body.clientWidth
				: Math.floor(document.body.clientWidth * 0.7);
		canvasHeight =
			document.body.clientWidth < 600
				? document.body.clientHeight
				: Math.floor(document.body.clientHeight * 0.7);
		cameraSpacesWidth = Math.floor(canvasWidth / spaceWidth);
		cameraSpacesHeight = Math.floor(canvasHeight / spaceWidth);

		paint(canvas, cameraSpacesWidth, cameraSpacesHeight);
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<canvas width={canvasWidth} height={canvasHeight} bind:this={canvas} />

<style>
	canvas {
		display: block;
		margin: 40px auto;
	}

	@media (max-width: 600px) {
		canvas {
			margin: 0 auto;
		}
	}
</style>
