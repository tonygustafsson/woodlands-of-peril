const fillTextWordWrap = (
	ctx: CanvasRenderingContext2D,
	text: string,
	x: number,
	y: number,
	lineHeight: number,
	fitWidth = 0
): void => {
	if (fitWidth <= 0) {
		ctx.fillText(text, x, y);
		return;
	}

	let words = text.split(' ');
	let currentLine = 0;
	let idx = 1;

	while (words.length > 0 && idx <= words.length) {
		const str = words.slice(0, idx).join(' ');
		const w = ctx.measureText(str).width;

		if (w > fitWidth) {
			if (idx == 1) {
				idx = 2;
			}
			ctx.fillText(words.slice(0, idx - 1).join(' '), x, y + lineHeight * (currentLine + 1));
			currentLine++;
			words = words.splice(idx - 1);
			idx = 1;
		}

		idx++;
	}
	if (idx > 0) ctx.fillText(words.join(' '), x, y + lineHeight * (currentLine + 1));
};

export default fillTextWordWrap;
