import { writable } from 'svelte/store';
import type { User } from '../types';
import { getBoardPosition } from '../utils/board';

const initValue: User = {
	position: 0,
	row: 0,
	column: 0,
	direction: 'left',
	alive: true
};

const userStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		setPosition: (position: number, direction: 'left' | 'right' = 'left') => {
			const boardPosition = getBoardPosition(position);

			update((user) => {
				user.position = position;
				user.row = boardPosition.row;
				user.column = boardPosition.column;
				user.direction = direction;
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
