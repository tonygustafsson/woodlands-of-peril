<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceCreator } from '../utils/spaceCreator';
	import { positionCreator } from '../utils/positionCreator';
	import { spaceWidth } from '../constants';
	import { handleKeydown } from '../utils/move';
	import { paintBoard, paintBeings } from '../utils/paint';
	import { user } from '../stores/user';

	let canvasBoard;
	let canvasBeings;

	$: canvasWidth = 0;
	$: canvasHeight = 0;
	$: cameraSpacesWidth = 0;
	$: cameraSpacesHeight = 0;

	user.subscribe((_) => {
		paintBoard(canvasBoard, cameraSpacesWidth, cameraSpacesHeight);
	});

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

		paintBoard(canvasBoard, cameraSpacesWidth, cameraSpacesHeight);
		paintBeings(canvasBeings, cameraSpacesWidth, cameraSpacesHeight);
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container" style={`width: ${canvasWidth}px`}>
	<canvas width={canvasWidth} height={canvasHeight} bind:this={canvasBoard} />
	<canvas width={canvasWidth} height={canvasHeight} bind:this={canvasBeings} />
</div>

<style>
	.container {
		position: relative;
		display: block;
		margin: 40px auto;
	}
	canvas {
		position: absolute;
		top: 0;
		left: 0;
	}

	@media (max-width: 600px) {
		.container {
			margin: 0 auto;
		}
	}
</style>
