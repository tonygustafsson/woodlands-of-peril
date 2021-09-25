<script lang="ts">
	import { audio } from '../stores/audio';
	import assets from '../stores/assets';

	const musicAudio = new Audio();

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
			const assetAudio = $assets.soundEffects.find(
				(effect) => effect.id === audioStore.soundEffect
			);

			if (assetAudio) {
				assetAudio.audio.play();
			}
		}
	});
</script>
