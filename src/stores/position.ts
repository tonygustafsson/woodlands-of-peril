import { writable } from 'svelte/store';

const initValue = 0;

const positionStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		set
	};
};

export const position = positionStore();
