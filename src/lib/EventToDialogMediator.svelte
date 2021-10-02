<script lang="ts">
	import { user, dialog, audio, spaces } from '../stores';
	import { getDiceResult } from '$utils/random';
	import { emptyContent } from '../constants';
	import type { Space } from '../types';

	user.subscribe(($user) => {
		if ($user.event.type === 'enemy') {
			dialog.set({
				visible: true,
				title: `You meet a ${$user.event.enemyType} (Level ${$user.event.enemylevel})!`,
				text: 'Do you want to fight or flight?',
				actions: [
					{
						cta: true,
						label: 'Fight',
						action: async () => {
							await dialog.rollDice();

							const userStrenth = $user.level + $dialog.dieLastResult;
							const enemyDieResult = getDiceResult();
							const enemyStrenth = $user.event.enemylevel + enemyDieResult;
							const userWon = userStrenth > enemyStrenth;

							console.log({
								userLevel: $user.level,
								userDie: $dialog.dieLastResult,
								userStrenth,
								enemyLevel: $user.event.enemylevel,
								enemyDieResult,
								enemyStrenth,
								userWon
							});

							user.resetEvent();

							if (userWon) {
								user.increaseLevel();
								//user.setPosition();

								/*const newOldSpace: Space = {
									...$spaces[$user.position],
									content: emptyContent
								};
								spaces.setSpace($user.position, newOldSpace);
								*/
							} else {
								user.hurt();

								const soundEffect = Math.random() > 0.5 ? 'hit1' : 'hit2';
								audio.playSoundEffect(soundEffect);

								if ($user.inventory.energy <= 0) {
									// Death
									audio.playSoundEffect('death');

									dialog.set({
										visible: true,
										title: 'You are dead!',
										text: 'You died a gruesome death. Do you want to play again?',
										actions: [
											{
												cta: true,
												label: 'Start over',
												action: () => {
													user.clearStorage();
													spaces.clearStorage();
													window.location.reload();
												}
											}
										]
									});
								}
							}

							dialog.clear();
						}
					},
					{
						label: 'Evade',
						action: () => {
							user.resetEvent();
							dialog.clear();
						}
					}
				]
			});
		}

		if ($user.event.type === 'greeting') {
			// Paint welcome dialog
			dialog.set({
				visible: true,
				title: 'Welcome to Woodlands of Peril',
				text:
					"This is a game where you explore the woodlands. You'll look for treasure and fight enemies. You control the caracter by using the keyboard (WASD) or by touching the controls in the right bottom corner on mobile.",
				actions: [
					{
						cta: true,
						label: 'Begin',
						action: () => {
							dialog.clear();
							user.resetEvent();
							audio.toggleMusic();
							audio.toggleSoundEffects();
						}
					}
				]
			});
		}
	});
</script>
