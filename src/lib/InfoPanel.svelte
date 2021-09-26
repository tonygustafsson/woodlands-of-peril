<script lang="ts">
	import { user } from '$stores/user';
	import AudioPanel from './AudioPanel.svelte';
	import AudioPlayer from './AudioPlayer.svelte';
	import MiniMap from './MiniMap.svelte';
	import Heart from '$lib/icons/Heart.svelte';
	import Coin from '$lib/icons/Coin.svelte';
	import Github from '$lib/icons/Github.svelte';
	import Compass from '$lib/icons/Compass.svelte';
	import Skull from '$lib/icons/Skull.svelte';
	import Chest from '$lib/icons/Chest.svelte';
	import { screen } from '$stores/screen';
	import { slide } from 'svelte/transition';

	$: mobileMenuActive = false;

	const toggleMobileMenu = () => {
		mobileMenuActive = !mobileMenuActive;
	};
</script>

<AudioPlayer />

{#if $screen.size === 'sm'}
	<div class="mobile-menu" on:click={toggleMobileMenu}>
		<div class="mobile-menu-item">
			<Chest mr /> Inventory
		</div>

		<div class="mobile-menu-item">
			{#each Array($user.inventory.energy) as _}
				<Heart />
			{/each}
			{#each Array(5 - $user.inventory.energy) as _}
				<Heart filled={false} />
			{/each}
		</div>
	</div>
{/if}

{#if $screen.size !== 'sm' || mobileMenuActive}
	<div class="inventory" transition:slide={{ duration: 200 }}>
		{#if $screen.size !== 'sm'}
			<div class="item">
				{#each Array($user.inventory.energy) as _}
					<Heart />
				{/each}
				{#each Array(5 - $user.inventory.energy) as _}
					<Heart filled={false} />
				{/each}
			</div>
		{/if}

		{#if !$user.alive}
			<div class="item"><Skull mr /> <strong>DEAD</strong></div>
		{/if}

		<div class="item"><Coin mr /> {$user.inventory.money}</div>

		<div class="item">
			<Compass mr />
			{$user.row} x {$user.column}
		</div>

		<div class="item">
			<MiniMap />
		</div>

		<AudioPanel />

		<a
			href="https://github.com/tonygustafsson/woodlands-of-peril"
			target="_blank"
			class="item item--extra-spacing"
		>
			<Github fill="#574159" mr /> Game info
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

	.inventory {
		width: 200px;
		padding: 0.5em;
		border-radius: 8px;
		z-index: 4;
	}

	@media screen and (max-width: 1300px) {
		.inventory {
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
