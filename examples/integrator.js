import { integrate, render } from "./sliding_square.js";

/*
	An example of a "renderer" class.

	This renderer interacts with the "app" in sliding_square.js
*/
class Renderer {
	#canvas;
	#ctx;

	constructor(canvas) {
		this.#canvas = canvas;
		this.#ctx = canvas.getContext("2d");
	}

	integrate(msInterval) {
		integrate(msInterval, this.#canvas);
	}

	render(msInterval, deltaRemainder) {
		render(msInterval, deltaRemainder, this.#canvas, this.#ctx);
	}

	error(e) {
		console.log("error!", e);
	}
}

export { Renderer };
