export { Timestep };
let MIN_STEP = 1;
class Timestep {
    #renderer;
    #state;
    #boundLoop;
    constructor(params) {
        this.#boundLoop = this.#loop.bind(this);
        let { renderer, intervalMs, maxIntegrationMS } = params;
        this.#renderer = renderer;
        this.#state = getState(intervalMs, maxIntegrationMS);
    }
    start() {
        if (this.#state.receipt)
            return;
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
function getState(intrvlMs = MIN_STEP, maxIntegrationMS = 250) {
    let intervalMs = Math.max(intrvlMs, MIN_STEP);
    let inverseInterval = 1 / intervalMs;
    return {
        accumulator: 0,
        intervalMs,
        inverseInterval,
        maxIntegrationMS: maxIntegrationMS ?? 250,
        prevTimestamp: undefined,
        receipt: undefined,
    };
}
function integrateAndRender(renderer, state, now) {
    const delta = now - state.prevTimestamp;
    if (delta > state.maxIntegrationMS) {
        renderer.error(new Error("Timestep exceeded maximum integration time."));
    }
    state.accumulator += now - state.prevTimestamp;
    state.prevTimestamp = now;
    while (state.accumulator > state.intervalMs) {
        renderer.integrate(state.intervalMs);
        state.accumulator -= state.intervalMs;
    }
    const integrated = state.accumulator * state.inverseInterval;
    renderer.render(state.intervalMs, integrated);
}
