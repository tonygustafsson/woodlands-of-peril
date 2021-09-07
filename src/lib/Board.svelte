<script lang="ts">
	import { onMount } from 'svelte';

	$: spaces = [];

	onMount(() => {
		const newSpaces = [];
		const stuff = ['🌲', '🌳', '🌴', '🌵', '🍒', '🪨'];

		for (let x = 0; x < 8000; x++) {
			if (Math.random() > 0.9) {
				newSpaces.push({
					content: stuff[Math.floor(Math.random() * stuff.length)]
				});
			}

			newSpaces.push({
				content: ''
			});
		}

		spaces = newSpaces;
	});
</script>

<div class="board">
	{#each spaces as space}
		<div class="space">
			{space.content}
		</div>
	{/each}
</div>

<style>
	:global(:root) {
		--space-width: 24px;
		--font-size: calc(var(--space-width) * 0.6);
		--space-border: #0f0f0f;
	}
	.board {
		width: calc(var(--space-width) * 100);
	}

	.space {
		width: var(--space-width);
		height: var(--space-width);
		font-size: var(--font-size);
		border: 1px var(--space-border) solid;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left;
		user-select: none;
	}
</style>
