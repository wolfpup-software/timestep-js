import { InterpolatableValue } from "./interpolatable_value.js";

let speed = 3;
let size = 50;

let rect = {
	x: new InterpolatableValue(-50),
	y: 50,
};

// updates "state" of rectangle
function integrate(msInterval, canvas) {
	rect.x.add(speed);

	// wrap along x axis
	if (canvas.width < rect.x.value) {
		rect.x.translate(-size);
	}
}

// draw rect to the canvas
function render(_msInterval, deltaRemainder, canvas, ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(rect.x.interpolate(deltaRemainder), rect.y, size, size);
}

export { integrate, render };
