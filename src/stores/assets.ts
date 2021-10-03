import { writable } from 'svelte/store';
import type { AssetImage, AssetAudio, Assets } from '../types';

const tileSources: string[] = [
	'stone1',
	'stone2',
	'water1',
	'water2',
	'tree1',
	'tree2',
	'tree3',
	'tree4',
	'bush1'
];
const spriteSources: string[] = [
	'coin',
	'wizard',
	'user',
	'bull',
	'bird',
	'bat',
	'rhino',
	'spider',
	'heart',
	'pizza',
	'skull',
	'dice',
	'potion'
];

const soundEffectsSources: string[] = [
	'gameover',
	'energy',
	'hit1',
	'hit2',
	'coin',
	'roar1',
	'roar2',
	'won',
	'potion',
	'eat'
];

const initValue: Assets = {
	tiles: [],
	sprites: [],
	soundEffects: [],
	done: false
};

const fetchTile = (tileSource: string): Promise<AssetImage> =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve({ id: tileSource, image: img });
		img.onerror = () => resolve({ id: tileSource, image: img });

		img.src = `./tiles/${tileSource}.png`;
		console.log('Loaded tile ' + img.src);
	});

const fetchSprite = (tileSource: string): Promise<AssetImage> =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve({ id: tileSource, image: img });
		img.onerror = () => resolve({ id: tileSource, image: img });

		img.src = `./sprites/${tileSource}.png`;
		console.log('Loaded sprite ' + img.src);
	});

const fetchSoundEffect = (soundEffectSource: string): Promise<AssetAudio> =>
	new Promise((resolve) => {
		const audio = new Audio();
		const source = document.createElement('source');

		if (audio.canPlayType('audio/mpeg')) {
			audio.addEventListener('loadedmetadata', () => resolve({ id: soundEffectSource, audio }));
			audio.addEventListener('error', () => resolve({ id: soundEffectSource, audio }));

			source.type = 'audio/mpeg';
			source.src = `./sound-effects/${soundEffectSource}.mp3`;
			audio.appendChild(source);

			console.log('Loaded sound effect ' + source.src);
		} else {
			resolve({ id: 'none', audio });
		}
	});

const assetsStore = () => {
	const { subscribe, set } = writable(initValue);

	return {
		subscribe,
		fetch: async () => {
			const tiles = await Promise.all(tileSources.map(fetchTile));
			const sprites = await Promise.all(spriteSources.map(fetchSprite));
			const soundEffects = await Promise.all(soundEffectsSources.map(fetchSoundEffect));

			set({
				tiles,
				sprites,
				soundEffects,
				done: true
			});
		}
	};
};

const assets = assetsStore();

export default assets;
