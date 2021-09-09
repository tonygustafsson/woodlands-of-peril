<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceCreator } from '../utils/spaceCreator';
	import { positionCreator } from '../utils/positionCreator';
	import { spaces } from '../stores/spaces';
	import { numberOfSpaces, spaceWidth, spacesPerRow } from '../constants';
	import Space from './Space.svelte';
	import { move } from '../utils/move';

	const cssVariableStyle = `
        --space-width: ${spaceWidth}px;
        --spaces-per-row: ${spacesPerRow};
        --font-size: ${Math.floor(spaceWidth * 0.6)}px;
		--space-border: #0f0f0f;
    `;

	const keyDownTimer = null;

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
