<script>
	export let width = 24;
	export let height = 24;
	export let mr = false;
	export let ml = false;
	export let fill = '#000';
</script>

<svg
	class:ml
	class:mr
	{width}
	{height}
	{fill}
	xmlns="http://www.w3.org/2000/svg"
	xml:space="preserve"
	viewBox="0 0 24 24"
>
	<path d="M12 16c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3z" />
	<path
		d="M20.8 11.2A9 9 0 0 0 19.5 8 9 9 0 0 0 17 5.5a9 9 0 0 0-3.2-1.3A9 9 0 0 0 12 4V2L8 5l4 3V6l1.4.1a7 7 0 0 1 2.5 1 7 7 0 0 1 1.9 2A7 7 0 0 1 19 13a7 7 0 0 1-.6 2.7 7.1 7.1 0 0 1-.6 1.2 7.2 7.2 0 0 1-.9 1 7 7 0 0 1-3.5 2 7.1 7.1 0 0 1-2.8 0 7 7 0 0 1-2.5-1 7 7 0 0 1-1.9-2A7 7 0 0 1 5 13H3a9 9 0 0 0 1.5 5A9.1 9.1 0 0 0 7 20.5a9 9 0 0 0 5 1.5 9 9 0 0 0 1.8-.2 9 9 0 0 0 3.2-1.3 8.9 8.9 0 0 0 1.4-1.1 9.2 9.2 0 0 0 1-1.4 9 9 0 0 0 1.6-5 9 9 0 0 0-.2-1.8z"
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
