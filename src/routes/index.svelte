<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Board from '$lib/Board.svelte';
	import InfoPanel from '$lib/InfoPanel.svelte';
	import Controls from '$lib/Controls.svelte';
	import EventToDialogMediator from '$lib/EventToDialogMediator.svelte';
	import { screen, assets } from '../stores';
	import '../theme.css';
	import '../app.css';

	onMount(() => {
		assets.fetch();
		screen.setScreenSize(document.body.clientWidth, document.body.clientHeight);
	});

	const onResize = (e: any) => {
		screen.setScreenSize(e.target.innerWidth, e.target.innerHeight);
	};
</script>

<svelte:head>
	<title>Woodlands of Peril</title>
</svelte:head>

<svelte:window on:resize={onResize} />

{#if $assets.done}
	<section>
		<Controls />
		<InfoPanel />
		<EventToDialogMediator />
		<Board />
	</section>
{:else}
	<div class="loading">
		<p>Loading game resources ...</p>
	</div>
{/if}

<style>
	section {
		display: flex;
		margin: 0 auto;
		flex-wrap: wrap;
	}

	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		font-size: 24px;
		text-align: center;
	}

	@media screen and (min-width: 1300px) {
		section {
			flex-wrap: nowrap;
		}
	}
</style>
