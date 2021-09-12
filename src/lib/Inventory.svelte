<script lang="ts">
	import { inventory } from '../stores/inventory';
	import { user } from '../stores/user';
</script>

<div class="inventory">
	<h3>Position</h3>
	<div class="item">
		{$user.row} x {$user.column}
	</div>

	{#if $inventory.length > 0}
		<h3>Inventory</h3>

		{#each $inventory as item}
			<div class="item">{item.label}: {item.quantity}</div>
		{/each}
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
