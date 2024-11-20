let min_step_6 = (1 / 6) * 1000;
class Timestep {
    #timestamp = performance.now();
    #time = 0;
    #accumulator = 0;
    #receipt = undefined;
    #rc;
    #intervalMs;
    #boundLoop;
    constructor(renderer, intervalMs) {
        this.#rc = renderer;
        this.#intervalMs = Math.max(min_step_6, intervalMs);
        this.#boundLoop = this.#loop.bind(this);
    }
    start() {
        if (this.#receipt)
            return;
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
            this.#rc.integrate(this.#time, this.#intervalMs);
            this.#accumulator -= this.#intervalMs;
            this.#time += this.#intervalMs;
        }
        this.#rc.render(this.#accumulator, this.#intervalMs);
        this.#receipt = window.requestAnimationFrame(this.#boundLoop);
    }
}
export { Timestep };
