<script lang="ts">
	import { audio, assets } from '../stores';
	import { randomNumber } from '$utils/random';

	const musicAudio = new Audio();

	const audioNameToUrl = (name) => `/music/${name}.mp3`;

	audio.subscribe((audioStore) => {
		if (audioStore.enableMusic && musicAudio.paused) {
			if (!musicAudio.src) {
				musicAudio.src = audioNameToUrl($audio.musicTrack);
			}

			musicAudio.play();

			// Create loop
			musicAudio.addEventListener('ended', () => {
				let newMusicTrack = audioNameToUrl(`music${randomNumber(1, 3)}`);

				while (newMusicTrack === new URL(musicAudio.src).pathname) {
					newMusicTrack = audioNameToUrl(`music${randomNumber(1, 3)}`);
				}

				musicAudio.src = newMusicTrack;
				musicAudio.currentTime = 0;
				musicAudio.play();
			});
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
