import { writable } from 'svelte/store';

type DialogStore = {
	visible: boolean;
	title: string;
	text: string;
	actions: {
		cta?: boolean;
		label: string;
		action: () => void;
	}[];
};

const initValue: DialogStore = {
	visible: false,
	title: '',
	text: '',
	actions: []
};

const dialogStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		set,
		clear: () => {
			set(initValue);
		}
	};
};

export const dialog = dialogStore();
