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
	'skull'
];

const soundEffectsSources: string[] = ['death', 'energy', 'hit1', 'hit2', 'money'];

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
		audio.addEventListener('canplay', () => resolve({ id: soundEffectSource, audio }));
		audio.addEventListener('error', () => resolve({ id: soundEffectSource, audio }));

		audio.src = `./sound-effects/${soundEffectSource}.mp3`;
		console.log('Loaded sound effect ' + audio.src);
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
