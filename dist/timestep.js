export { Timestep };
let MIN_STEP = 1;
class Timestep {
	#renderer;
	#state;
	#boundLoop;
	constructor(params) {
		this.#boundLoop = this.#loop.bind(this);
		let { renderer, msInterval, msMaxIntegration } = params;
		this.#renderer = renderer;
		this.#state = getState(msInterval, msMaxIntegration);
	}
	start() {
		if (this.#state.receipt) return;
		this.#state.receipt = window.requestAnimationFrame(this.#boundLoop);
		this.#state.prevTimestamp = performance.now();
	}
	stop() {
		window.cancelAnimationFrame(this.#state.receipt);
		this.#state.receipt = undefined;
	}
	#loop(now) {
		this.#state.receipt = window.requestAnimationFrame(this.#boundLoop);
		integrateAndRender(this.#renderer, this.#state, now);
	}
}
function getState(intrvlMs = MIN_STEP, msMaxIntegration = 250) {
	let msInterval = Math.max(intrvlMs, MIN_STEP);
	let inverseInterval = 1 / msInterval;
	return {
		accumulator: 0,
		msInterval,
		inverseInterval,
		msMaxIntegration: msMaxIntegration ?? 250,
		prevTimestamp: undefined,
		receipt: undefined,
	};
}
function integrateAndRender(renderer, state, now) {
	const delta = now - state.prevTimestamp;
	if (delta > state.msMaxIntegration) {
		renderer.error(new Error("Timestep exceeded maximum integration time."));
	}
	state.accumulator += now - state.prevTimestamp;
	state.prevTimestamp = now;
	while (state.accumulator > state.msInterval) {
		renderer.integrate(state.msInterval);
		state.accumulator -= state.msInterval;
	}
	const integrated = state.accumulator * state.inverseInterval;
	renderer.render(state.msInterval, integrated);
}
