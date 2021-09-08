<script lang="ts">
	import { onMount } from 'svelte';
	import { space } from 'svelte/internal';

	type Space = {
		id: number;
		icon: Stuff;
		background?: 'default' | 'highlight';
		effect?: 'zoomOut';
	};

	type Stuff = {
		content: string;
		label: string;
		solid: Boolean;
	};

	const emptyIcon: Stuff = { content: '', label: '', solid: false };
	const userIcon: Stuff = { content: '😺', label: 'User', solid: true };
	const surroundings: Stuff[] = [
		{ content: '🌲', label: 'Pine tree', solid: true },
		{ content: '🌴', label: 'Palm tree', solid: true },
		{ content: '🌵', label: 'Cactus', solid: true },
		{ content: '🪨', label: 'Stone', solid: true }
	];
	const unusualStuff: Stuff[] = [
		{ content: '🍒', label: 'Cherry', solid: false },
		{ content: '🐙', label: 'Squid', solid: false },
		{ content: '🐞', label: 'Ladybug', solid: false },
		{ content: '🕷', label: 'Spider', solid: false },
		{ content: '🍖', label: 'Meat bone', solid: false },
		{ content: '💰', label: 'Money bag', solid: false }
	];

	const numberOfSpaces = 8000;
	const spaceWidth = 24;
	const spacesPerRow = 100;

	const cssVariableStyle = `
        --space-width: ${spaceWidth}px;
        --spaces-per-row: ${spacesPerRow};
        --font-size: ${Math.floor(spaceWidth * 0.6)}px;
		--space-border: #0f0f0f;
    `;

	$: spaces = [] as Space[];
	$: userPosition = 0;

	const randomInArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

	const go = (direction) => {
		let newUserPosition = userPosition;

		if (direction === 'up') {
			newUserPosition = userPosition - spacesPerRow;
		} else if (direction === 'down') {
			newUserPosition = userPosition + spacesPerRow;
		} else if (direction === 'left') {
			newUserPosition = userPosition - 1;
		} else if (direction === 'right') {
			newUserPosition = userPosition + 1;
		}

		if (newUserPosition !== userPosition && !spaces[newUserPosition].icon.solid) {
			spaces[userPosition].icon = emptyIcon;
			spaces[userPosition].background = 'default';
			delete spaces[userPosition].effect;
			spaces[newUserPosition].icon = userIcon;
			spaces[newUserPosition].background = 'highlight';
			userPosition = newUserPosition;
		}
	};

	const handleKeydown = (e) => {
		switch (e.keyCode) {
			case 87:
				// W UP
				go('up');
				break;
			case 83:
				// S Down
				go('down');
				break;
			case 68:
				// D Right
				go('right');
				break;
			case 65:
				// A Left
				go('left');
				break;
		}
	};

	onMount(() => {
		const newSpaces = [];

		for (let x = 0; x < numberOfSpaces; x++) {
			let icon: Stuff = emptyIcon;

			if (Math.random() > 0.85) {
				icon = randomInArray(surroundings);
			} else if (Math.random() > 0.97) {
				icon = randomInArray(unusualStuff);
			}

			const newSpace: Space = {
				id: x,
				icon: icon,
				background: 'default'
			};

			newSpaces.push(newSpace);
		}

		spaces = newSpaces;

		while (userPosition === 0) {
			const randomSpace = randomInArray(spaces);

			if (randomSpace.icon.content !== '') {
				continue;
			}

			const newSpace: Space = {
				id: randomSpace.id,
				icon: userIcon,
				background: 'highlight',
				effect: 'zoomOut'
			};

			const newSpaces = [...spaces];
			newSpaces[randomSpace.id] = newSpace;
			spaces = newSpaces;

			userPosition = randomSpace.id;
		}

		setTimeout(() => {
			const userSpaceDomNode = document.querySelector('.zoomOut');

			if (userSpaceDomNode) {
				userSpaceDomNode.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
					inline: 'center'
				});
			}
		}, 500);
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="board" style={cssVariableStyle}>
	{#each spaces as space}
		<div
			class="space"
			class:highlight={space.background === 'highlight'}
			class:zoomOut={space.effect === 'zoomOut'}
			title={space.icon.label || null}
		>
			{space.icon.content}
		</div>
	{/each}
</div>

<style>
	@keyframes zoomOut {
		from {
			transform: scale(50);
		}
		to {
			transform: scale(1.15);
		}
	}

	.board {
		width: calc(var(--space-width) * var(--spaces-per-row));
	}

	.space {
		width: var(--space-width);
		height: var(--space-width);
		font-size: var(--font-size);
		border: 1px var(--space-border) solid;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left;
		user-select: none;
	}

	.space.highlight {
		background-color: #333;
		border: 1px #999 solid;
		transform: scale(1.15);
	}

	.space.zoomOut {
		animation: zoomOut 1s;
	}
</style>
