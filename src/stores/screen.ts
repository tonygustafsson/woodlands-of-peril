import { writable } from 'svelte/store';

type AudioStore = {
	size: 'sm' | 'lg';
	innerWidth: number;
	innerHeight: number;
};

const initValue: AudioStore = {
	size: 'sm',
	innerWidth: 0,
	innerHeight: 0
};

const screenStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		setScreenSize: (innerWidth: number, innerHeight) => {
			update((screen) => {
				screen.size = innerWidth <= 1300 ? 'sm' : 'lg';
				screen.innerWidth = innerWidth;
				screen.innerHeight = innerHeight;
				return screen;
			});
		}
	};
};

export const screen = screenStore();
