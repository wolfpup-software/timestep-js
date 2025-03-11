export { Timestep };
let min_step_6 = (1 / 6) * 1000;
class Timestep {
	#renderer;
	#state;
	#boundLoop;
	constructor(params) {
		this.#boundLoop = this.#loop.bind(this);
		let { renderer, intervalMs, maxIntegrationMS } = params;
		let interval = Math.min(min_step_6, intervalMs ?? min_step_6);
		let inverseInterval = 1 / interval;
		this.#renderer = renderer;
		this.#state = {
			accumulator: 0,
			intervalMs: interval,
			inverseInterval,
			maxIntegrationMS: maxIntegrationMS ?? 250,
			prevTimestamp: undefined,
			receipt: undefined,
		};
	}
	start() {
		if (this.#state.receipt) return;
		this.#state.prevTimestamp = performance.now();
		this.#state.receipt = window.requestAnimationFrame(this.#boundLoop);
	}
	stop() {
		window.cancelAnimationFrame(this.#state.receipt);
		this.#state.receipt = undefined;
	}
	#loop(now) {
		this.#state.receipt = window.requestAnimationFrame(this.#boundLoop);
		// send "error" to renderer if "max delay"
		let delta = now - this.#state.prevTimestamp;
		if (delta > this.#state.maxIntegrationMS) {
			this.#renderer.error(
				new Error("Timestep exceeded maximum integration time."),
			);
		}
		this.#state.accumulator += now - this.#state.prevTimestamp;
		this.#state.prevTimestamp = now;
		while (this.#state.accumulator > this.#state.intervalMs) {
			this.#renderer.integrate(this.#state.intervalMs);
			this.#state.accumulator -= this.#state.intervalMs;
		}
		let integrated = this.#state.accumulator * this.#state.inverseInterval;
		this.#renderer.render(this.#state.intervalMs, integrated);
	}
}
