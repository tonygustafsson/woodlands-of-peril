<script lang="ts">
	import { user } from '../stores/user';
	import { canvas } from '../stores/canvas';
	import { spacesPerRow, numberOfSpaces, spaceWidth } from '../constants';
	import { styleToString } from '../utils/styleToString';

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

<div class="map">
	<div class="map-viewport" style={styleToString(viewPortStyle)} />
</div>

<style>
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
