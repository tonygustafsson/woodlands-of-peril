<script lang="ts">
	import { onMount } from 'svelte';
	import { handleKeydown } from '../utils/move';
	import { spaceWidth } from '../constants';
	import { paintBoard, paintAnimatedSpaces } from '../utils/paint';
	import { user } from '../stores/user';
	import { canvas } from '../stores/canvas';
	import { visibleSpaces } from '../stores/visibleSpaces';

	let canvasBoard;
	let canvasBeings;

	onMount(() => {
		const canvasWidth =
			document.body.clientWidth < 600
				? document.body.clientWidth
				: Math.floor(document.body.clientWidth * 0.7);
		const canvasHeight =
			document.body.clientWidth < 600
				? document.body.clientHeight
				: Math.floor(document.body.clientHeight * 0.7);

		const cameraSpacesWidth = Math.floor(canvasWidth / spaceWidth);
		const cameraSpacesHeight = Math.floor(canvasHeight / spaceWidth);

		canvas.set({
			width: canvasWidth,
			height: canvasHeight,
			cameraSpacesWidth,
			cameraSpacesHeight
		});

		// Create animation loop
		paintAnimatedSpaces(canvasBeings);

		user.subscribe(() => {
			visibleSpaces.locateAndSave($user.row, $user.column);

			paintBoard(canvasBoard);
		});
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container" style={`width: ${$canvas.width}px`}>
	<canvas width={$canvas.width} height={$canvas.height} bind:this={canvasBoard} />
	<canvas width={$canvas.width} height={$canvas.height} bind:this={canvasBeings} />
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
