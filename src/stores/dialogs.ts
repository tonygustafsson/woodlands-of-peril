import { writable } from 'svelte/store';

type DialogStore = {
	visible: boolean;
	title: string;
	text: string;
	actions: {
		cta?: boolean;
		label: string;
		action: () => void;
		path?: Path2D;
	}[];
};

const initValue: DialogStore = {
	visible: false,
	title: '',
	text: '',
	actions: []
};

const dialogStore = () => {
	const { subscribe, set, update } = writable(initValue);

	return {
		subscribe,
		set,
		update,
		clear: () => {
			set(initValue);
		},
		setButtonPath: (button: Path2D) =>
			update(($dialog) => {
				$dialog.actions[0].path = button;
				return $dialog;
			})
	};
};

export const dialog = dialogStore();
