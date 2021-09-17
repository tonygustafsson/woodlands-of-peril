import { writable } from 'svelte/store';
import type { Direction, User } from '../types';
import { getBoardPosition } from '../utils/board';

const initValue: User = {
	position: 0,
	row: 0,
	column: 0,
	direction: 'down',
	moving: false,
	alive: true
};

const userStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		setPosition: (position: number, direction: Direction = 'down') => {
			const boardPosition = getBoardPosition(position);

			update((user) => {
				user.position = position;
				user.row = boardPosition.row;
				user.column = boardPosition.column;
				user.direction = direction;
				return user;
			});
		},
		setMoving: (moving: boolean) => {
			update((user) => {
				user.moving = moving;
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
