export { Timestep };
let min_step_6 = (1 / 6) * 1000;
class Timestep {
	#timestamp = performance.now();
	#accumulator = 0;
	#receipt;
	#rc;
	#intervalMs;
	#boundLoop;
	constructor(intervalMs, renderer) {
		this.#rc = renderer;
		this.#intervalMs = Math.min(min_step_6, intervalMs);
		console.log(this.#intervalMs);
		this.#boundLoop = this.#loop.bind(this);
	}
	start() {
		if (this.#receipt) return;
		this.#receipt = window.requestAnimationFrame(this.#boundLoop);
	}
	stop() {
		window.cancelAnimationFrame(this.#receipt);
		this.#receipt = undefined;
	}
	#loop(now) {
		this.#accumulator += now - this.#timestamp;
		this.#timestamp = now;
		while (this.#accumulator > this.#intervalMs) {
			this.#rc.integrate(this.#intervalMs);
			this.#accumulator -= this.#intervalMs;
		}
		this.#rc.render(this.#intervalMs, this.#accumulator);
		this.#receipt = window.requestAnimationFrame(this.#boundLoop);
	}
}
