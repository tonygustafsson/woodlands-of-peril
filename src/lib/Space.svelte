<script lang="ts">
	import { spaceWidth } from '../constants';
	import type { Space as SpaceType } from '../types';

	export let space: SpaceType;
</script>

<td
	width={spaceWidth}
	height={spaceWidth}
	class="space"
	class:highlight={space.background === 'highlight'}
	class:zoomOut={space.effect === 'zoomOut'}
	title={space.icon.label || null}
>
	{space.icon.content}
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
	}

	.space.zoomOut {
		animation: zoomOut 1s;
	}
</style>
