<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceWidth } from '../constants';
	import { paintBoard, paintSprites, paintDialog } from '$utils/paint';
	import { user } from '$stores/user';
	import { audio } from '$stores/audio';
	import { dialog } from '$stores/dialogs';
	import { canvas as canvasStore } from '$stores/canvas';
	import { visibleSpaces } from '$stores/visibleSpaces';
	import { styleToString } from '$utils/styleToString';

	let canvasBoard: HTMLCanvasElement;
	let canvasSprites: HTMLCanvasElement;
	let canvasDialog: HTMLCanvasElement;

	$: containerStyle = {
		width: `${$canvasStore.width}px`,
		height: `${$canvasStore.height}px`,
		backgroundImage: "url('/background.jpg')",
		backgroundPositionX: `-${$user.column * spaceWidth}px`,
		backgroundPositionY: `-${$user.row * spaceWidth}px`
	};

	const triggerDialogAction = () => {
		$dialog.actions[0].action();
	};

	onMount(() => {
		const canvasWidth =
			document.body.clientWidth <= 1300
				? document.body.clientWidth
				: Math.floor(document.body.clientWidth * 0.8);
		const canvasHeight =
			document.body.clientWidth <= 1300
				? document.body.clientHeight
				: Math.floor(document.body.clientHeight * 0.8);

		const cameraSpacesWidth = Math.floor(canvasWidth / spaceWidth);
		const cameraSpacesHeight = Math.floor(canvasHeight / spaceWidth);

		canvasStore.set({
			width: canvasWidth,
			height: canvasHeight,
			cameraSpacesWidth,
			cameraSpacesHeight,
			boardContext: canvasBoard.getContext('2d'),
			spriteContext: canvasSprites.getContext('2d'),
			dialogContext: canvasDialog.getContext('2d')
		});

		// Create animation loop
		paintSprites($canvasStore.spriteContext, canvasWidth, canvasHeight);

		// Paint welcome dialog
		dialog.set({
			visible: true,
			title: 'Welcome to Woodlands of Peril',
			text:
				"This is a game where you explore the woodlands. You'll look for treasure and fight enemies. You control the caracter by using the keyboard (WASD) or by touching the controls in the right bottom corner on mobile.",
			actions: [
				{
					cta: true,
					label: 'Begin',
					action: () => {
						dialog.clear();
						audio.toggleMusic();
						audio.toggleSoundEffects();
					}
				}
			]
		});

		user.subscribe(() => {
			visibleSpaces.locateAndSave($user.row, $user.column);

			paintBoard($canvasStore.boardContext, canvasWidth, canvasHeight);
		});
	});
</script>

<div class="container" style={styleToString(containerStyle)} on:click={triggerDialogAction}>
	<canvas width={$canvasStore.width} height={$canvasStore.height} bind:this={canvasBoard} />
	<canvas width={$canvasStore.width} height={$canvasStore.height} bind:this={canvasSprites} />
	<canvas width={$canvasStore.width} height={$canvasStore.height} bind:this={canvasDialog} />
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

	canvas:nth-child(1) {
		z-index: 1;
	}

	canvas:nth-child(2) {
		z-index: 2;
	}

	canvas:nth-child(3) {
		z-index: 3;
	}

	@media (max-width: 1300px) {
		.container {
			margin: 0 auto;
		}
	}
</style>
