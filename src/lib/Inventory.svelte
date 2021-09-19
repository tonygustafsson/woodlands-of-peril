<script lang="ts">
	import { user } from '../stores/user';
</script>

<div class="inventory">
	<h3>Position</h3>
	<div class="item">
		{$user.row} x {$user.column}<br />
	</div>

	<h3>Inventory</h3>

	<div class="item">Money: {$user.inventory.money}</div>
	{#if $user.inventory.energy > 0}
		<div class="item">Energy: {$user.inventory.energy}</div>
	{:else}
		<div class="item">DEAD</div>
	{/if}
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

	.item {
		margin: 0.25em 0;
	}
</style>
