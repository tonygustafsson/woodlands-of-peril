<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Board from '$lib/Board.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Game</title>
</svelte:head>

<section>
	<h1>Game</h1>

	<Board />
</section>

<style>
	h1 {
		text-align: center;
	}

	section {
		display: block;
		margin: 0 auto;
	}
</style>
