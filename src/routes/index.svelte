<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Board from '$lib/Board.svelte';
	import Inventory from '$lib/Inventory.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Game</title>
</svelte:head>

<section>
	<Inventory />
	<Board />
</section>

<style>
	section {
		display: block;
		margin: 0 auto;
	}
</style>
