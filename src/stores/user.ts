import { writable } from 'svelte/store';
import type { User } from '../types';

const initValue: User = {
	position: 0,
	alive: true
};

const userStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		setPosition: (position: number) => {
			update((user) => {
				user.position = position;
				return user;
			});
		},
		setDead: () => {
			update((user) => {
				user.alive = false;
				return user;
			});
		}
	};
};

export const user = userStore();
