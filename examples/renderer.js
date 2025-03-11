import { integrate, render } from "./falling_squares.js";

class Renderer {
	#canvas;
	#ctx;

	constructor(canvas) {
		this.#canvas = canvas;
		this.#ctx = canvas.getContext("2d");
	}

	integrate(intervalMs) {
		// console.log("integrate!", intervalMs);
		// tick through state
		integrate(intervalMs, this.#canvas);
	}

	render(intervalMs, integrationRemainderMs) {
		// console.log("render", intervalMs, integrationRemainderMs);
		render(intervalMs, integrationRemainderMs, this.#canvas, this.#ctx);
	}

	error(e) {
		console.log("error!", e);
	}
}

export { Renderer };
