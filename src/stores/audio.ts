import { writable } from 'svelte/store';

type AudioStore = {
	musicTrack: string;
	enableMusic: boolean;
	soundEffect: string;
	enableSoundEffects: boolean;
};

const initValue: AudioStore = {
	musicTrack: 'music1',
	enableMusic: true,
	soundEffect: '',
	enableSoundEffects: true
};

const audioStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		toggleMusic: () => {
			update((audio) => {
				audio.enableMusic = !audio.enableMusic;
				return audio;
			});
		},
		toggleSoundEffects: () => {
			update((audio) => {
				audio.enableSoundEffects = !audio.enableSoundEffects;
				return audio;
			});
		},
		playSoundEffect: (effect: string) => {
			update((audio) => {
				audio.soundEffect = effect;
				return audio;
			});

			setTimeout(() => {
				update((audio) => {
					audio.soundEffect = '';
					return audio;
				});
			}, 500);
		},
		resetSoundEffect: () => {
			update((audio) => {
				audio.soundEffect = '';
				return audio;
			});
		}
	};
};

export const audio = audioStore();
