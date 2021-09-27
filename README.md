# Woodlands of Peril

This is an unfinished web game in it's early stage. So far it's just a tech demo, with no point of playing beyond that.
It's using HTML Canvas and is built with SvelteKit. The game can be controled by keyword (WASD) or screen tap on mobiles.

You can set the number of spaces in the game in constants. Also the number of spaces per row. It will then populate the board with randomly selected spaces and content. It can be enemies, energizers or money.

You'll see different amount of spaces depending on your device, and you will have a minimap to see where on the board you are.

## Advanced canvas usage

Even though it's a game in it's early development, it does use some advanced canvas tech, like:

- Have the same number of spaces/cells no matter the device, but have a device viewport and only render spaces in the viewport.
- The viewport is centered around the player and follows it arround.
- Animated sprites for enemies, user and collectibles.
- Multiple layers for performance (One for the static board that is only updated when the user moves, one for the sprite animations that loops continously, and one for dialogs and other GUI stuff that is only rendered when needed).
- Dialogs have buttons and is using Path2D to detect if the user clicks on the button or outside of it.
- Of course using requestAnimationFrame.
- Randomized maps on every page load.
- Typewriter effect when showing dialogs.
- Paragraph support in dialogs, can detect the edges of a dialog and create new rows when the width is up.

## Future plans

- Enemy fights, probably turn based, showing up in a dialog.
- Online world with multiple players at once. The game renews it self when someone wins.
- Find a usage for money, buy items.

## Demo

https://woodlands-of-peril.vercel.app/

## Screenshot

![Screenshot](screenshot.png 'Screenshot')
