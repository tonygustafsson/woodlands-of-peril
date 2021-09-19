<script lang="ts">
	import { inventory } from '../stores/inventory';
	import { user } from '../stores/user';

	$: money = $inventory.find((x) => x.label === 'Money');
	$: pizzas = $inventory.find((x) => x.label === 'Pizza');
	$: hearts = $inventory.find((x) => x.label === 'Heart');
	$: energy = ((pizzas && pizzas.quantity) || 0) + ((hearts && hearts.quantity) || 0);
</script>

<div class="inventory">
	<h3>Position</h3>
	<div class="item">
		{$user.row} x {$user.column}<br />
	</div>

	<h3>Inventory</h3>

	<div class="item">Money: {money?.quantity || 0}</div>
	<div class="item">Energy: {energy || 0}</div>
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
