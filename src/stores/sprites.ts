import { writable, get } from 'svelte/store';
import type { Sprite } from '../types';
import assets from './assets';
import { user } from './user';

const spriteSettings = {
	coin: {
		noOfFrames: 6,
		width: 32,
		height: 32,
		destinationWidth: 24,
		destinationHeight: 24,
		topMargin: 6,
		leftMargin: 6
	},
	wizard: {
		noOfFrames: 4,
		width: 32,
		height: 48,
		destinationWidth: 24,
		destinationHeight: 34,
		topMargin: 2,
		leftMargin: 6
	},
	heart: {
		noOfFrames: 24,
		width: 32,
		height: 48,
		destinationWidth: 24,
		destinationHeight: 34,
		topMargin: 8,
		leftMargin: 6
	},
	apple: {
		noOfFrames: 5,
		width: 40,
		height: 26,
		destinationWidth: 32,
		destinationHeight: 28,
		topMargin: 4,
		leftMargin: 2
	},
	bull: {
		noOfFrames: 5,
		width: 32,
		height: 32,
		destinationWidth: 30,
		destinationHeight: 30,
		topMargin: 2,
		leftMargin: 4
	},
	rhino: {
		noOfFrames: 6,
		width: 32,
		height: 32,
		destinationWidth: 32,
		destinationHeight: 32,
		topMargin: 2,
		leftMargin: 2
	},
	spider: {
		noOfFrames: 10,
		width: 32,
		height: 32,
		destinationWidth: 32,
		destinationHeight: 32,
		topMargin: 2,
		leftMargin: 2
	},
	bat: {
		noOfFrames: 14,
		width: 32,
		height: 32,
		destinationWidth: 32,
		destinationHeight: 32,
		topMargin: 2,
		leftMargin: 2
	},
	bird: {
		noOfFrames: 18,
		width: 32,
		height: 32,
		destinationWidth: 36,
		destinationHeight: 36,
		topMargin: 0,
		leftMargin: -2
	},
	user: {
		noOfFrames: 4,
		width: 32,
		height: 34,
		destinationWidth: 32,
		destinationHeight: 32,
		topMargin: 2,
		leftMargin: 2,
		positions: {
			down: { sy: 0 },
			left: { sy: 34 },
			right: { sy: 68 },
			up: { sy: 102 }
		}
	}
};

const frameSpeed = 125;

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
				dw: spriteSettings[spriteAsset.id].destinationWidth,
				dh: spriteSettings[spriteAsset.id].destinationHeight,
				topMargin: spriteSettings[spriteAsset.id].topMargin,
				leftMargin: spriteSettings[spriteAsset.id].leftMargin,
				currentFrame: 0
			};

			newSprites[spriteAsset.id] = newSprite;
		});

		sprites.set(newSprites);
	}
});

setInterval(() => {
	const $sprites = get(sprites);
	const $user = get(user);

	Object.keys($sprites).forEach((spriteId) => {
		let nextFrame = $sprites[spriteId].currentFrame + 1;

		if (nextFrame >= spriteSettings[spriteId].noOfFrames) {
			nextFrame = 0;
		}

		if (spriteId !== 'user' || $user.moving) {
			// Only move users frames while user moves
			$sprites[spriteId].sx = nextFrame * spriteSettings[spriteId].width;
		}

		if (spriteId === 'user') {
			// TODO: Make general
			$sprites[spriteId].sy = spriteSettings[spriteId].positions[$user.direction].sy;
		}

		$sprites[spriteId].currentFrame = nextFrame;
	});

	sprites.set($sprites);
}, frameSpeed);

export default sprites;
