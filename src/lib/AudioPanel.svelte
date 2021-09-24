<script lang="ts">
	import { audio } from '../stores/audio';
	import Play from '$lib/icons/Play.svelte';
	import Pause from '$lib/icons/Pause.svelte';

	const musicAudio = new Audio();
	const soundEffectAudio = new Audio();

	soundEffectAudio.addEventListener('ended', () => {
		audio.resetSoundEffect();
	});

	const toggleMusic = () => {
		audio.toggleMusic();
	};

	audio.subscribe((audioStore) => {
		if (audioStore.musicPlaying && musicAudio.paused) {
			if (!musicAudio.src) {
				musicAudio.src = `/music/${$audio.musicTrack}.mp3`;
			}

			musicAudio.play();
		}

		if (!audioStore.musicPlaying && !musicAudio.paused) {
			musicAudio.pause();
		}

		if (audioStore.soundEffect) {
			soundEffectAudio.src = `/sound-effects/${audioStore.soundEffect}.mp3`;
			soundEffectAudio.play();
		}
	});
</script>

<div class="audio">
	<h3>Sound</h3>

	<div class="item">
		<a class="link" href="audio" on:click|preventDefault={toggleMusic}>
			{#if $audio.musicPlaying}
				<Pause />
			{:else}
				<Play />
			{/if}
		</a>
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

	.link {
		color: #fff;
		text-decoration: none;
	}
</style>
