<script lang="ts">
	import { onMount } from 'svelte';
	import { handleKeydown } from '../utils/move';
	import { spaceWidth } from '../constants';
	import { paintBoard, paintAnimatedSpaces } from '../utils/paint';
	import { user } from '../stores/user';
	import { canvas as canvasStore } from '../stores/canvas';
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

		canvasStore.set({
			width: canvasWidth,
			height: canvasHeight,
			cameraSpacesWidth,
			cameraSpacesHeight
		});

		// Create animation loop
		const ctx = canvasBeings.getContext('2d');
		paintAnimatedSpaces(ctx, canvasWidth, canvasHeight);

		user.subscribe(() => {
			visibleSpaces.locateAndSave($user.row, $user.column);

			const ctx = canvasBoard.getContext('2d');
			paintBoard(ctx, canvasWidth, canvasHeight);
		});
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="container" style={`width: ${$canvasStore.width}px`}>
	<canvas
		style={`
			background-image: url('/background.jpg');
			background-position-x: -${$user.column * spaceWidth}px;
			background-position-y: -${$user.row * spaceWidth}px
		`}
		width={$canvasStore.width}
		height={$canvasStore.height}
		bind:this={canvasBoard}
	/>
	<canvas width={$canvasStore.width} height={$canvasStore.height} bind:this={canvasBeings} />
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
