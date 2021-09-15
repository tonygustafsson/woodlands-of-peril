import { writable, get } from 'svelte/store';
import type { Sprite } from '../../types';
import assets from '../assets';

const $assets = get(assets);
const spriteAsset = $assets.sprites.find((sprite) => sprite.id === 'wizard');
const spriteImage = spriteAsset ? spriteAsset.image : null;

const noOfSprites = 4;
const frameSpeed = 100;
const spriteWidth = 32;
const spriteHeight = 48;

let currentSprite = 0;

const initValue: Sprite = {
	image: spriteImage,
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

assets.subscribe(($assets) => {
	if ($assets.done && !spriteAsset) {
		const spriteAsset = $assets.sprites.find((sprite) => sprite.id === 'wizard');
		const spriteImage = spriteAsset ? spriteAsset.image : null;

		sprite.update((sprite) => {
			sprite.image = spriteImage;
			return sprite;
		});
	}
});

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