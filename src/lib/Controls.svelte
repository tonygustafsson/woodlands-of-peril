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
		bottom: 100px;
		right: 60px;
	}

	.right {
		bottom: 52px;
		right: 4px;
	}

	.left {
		bottom: 52px;
		right: 114px;
	}

	.down {
		bottom: 4px;
		right: 60px;
	}
</style>
