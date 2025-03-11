import { InterpolatableValue } from "./interpolatable_value.js";

let speed = 3;
let size = 50;

let rect = {
	x: new InterpolatableValue(-50),
	y: 50,
};

function integrate(intervalMs, canvas) {
	rect.x.add(speed);

	// wrap along x axis
	if (canvas.width < rect.x.value) {
		rect.x.translate(-size);
	}
}

function render(intervalMs, delta, canvas, ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(rect.x.interpolate(delta), rect.y, size, size);
}

export { integrate, render };
