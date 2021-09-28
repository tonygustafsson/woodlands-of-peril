type StorageMethods = {
	get: () => unknown;
	set: (value: unknown) => void;
	clear: () => void;
};

const storage = <T>(storageKey: string, initValue: T): [T, StorageMethods] => {
	const methods = {
		get: () => {
			if (typeof window === 'undefined' || typeof window.localStorage !== 'object') {
				return initValue;
			}

			const valueFromLocalStorage = window.localStorage.getItem(storageKey);

			if (!valueFromLocalStorage) {
				return initValue;
			}

			return JSON.parse(valueFromLocalStorage);
		},
		set: (value: T) => {
			if (typeof window === 'undefined' || typeof window.localStorage !== 'object') {
				return;
			}

			const jsonStorage = JSON.stringify(value);
			window.localStorage.setItem(storageKey, jsonStorage);
		},
		clear: () => {
			if (typeof window === 'undefined' || typeof window.localStorage !== 'object') {
				return;
			}

			window.localStorage.removeItem(storageKey);
		}
	};

	return [methods.get(), methods];
};

export default storage;
