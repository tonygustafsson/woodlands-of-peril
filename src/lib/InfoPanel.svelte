<script lang="ts">
	import { user } from '../stores/user';
	import { canvas } from '../stores/canvas';
	import { spacesPerRow, numberOfSpaces, spaceWidth } from '../constants';
	import { styleToString } from '../utils/styleToString';
	import AudioPanel from './AudioPanel.svelte';
	import Heart from '$lib/icons/Heart.svelte';
	import Coin from '$lib/icons/Coin.svelte';
	import Compass from '$lib/icons/Compass.svelte';
	import Skull from '$lib/icons/Skull.svelte';

	$: viewWidthInPx = $canvas.cameraSpacesWidth * spaceWidth;
	$: boardWidthInPx = spaceWidth * spacesPerRow;
	$: viewHeightInPx = $canvas.cameraSpacesHeight * spaceWidth;
	$: boardHeightInPx = spaceWidth * (numberOfSpaces / spacesPerRow);
	$: firstVisibleColumn = $user.column - Math.floor($canvas.cameraSpacesWidth / 2);
	$: firstVisibleRow = $user.row - Math.floor($canvas.cameraSpacesHeight / 2);

	$: width = Math.floor((viewWidthInPx / boardWidthInPx) * 100);
	$: height = Math.floor((viewHeightInPx / boardHeightInPx) * 100);
	$: left = Math.floor((firstVisibleColumn / spacesPerRow) * 100);
	$: top = Math.floor((firstVisibleRow / (numberOfSpaces / spacesPerRow)) * 100);

	$: viewPortStyle = {
		width: `${width}%`,
		height: `${height}%`,
		left: `${left}%`,
		top: `${top}%`
	};
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
		<div class="map">
			<div class="map-viewport" style={styleToString(viewPortStyle)} />
		</div>
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

	.map {
		width: 200px;
		height: 150px;
		background-color: #121212;
		position: relative;
		overflow: hidden;
		z-index: 1;
	}

	.map-viewport {
		position: absolute;
		background-color: #574159;
		z-index: 2;
	}
</style>
