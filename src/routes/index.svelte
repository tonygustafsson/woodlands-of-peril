<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Board from '$lib/Board.svelte';
	import InfoPanel from '$lib/InfoPanel.svelte';
	import assets from '../stores/assets';
	import '../app.css';

	onMount(() => {
		assets.fetch();
	});
</script>

<svelte:head>
	<title>Game</title>
</svelte:head>

<section>
	{#if $assets.done}
		<InfoPanel />
		<Board />
	{:else}
		<p>Loading resources.</p>
	{/if}
</section>

<style>
	section {
		display: block;
		margin: 0 auto;
	}
</style>
