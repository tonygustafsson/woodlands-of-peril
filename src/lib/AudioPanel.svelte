<script lang="ts">
	import { audio } from '$stores/audio';
	import Switch from '$lib/form/Switch.svelte';

	const toggleSoundEffects = () => {
		audio.toggleSoundEffects();
	};

	const toggleMusic = () => {
		audio.toggleMusic();
	};
</script>

<div class="audio">
	<h3>Music</h3>

	<div class="item">
		<Switch id="music" checked={$audio.enableMusic} on:change={toggleMusic} />
	</div>

	<h3>Sound effects</h3>

	<div class="item">
		<Switch id="sound-effects" checked={$audio.enableSoundEffects} on:change={toggleSoundEffects} />
	</div>
</div>

<style>
	h3 {
		margin-bottom: 0;
		margin-top: 0;
	}

	.item {
		margin: 1em 0;
	}
</style>
