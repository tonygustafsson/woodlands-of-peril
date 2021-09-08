<script lang="ts">
	import { onMount } from 'svelte';
	import type { Stuff, Space as SpaceType } from '../types';
	import { spaces } from '../stores/spaces';
	import {
		emptyIcon,
		userIcon,
		surroundings,
		unusualStuff,
		numberOfSpaces,
		spaceWidth,
		spacesPerRow
	} from '../constants';
	import { randomInArray } from '../utils/array';
	import Space from './Space.svelte';

	const cssVariableStyle = `
        --space-width: ${spaceWidth}px;
        --spaces-per-row: ${spacesPerRow};
        --font-size: ${Math.floor(spaceWidth * 0.6)}px;
		--space-border: #0f0f0f;
    `;

	$: userPosition = 0;

	const go = (direction) => {
		let newUserPosition = userPosition;

		if (direction === 'up') {
			newUserPosition = userPosition - spacesPerRow;
		} else if (direction === 'down') {
			newUserPosition = userPosition + spacesPerRow;
		} else if (direction === 'left') {
			newUserPosition = userPosition - 1;
		} else if (direction === 'right') {
			newUserPosition = userPosition + 1;
		}

		if (newUserPosition !== userPosition && !$spaces[newUserPosition].icon.solid) {
			$spaces[userPosition].icon = emptyIcon;
			$spaces[userPosition].background = 'default';
			delete $spaces[userPosition].effect;
			$spaces[newUserPosition].icon = userIcon;
			$spaces[newUserPosition].background = 'highlight';
			userPosition = newUserPosition;
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
		const newSpaces = [];

		for (let x = 0; x < numberOfSpaces; x++) {
			let icon: Stuff = emptyIcon;

			if (Math.random() > 0.85) {
				icon = randomInArray(surroundings);
			} else if (Math.random() > 0.97) {
				icon = randomInArray(unusualStuff);
			}

			const newSpace: SpaceType = {
				id: x,
				icon: icon,
				background: 'default'
			};

			newSpaces.push(newSpace);
		}

		spaces.set(newSpaces);

		while (userPosition === 0) {
			const randomSpace = randomInArray($spaces);

			if (randomSpace.icon.content !== '') {
				continue;
			}

			const newSpace: SpaceType = {
				id: randomSpace.id,
				icon: userIcon,
				background: 'highlight',
				effect: 'zoomOut'
			};

			userPosition = randomSpace.id;
			spaces.setSpace(randomSpace.id, newSpace);
		}
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
