<script lang="ts">
	import Arrow from '$lib/icons/Arrow.svelte';
	import { move } from '../utils/move';
	import type { Direction } from '../types';

	$: isPressed = false;
	$: direction = 'right' as Direction;

	const onMouseDown = (dir: Direction) => {
		direction = dir;
		isPressed = true;
	};

	const onMouseUp = () => {
		isPressed = false;
	};

	setInterval(() => {
		if (isPressed) {
			move(direction);
		}
	}, 100);
</script>

<div
	class="control up"
	on:touchstart={() => onMouseDown('up')}
	on:mousedown={() => onMouseDown('up')}
	on:mouseup={onMouseUp}
	on:touchend={onMouseUp}
>
	<Arrow width={60} height={60} direction="up" />
</div>

<div
	class="control left"
	on:touchstart={() => onMouseDown('left')}
	on:mousedown={() => onMouseDown('left')}
	on:mouseup={onMouseUp}
	on:touchend={onMouseUp}
>
	<Arrow width={60} height={60} direction="left" />
</div>

<div
	class="control right"
	on:touchstart={() => onMouseDown('right')}
	on:mousedown={() => onMouseDown('right')}
	on:mouseup={onMouseUp}
	on:touchend={onMouseUp}
>
	<Arrow width={60} height={60} direction="right" />
</div>

<div
	class="control down"
	on:touchstart={() => onMouseDown('down')}
	on:mousedown={() => onMouseDown('down')}
	on:mouseup={onMouseUp}
	on:touchend={onMouseUp}
>
	<Arrow width={60} height={60} direction="down" />
</div>

<style>
	.control {
		position: fixed;
		z-index: 5;
	}

	.up {
		top: 0;
		left: calc(50% - 20px);
	}

	.right {
		top: calc(50% - 100px);
		right: 0;
	}

	.left {
		top: calc(50% - 100px);
		left: 0;
	}

	.down {
		bottom: 0;
		left: calc(50% - 20px);
	}
</style>
