import { writable } from 'svelte/store';
import type { Space as SpaceType } from '../types';

const initValue: SpaceType[] = [];

const spacesStore = () => {
	const { subscribe, set, update } = writable(initValue);

	return {
		subscribe,
		set,
		setSpace: (id: number, newSpace: SpaceType) => {
			update((spaces) => {
				spaces[id] = newSpace;
				return spaces;
			});
		}
	};
};

export const spaces = spacesStore();
