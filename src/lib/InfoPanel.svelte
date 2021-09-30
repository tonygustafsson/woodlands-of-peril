<script lang="ts">
	import { user, screen, theme, spaces } from '../stores';
	import AudioPanel from './AudioPanel.svelte';
	import AudioPlayer from './AudioPlayer.svelte';
	import MiniMap from './MiniMap.svelte';
	import Heart from '$lib/icons/Heart.svelte';
	import Coin from '$lib/icons/Coin.svelte';
	import Github from '$lib/icons/Github.svelte';
	import Compass from '$lib/icons/Compass.svelte';
	import Skull from '$lib/icons/Skull.svelte';
	import Chest from '$lib/icons/Chest.svelte';
	import Reset from '$lib/icons/Reset.svelte';
	import { slide } from 'svelte/transition';

	$: mobileMenuActive = false;

	const toggleMobileMenu = () => {
		mobileMenuActive = !mobileMenuActive;
	};

	const resetGame = () => {
		user.clearStorage();
		spaces.clearStorage();
		window.location.reload();
	};
</script>

<AudioPlayer />

{#if $screen.size === 'sm'}
	<div class="mobile-menu" on:click={toggleMobileMenu}>
		<div class="mobile-menu-item">
			<Chest mr /> Menu
		</div>

		<div class="mobile-menu-item"><Coin width={20} mr /> {$user.inventory.money}</div>

		<div class="mobile-menu-item">
			{#if $user.alive}
				{#each Array($user.inventory.energy) as _}
					<Heart />
				{/each}
				{#each Array(5 - $user.inventory.energy) as _}
					<Heart filled={false} />
				{/each}
			{:else}
				<div class="mobile-menu-item"><Skull mr /> <strong>DEAD</strong></div>
			{/if}
		</div>
	</div>
{/if}

{#if $screen.size !== 'sm' || mobileMenuActive}
	<div class="menu" transition:slide={{ duration: 200 }}>
		{#if $screen.size !== 'sm'}
			{#if $user.alive}
				<div class="item">
					{#each Array($user.inventory.energy) as _}
						<Heart />
					{/each}
					{#each Array(5 - $user.inventory.energy) as _}
						<Heart filled={false} />
					{/each}
				</div>
			{:else}
				<div class="item"><Skull mr /> <strong>DEAD</strong></div>
			{/if}

			<div class="item"><Coin mr /> {$user.inventory.money}</div>
		{/if}

		<div class="item">
			<Compass mr />
			{$user.row} x {$user.column}
		</div>

		<div class="item">
			<MiniMap />
		</div>

		<AudioPanel />

		<a href="/reset" on:click|preventDefault={resetGame} class="item item--extra-spacing">
			<Reset fill={$theme.pink} mr /> Start over
		</a>

		<a href="https://github.com/tonygustafsson/woodlands-of-peril" target="_blank" class="item">
			<Github fill={$theme.pink} mr /> Game info
		</a>
	</div>
{/if}

<style>
	.mobile-menu {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 8px;
	}

	.mobile-menu-item {
		display: flex;
		align-items: center;
	}

	.mobile-menu-item:nth-child(2) {
		margin-left: auto;
		margin-right: 8px;
	}

	.menu {
		width: 200px;
		padding: 0.5em;
		border-radius: 8px;
		z-index: 4;
	}

	@media screen and (max-width: 1300px) {
		.menu {
			position: fixed;
			width: 100%;
			top: 40px;
			background-color: rgba(0, 0, 0, 0.8);
		}
	}

	.item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 0 0 1em 0;
	}

	.item--extra-spacing {
		margin-top: 3em;
	}

	a {
		color: #fff;
		text-decoration: none;
	}
</style>
