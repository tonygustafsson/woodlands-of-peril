<script lang="ts">
	import { user, dialog, audio, spaces } from '../stores';
	import { emptyContent, userContent } from '../constants';
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

							const userStrength = $user.level + $user.dieLastResult.user;
							const enemyDieResult = $user.dieLastResult.enemy;
							const enemyStrength = $user.event.enemylevel + enemyDieResult;
							const userWon = userStrength > enemyStrength;

							user.resetEvent();

							if (userWon) {
								audio.playSoundEffect('won');

								user.increaseLevel();

								const newOldSpace: Space = {
									...$spaces[$user.position],
									content: emptyContent
								};
								const newUserSpace: Space = {
									...$spaces[$user.nextPosition],
									content: userContent
								};
								spaces.setSpace($user.position, newOldSpace);
								spaces.setSpace($user.nextPosition, newUserSpace);
								user.setPosition($user.nextPosition);

								dialog.clear();
							} else {
								user.hurt();

								const soundEffect = Math.random() > 0.5 ? 'hit1' : 'hit2';
								audio.playSoundEffect(soundEffect);

								if ($user.inventory.energy <= 0) {
									// Death
									audio.playSoundEffect('gameover');

									dialog.clear();

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
								} else {
									dialog.clear();
								}
							}
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
