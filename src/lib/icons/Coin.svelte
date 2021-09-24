<script>
	export let width = 24;
	export let height = 24;
	export let stroke = '#fbd490';
	export let fill = '#f0c419';
	export let mr = false;
	export let ml = false;
</script>

<svg
	class:ml
	class:mr
	xmlns="http://www.w3.org/2000/svg"
	xml:space="preserve"
	viewBox="0 0 44 44"
	{width}
	{height}
>
	<path d="M22 44a22 22 0 1 1 0-44 22 22 0 0 1 0 44z" {fill} />
	<path
		d="M22.7 32h-1.4C20 32 19 31 19 29.7V13.3c0-1.3 1-2.3 2.3-2.3h1.4c1.3 0 2.3 1 2.3 2.3v16.4c0 1.3-1 2.3-2.3 2.3z"
		fill={stroke}
	/>
	<path d="M22 44a22 22 0 1 1 0-44 22 22 0 0 1 0 44z" {fill} />
	<path
		d="M22.7 32h-1.4C20 32 19 31 19 29.7V13.3c0-1.3 1-2.3 2.3-2.3h1.4c1.3 0 2.3 1 2.3 2.3v16.4c0 1.3-1 2.3-2.3 2.3z"
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
