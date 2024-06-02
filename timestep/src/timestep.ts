
interface TimestepContextInterface {
  prevTimestamp: number;
  timestamp: number;
  intervalMs: number;
  accumulator: number;
}

interface RendererInterface {
  integrate: (ctx: TimestepContextInterface) => void;
  render: (ctx: TimestepContextInterface) => void;
}

interface TimestepInterface {
  start(ctx: TimestepContextInterface, renderer: RendererInterface): void;
  stop(): void;
}

class TimestepContext {
  prevTimestamp = performance.now();
  timestamp = performance.now();
  accumulator = 0;
  intervalMs = 10;

  constructor(intervalMs: number) {
    this.intervalMs = intervalMs;
  }
}

class Timestep implements TimestepInterface {
  #tc: TimestepContextInterface;
  #renderer: RendererInterface;
  receipt = -1;

  constructor(intervalMs: number, renderer: RendererInterface) {
    this.#tc = new TimestepContext(intervalMs)
    this.#renderer = renderer;
    this.loop = this.loop.bind(this);
  }

  start() {
    if (this.receipt !== -1) return;
    this.receipt = window.requestAnimationFrame(this.loop);
  }

  stop() {
    if (this.receipt === -1) return;
    this.receipt = -1;
    window.cancelAnimationFrame(this.receipt);
  }

  loop() {
    if (this.receipt === -1) return;

    // swap values
    this.#tc.prevTimestamp = this.#tc.timestamp;
    this.#tc.timestamp = performance.now();
    let delta = this.#tc.timestamp - this.#tc.prevTimestamp;

    this.#tc.accumulator += delta;
    while (this.#tc.accumulator > this.#tc.intervalMs) {
      this.#tc.accumulator -= this.#tc.intervalMs;
      this.#renderer.integrate(this.#tc);
    }

    this.receipt = window.requestAnimationFrame(this.loop);
  }
}

export { TimestepContext, Timestep };
