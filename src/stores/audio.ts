import { writable } from 'svelte/store';

type AudioStore = {
	musicTrack: string;
	musicPlaying: boolean;
	soundEffect: string;
};

const initValue: AudioStore = {
	musicTrack: 'music1',
	musicPlaying: false,
	soundEffect: ''
};

const audioStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		toggleMusic: () => {
			update((audio) => {
				audio.musicPlaying = !audio.musicPlaying;
				return audio;
			});
		},
		playSoundEffect: (effect: string) => {
			update((audio) => {
				audio.soundEffect = effect;
				return audio;
			});
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
