<script lang="ts">
	import { user } from '../stores/user';
</script>

<div class="inventory">
<h3>Inventory</h3>

	<div class="item">
		{#each Array($user.inventory.energy) as _}
			🤎
		{/each}
		{#each Array(5 - $user.inventory.energy) as _}
			🖤
		{/each}
	</div>

	<div class="item">{$user.inventory.money} 🪙</div>

	{#if !$user.alive}
		<div class="item"><strong>💀 DEAD</strong></div>
	{/if}

	<div class="item">
		🧭 {$user.row} x {$user.column}<br />
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
		margin-top: 0;
	}

	.item {
		margin: 1em 0;
	}
</style>
