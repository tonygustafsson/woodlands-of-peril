<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceCreator } from '../utils/spaceCreator';
	import { positionCreator } from '../utils/positionCreator';
	import { spaces } from '../stores/spaces';
	import { position } from '../stores/position';
	import type { Space as SpaceType } from '../types';
	import { emptyIcon, userIcon, numberOfSpaces, spaceWidth, spacesPerRow } from '../constants';
	import Space from './Space.svelte';

	const cssVariableStyle = `
        --space-width: ${spaceWidth}px;
        --spaces-per-row: ${spacesPerRow};
        --font-size: ${Math.floor(spaceWidth * 0.6)}px;
		--space-border: #0f0f0f;
    `;

	const go = (direction) => {
		let newPosition = $position;

		if (direction === 'up') {
			newPosition = $position - spacesPerRow;
		} else if (direction === 'down') {
			newPosition = $position + spacesPerRow;
		} else if (direction === 'left') {
			newPosition = $position - 1;
		} else if (direction === 'right') {
			newPosition = $position + 1;
		}

		if (newPosition !== $position && !$spaces[newPosition].icon.solid) {
			const newOldSpace: SpaceType = {
				...$spaces[$position],
				icon: emptyIcon,
				background: 'default',
				effect: null
			};
			spaces.setSpace($position, newOldSpace);

			const newNewSpace: SpaceType = {
				...$spaces[newPosition],
				icon: userIcon,
				background: 'highlight',
				effect: null
			};
			spaces.setSpace(newPosition, newNewSpace);

			position.set(newPosition);
		}
	};

	const keyDownTimer = null;

	const handleKeydown = (e) => {
		if (keyDownTimer) {
			return clearTimeout(keyDownTimer);
		}

		setTimeout(() => {
			switch (e.keyCode) {
				case 87:
					// W UP
					go('up');
					break;
				case 83:
					// S Down
					go('down');
					break;
				case 68:
					// D Right
					go('right');
					break;
				case 65:
					// A Left
					go('left');
					break;
			}
		}, 100);
	};

	onMount(() => {
		spaceCreator();
		positionCreator();
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<table class="board" style={cssVariableStyle}>
	{#if $spaces.length > 0}
		{#each Array(numberOfSpaces / spacesPerRow) as _, rowId}
			<tr width={spaceWidth * spacesPerRow} height={spaceWidth}>
				{#each Array(spacesPerRow) as _, spaceId}
					<Space space={$spaces[rowId * spacesPerRow + spaceId]} />
				{/each}
			</tr>
		{/each}
	{/if}
</table>

<style>
	.board {
		table-layout: fixed;
		width: calc(var(--space-width) * var(--spaces-per-row));
	}
</style>
