<script lang="ts">
	import { user } from '../stores/user';
	import AudioPanel from './AudioPanel.svelte';
	import MiniMap from './MiniMap.svelte';
	import Heart from '$lib/icons/Heart.svelte';
	import Coin from '$lib/icons/Coin.svelte';
	import Compass from '$lib/icons/Compass.svelte';
	import Skull from '$lib/icons/Skull.svelte';
</script>

<div class="inventory">
	<h3>Inventory</h3>

	<div class="item">
		{#each Array($user.inventory.energy) as _}
			<Heart />
		{/each}
		{#each Array(5 - $user.inventory.energy) as _}
			<Heart filled={false} />
		{/each}
	</div>

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
</div>

<style>
	.inventory {
		position: fixed;
		top: 40px;
		left: 10px;
		width: 200px;
		padding: 0.5em;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 8px;
		z-index: 100;
	}

	h3 {
		margin-bottom: 0;
		margin-top: 0;
	}

	.item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 1em 0;
	}
</style>
