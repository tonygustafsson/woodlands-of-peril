import { writable } from 'svelte/store';

type Canvas = {
	width: number;
	height: number;
	cameraSpacesWidth: number;
	cameraSpacesHeight: number;
	boardContext: CanvasRenderingContext2D;
	spriteContext: CanvasRenderingContext2D;
	dialogContext: CanvasRenderingContext2D;
};

const initValue: Canvas = {
	width: 0,
	height: 0,
	cameraSpacesWidth: 0,
	cameraSpacesHeight: 0,
	boardContext: null,
	spriteContext: null,
	dialogContext: null
};

const canvasStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		set
	};
};

export const canvas = canvasStore();
