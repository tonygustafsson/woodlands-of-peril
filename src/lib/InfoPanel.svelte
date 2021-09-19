<script lang="ts">
	import { user } from '../stores/user';
</script>

<div class="inventory">
	<div class="item">
		{#each Array($user.inventory.energy) as _}
			🤎
		{/each}
		{#each Array(5 - $user.inventory.energy) as _}
			🖤
		{/each}
	</div>

	<h3>Inventory</h3>

	{#if $user.inventory.energy <= 0}
		<div class="item"><strong>DEAD</strong></div>
	{/if}
	<div class="item">Money: {$user.inventory.money}</div>

	<h3>Position</h3>
	<div class="item">
		{$user.row} x {$user.column}<br />
	</div>
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
	}

	.item {
		margin: 0.25em 0;
	}
</style>
