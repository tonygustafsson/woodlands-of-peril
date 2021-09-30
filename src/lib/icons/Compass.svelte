<script>
	export let width = 24;
	export let height = 24;
	export let mr = false;
	export let ml = false;
	export let fillOuterRing = '#f8c660';
	export let backFill = '#fff';
	export let pointerFill = '#ff0000';
</script>

<svg
	class:ml
	class:mr
	xmlns="http://www.w3.org/2000/svg"
	xml:space="preserve"
	{width}
	{height}
	viewBox="0 0 512 512"
>
	<circle cx="256" cy="256" r="245.8" fill={fillOuterRing} />
	<circle cx="256" cy="256" r="170.3" fill={backFill} />
	<path d="M295.8 256 256 382.5 216.2 256 256 129.5z" fill={pointerFill} />
	<path
		d="M256 436.5c-99.5 0-180.5-81-180.5-180.5S156.5 75.5 256 75.5s180.5 81 180.5 180.5-81 180.5-180.5 180.5zM256 96c-88.3 0-160.1 71.8-160.1 160.1S167.7 416.1 256 416.1 416.1 344.3 416.1 256 344.3 95.9 256 95.9z"
	/>
	<path
		d="M256 392.7c-4.5 0-8.4-3-9.7-7.2l-39.8-126.4c-.6-2-.6-4.2 0-6.2l39.8-126.4a10.2 10.2 0 0 1 19.4 0l39.8 126.4c.6 2 .6 4.2 0 6.2l-39.8 126.4a10.2 10.2 0 0 1-9.7 7.2zM227 256l29 92.5 29-92.5-29-92.5-29 92.5zM139.7 266.2h-18.3a10.2 10.2 0 0 1 0-20.4h18.3a10.2 10.2 0 0 1 0 20.4zM390.6 266.2h-18.3a10.2 10.2 0 0 1 0-20.4h18.3a10.2 10.2 0 0 1 0 20.4zM347.8 74.9c-1.5 0-3-.3-4.4-1-9.7-4.7-19.8-8.6-30.1-11.6a10.2 10.2 0 0 1 5.8-19.6c11.3 3.4 22.5 7.7 33.1 12.8a10.2 10.2 0 0 1-4.4 19.4zM468.1 266.2c-5.6 0-10.2-4.6-10.2-10.2A202 202 0 0 0 388 103.2a10.2 10.2 0 1 1 13.4-15.4c48.9 42.3 77 103.6 77 168.2 0 5.6-4.6 10.2-10.3 10.2z"
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
