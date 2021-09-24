<script lang="ts">
	import { audio } from '../stores/audio';
	import Switch from '$lib/form/Switch.svelte';

	const musicAudio = new Audio();
	const soundEffectAudio = new Audio();

	soundEffectAudio.addEventListener('ended', () => {
		audio.resetSoundEffect();
	});

	const toggleSoundEffects = () => {
		audio.toggleSoundEffects();
	};

	const toggleMusic = () => {
		audio.toggleMusic();
	};

	audio.subscribe((audioStore) => {
		if (audioStore.enableMusic && musicAudio.paused) {
			if (!musicAudio.src) {
				musicAudio.src = `/music/${$audio.musicTrack}.mp3`;
			}

			musicAudio.play();
		}

		if (!audioStore.enableMusic && !musicAudio.paused) {
			musicAudio.pause();
		}

		if (audioStore.enableSoundEffects && audioStore.soundEffect) {
			soundEffectAudio.src = `/sound-effects/${audioStore.soundEffect}.mp3`;
			soundEffectAudio.play();
		}
	});
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
