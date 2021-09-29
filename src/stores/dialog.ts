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
		setButtonPath: (actionId: number, buttonPath: Path2D) =>
			update(($dialog) => {
				if (!$dialog.actions[actionId]) {
					return $dialog;
				}

				const actions = [...$dialog.actions];
				actions[actionId].path = buttonPath;

				$dialog.actions = actions;

				return $dialog;
			})
	};
};

const dialog = dialogStore();

export default dialog;
