import { writable } from 'svelte/store';
import type { Sprite } from '../../types';

const spriteImg = typeof Image === 'function' ? new Image() : null;

if (typeof Image === 'function') {
	spriteImg.src = './sprites/coin.png';
}

let currentSprite = 0;
const noOfSprites = 6;
const frameSpeed = 100;

const initValue: Sprite = {
	image: spriteImg,
	currentSprite: currentSprite,
	spriteWidth: 32,
	spriteHeight: 32
};

export const coin = writable(initValue);

setInterval(() => {
	currentSprite++;

	if (currentSprite + 1 > noOfSprites) {
		currentSprite = 0;
	}

	coin.set({
		...initValue,
		currentSprite
	});
}, frameSpeed);
