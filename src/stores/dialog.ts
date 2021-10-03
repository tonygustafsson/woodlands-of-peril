import { writable } from 'svelte/store';
import { getDiceResult } from '$utils/random';
import { user } from '../stores';

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
			const diceUserResult = getDiceResult();
			const diceEnemyResult = getDiceResult();

			user.setDieResult(diceUserResult, diceEnemyResult);

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

					resolve('OK');
				}, 4500)
			);
		}
	};
};

const dialog = dialogStore();

export default dialog;
