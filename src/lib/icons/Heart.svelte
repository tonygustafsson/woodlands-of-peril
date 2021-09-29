<script>
	import { theme } from '../../stores';

	export let width = 24;
	export let height = 24;
	export let stroke = $theme.grey;
	export let fill = $theme.pink;
	export let filled = true;
	export let mr = false;
	export let ml = false;
</script>

<svg
	class:ml
	class:mr
	xmlns="http://www.w3.org/2000/svg"
	xml:space="preserve"
	style="enable-background:new 0 0 512.002 512.002"
	viewBox="0 0 512 512"
	{width}
	{height}
>
	{#if filled}
		<path
			d="M54 272.5a141 141 0 0 1 99.6-240.3c33.5 0 66.2 12.4 92.1 35l10.3 9.6 10-9.3a139.9 139.9 0 0 1 192 5.9 141 141 0 0 1 0 199.1l-202 202-202-202z"
			{fill}
		/>
	{/if}

	<path
		d="M358.4 19.4c-36.8 0-73.3 13.7-102.4 40a153 153 0 0 0-211 5c-60 60-60 157.2 0 217.2l211 211 211-211A153.6 153.6 0 0 0 358.4 19.4zm90.5 244.1L256 456.5l-193-193A128.2 128.2 0 0 1 153.7 45c31.2 0 60.4 11.6 83.7 31.9L256 94.4l18.7-17.5A126.7 126.7 0 0 1 449 82.5a128.2 128.2 0 0 1 0 181z"
		fill={stroke}
	/>
</svg>

<style>
	.ml {
		margin-left: 0.5em;
	}
	.mr {
		margin-right: 0.5em;
	}
</style>
