export type { TimestepInterface, RendererInterface };
export { Timestep };

interface RendererInterface {
	integrate(intervalMs: number): void;
	render(intervalMs: number, integrationRemainderMs: number): void;
}

interface TimestepInterface {
	start(): void;
	stop(): void;
}

let min_step_6 = (1 / 6) * 1000;

class Timestep implements TimestepInterface {
	#timestamp = performance.now();
	#accumulator = 0;
	#receipt?: number;

	#rc: RendererInterface;
	#intervalMs: number;
	#boundLoop: (now: DOMHighResTimeStamp) => void;

	constructor(intervalMs: number, renderer: RendererInterface) {
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

	#loop(now: DOMHighResTimeStamp) {
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
