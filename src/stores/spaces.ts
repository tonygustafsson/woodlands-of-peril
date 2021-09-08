import { writable } from 'svelte/store';
import type { Space as SpaceType } from '../types';

const initValue: SpaceType[] = [];

const spacesStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		set
	};
};

export const spaces = spacesStore();
