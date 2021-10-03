<script lang="ts">
	import { theme } from '../../stores';

	export let width = 24;
	export let height = 24;
	export let mr = false;
	export let ml = false;
	export let direction: 'right' | 'left' | 'up' | 'down' = 'right';

	let transform = '';

	switch (direction) {
		case 'right':
			transform = 'rotate(90, 150, 150)';
			break;
		case 'left':
			transform = 'rotate(-90, 150, 150)';
			break;
		case 'down':
			transform = 'rotate(180, 150, 150)';
			break;
		default:
			transform = '';
	}
</script>

<svg
	class:ml
	class:mr
	xmlns="http://www.w3.org/2000/svg"
	xml:space="preserve"
	viewBox="0 0 300 300"
	{width}
	{height}
>
	<g {transform} fill={$theme.pink} fill-opacity="0.6">
		<path
			d="M150 0a150 150 0 1 0 0 300 150 150 0 0 0 0-300zm67.7 189.8a14 14 0 0 1-19.8 0l-48.3-48.3-48.5 48.5a14 14 0 0 1-19.8-19.8l56.3-56.3a14 14 0 0 1 12-6.4 14 14 0 0 1 12 6.4l56 56a14 14 0 0 1 0 19.9z"
		/>
	</g>
</svg>

<style>
	.ml {
		margin-left: 0.5em;
	}
	.mr {
		margin-right: 0.5em;
	}
</style>
