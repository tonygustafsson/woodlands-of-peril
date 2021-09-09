<script lang="ts">
	import { onMount } from 'svelte';
	import { spaceWidth } from '../constants';
	import type { Space as SpaceType } from '../types';

	export let space: SpaceType;

	let spaceNode;

	onMount(() => {
		if (space.effect === 'zoomOut' && spaceNode) {
			spaceNode.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center'
			});
		}
	});
</script>

<td
	width={spaceWidth}
	height={spaceWidth}
	class="space"
	class:highlight={space.background === 'highlight'}
	class:zoomOut={space.effect === 'zoomOut'}
	class:eatable={space.content.eatable}
	class:enemy={space.content.enemy}
	title={space.content.label || null}
	bind:this={spaceNode}
>
	{space.content.icon}
</td>

<style>
	@keyframes zoomOut {
		from {
			transform: scale(50);
		}
		to {
			transform: scale(1.15);
		}
	}

	@keyframes enemy {
		0% {
			transform: translateX(-2px) translateY(-2px);
		}
		33% {
			transform: translateX(2px) translateY(-2px);
		}
		66% {
			transform: translateX(2px) translateY(2px);
		}
		100% {
			transform: translateX(-2px) translateY(2px);
		}
	}

	@keyframes eatable {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.2);
		}
	}

	.space {
		font-size: var(--font-size);
		border: 1px var(--space-border) solid;
		vertical-align: middle;
		text-align: center;
		user-select: none;
	}

	.space.highlight {
		background-color: #333;
		border: 1px #999 solid;
		transform: scale(1.15);
		z-index: 1000;
		position: relative;
	}

	.space.zoomOut {
		animation: zoomOut 1s;
	}

	.space.enemy {
		animation: enemy 2s infinite alternate;
	}

	.space.eatable {
		animation: eatable 200ms infinite alternate;
		animation-timing-function: cubic-bezier(0.65, 0.01, 1, 0.03);
	}
</style>
