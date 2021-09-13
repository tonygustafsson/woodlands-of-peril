import { writable } from 'svelte/store';

type Canvas = {
	width: number;
	height: number;
	cameraSpacesWidth: number;
	cameraSpacesHeight: number;
};

const initValue: Canvas = {
	width: 0,
	height: 0,
	cameraSpacesWidth: 0,
	cameraSpacesHeight: 0
};

const canvasStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		set
	};
};

export const canvas = canvasStore();
