import { writable } from 'svelte/store';

type DialogStore = {
	visible: boolean;
	title: string;
	text: string;
	rollingDice?: boolean;
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
	rollingDice: false,
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
			}),
		rollDice: async () => {
			update(($dialog) => {
				$dialog.rollingDice = true;
				return $dialog;
			});

			return new Promise((resolve) =>
				setTimeout(() => {
					update(($dialog) => {
						$dialog.rollingDice = false;
						return $dialog;
					});

					resolve('ok');
				}, 6000)
			);
		}
	};
};

const dialog = dialogStore();

export default dialog;
