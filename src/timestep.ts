interface RendererImpl {
	integrate: (stepMs: number, intervalMs: number) => void;
	render: (lastStepMs: number, intervalMs: number) => void;
}

interface TimestepImpl {
	start(): void;
	stop(): void;
}

let min_step_6 = (1 / 6) * 1000;

class Timestep implements TimestepImpl {
	#timestamp = performance.now();
	#time = 0;
	#accumulator = 0;
	#receipt?: number = undefined;

	#rc: RendererImpl;
	#intervalMs: number;
	#boundLoop: (now: DOMHighResTimeStamp) => void;

	constructor(renderer: RendererImpl, intervalMs: number) {
		this.#rc = renderer;
		this.#intervalMs = Math.max(min_step_6, intervalMs);
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
			this.#rc.integrate(this.#time, this.#intervalMs);

			this.#accumulator -= this.#intervalMs;
			this.#time += this.#intervalMs;
		}

		this.#rc.render(this.#accumulator, this.#intervalMs);
		this.#receipt = window.requestAnimationFrame(this.#boundLoop);
	}
}

export type { TimestepImpl, RendererImpl };
export { Timestep };
