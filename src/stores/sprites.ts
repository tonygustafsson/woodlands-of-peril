import { writable, get } from 'svelte/store';
import type { Sprite } from '../types';
import assets from './assets';

const spriteSettings = {
	coin: { noOfFrames: 6, width: 32, height: 32 },
	wizard: { noOfFrames: 4, width: 32, height: 48 },
	monster: { noOfFrames: 6, width: 32, height: 32 }
};

const frameSpeed = 100;

const initValue: Record<string, Sprite> = {};

const spriteStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		set
	};
};

const sprites = spriteStore();

assets.subscribe(($assets) => {
	if ($assets.done) {
		const newSprites = {};

		$assets.sprites.forEach((spriteAsset) => {
			const newSprite: Sprite = {
				image: spriteAsset.image,
				sx: 0,
				sy: 0,
				sw: spriteSettings[spriteAsset.id].width,
				sh: spriteSettings[spriteAsset.id].height,
				dx: 0,
				dy: 0,
				dw: 24,
				dh: 24,
				currentFrame: 0
			};

			newSprites[spriteAsset.id] = newSprite;
		});

		sprites.set(newSprites);
	}
});

setInterval(() => {
	const $sprites = get(sprites);

	Object.keys($sprites).forEach((spriteId) => {
		let nextFrame = $sprites[spriteId].currentFrame + 1;

		if (nextFrame >= spriteSettings[spriteId].noOfFrames) {
			nextFrame = 0;
		}

		$sprites[spriteId].sx = nextFrame * spriteSettings[spriteId].width;
		$sprites[spriteId].currentFrame = nextFrame;
	});

	sprites.set($sprites);
}, frameSpeed);

export default sprites;
