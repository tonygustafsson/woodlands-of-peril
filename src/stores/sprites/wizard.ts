import { writable } from 'svelte/store';
import type { Sprite } from '../../types';

const spriteImg = typeof Image === 'function' ? new Image() : null;

if (typeof Image === 'function') {
	spriteImg.src = './sprites/wizard.png';
}

const noOfSprites = 4;
const frameSpeed = 100;
const spriteWidth = 32;
const spriteHeight = 48;

let currentSprite = 0;

const initValue: Sprite = {
	image: spriteImg,
	sx: 0,
	sy: 0,
	sw: spriteWidth,
	sh: spriteHeight,
	dx: 0,
	dy: 0,
	dw: 24,
	dh: 24
};

const spriteStore = () => {
	const { subscribe, update } = writable(initValue);

	return {
		subscribe,
		update
	};
};

const sprite = spriteStore();

setInterval(() => {
	currentSprite++;

	if (currentSprite + 1 > noOfSprites) {
		currentSprite = 0;
	}

	sprite.update((sprite) => {
		sprite.sx = currentSprite * spriteWidth;
		return sprite;
	});
}, frameSpeed);

export default sprite;
