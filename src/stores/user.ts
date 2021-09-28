import { writable } from 'svelte/store';
import type { Direction, User } from '../types';
import { getBoardPosition } from '$utils/board';
import storage from '$utils/storage';

let initValue: User = {
	position: 0,
	row: 0,
	column: 0,
	direction: 'down',
	moving: false,
	alive: true,
	isHurting: false,
	inventory: {
		money: 0,
		energy: 3
	}
};

const [storageValue, storeStorage] = storage<User>('user', initValue);
initValue = storageValue;

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
		increaseInventory: (item: string) => {
			update((user) => {
				user.inventory[item]++;

				if (item === 'energy' && user.inventory[item] > 5) {
					user.inventory[item] = 5;
				}

				return user;
			});
		},
		hurt: () => {
			update((user) => {
				const newEnergy = user.inventory.energy - 1;
				user.inventory.energy = newEnergy;
				user.isHurting = true;
				user.alive = newEnergy > 0;
				return user;
			});

			setTimeout(() => {
				update((user) => {
					user.isHurting = false;
					return user;
				});
			}, 250);
		},
		clearStorage: () => {
			storeStorage.clear();
		}
	};
};

const user = userStore();

let storageTimer;

// Fetch changes to store and save it to LocalStorage
user.subscribe((value) => {
	clearTimeout(storageTimer);

	storageTimer = setTimeout(() => {
		if (Object.keys(value).length <= 0) {
			// Do not save empty set, from startup
			return;
		}

		storeStorage.set(value);
	}, 500);
});

export default user;
