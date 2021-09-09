import { writable } from 'svelte/store';
import type { Inventory } from '../types';

const initValue: Inventory[] = [];

const inventoryStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		update
	};
};

export const inventory = inventoryStore();
