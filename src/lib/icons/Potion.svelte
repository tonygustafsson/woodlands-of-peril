<script>
	export let width = 24;
	export let height = 24;
	export let mr = false;
	export let ml = false;
	export let glassFill = '#cce8ff';
	export let liquidFill = '#d0706a';
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
	<path
		fill={glassFill}
		d="M417 247c-5 6-13 7-19 4-22-10-43-16-70-16-33 0-51 8-72 17-18 7-38 14-72 14-24 0-108-11-89-42 20-32 49-58 83-73V67a33 33 0 1 1 0-67h156a33 33 0 1 1 0 67v84c36 16 66 43 85 77 4 6 3 14-2 19z"
	/>
	<path
		fill={glassFill}
		d="M417 247c-5 6-13 7-19 4-22-10-43-16-70-16-33 0-51 8-72 17V0h78a33 33 0 1 1 0 67v84c36 16 66 43 85 77 4 6 3 14-2 19z"
	/>
	<path
		fill={liquidFill}
		d="M419 228c-3-6-7-7-12-9a189 189 0 0 0-158 0c-40 18-86 20-133-2-7-3-16 0-21 7a189 189 0 1 0 324 4z"
	/>
	<path
		fill={liquidFill}
		d="M445 323c0 104-85 189-189 189V216a185 185 0 0 1 151 3c5 2 9 3 12 9 17 28 26 61 26 95z"
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
