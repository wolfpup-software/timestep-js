interface TimestepContextImpl {
  prevTimestamp: number;
  timestamp: number;
  intervalMs: number;
  accumulator: number;
}

interface RendererImpl {
  integrate: (ctx: TimestepContext) => void;
  render: (ctx: TimestepContext) => void;
}

interface TimestepImpl {
  start(ctx: TimestepContext, renderer: RendererImpl): void;
  stop(): void;
}

class TimestepContext implements TimestepContextImpl {
  prevTimestamp = performance.now();
  timestamp = performance.now();
  accumulator = 0;
  intervalMs = 10;

  constructor(intervalMs: number) {
    this.intervalMs = intervalMs;
  }
}

class Timestep implements TimestepImpl {
  #tc: TimestepContextImpl;
  #rc: RendererImpl;
  receipt = -1;

  constructor(intervalMs: number, renderer: RendererImpl) {
    this.#tc = new TimestepContext(intervalMs);
    this.#rc = renderer;
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

    this.#tc.prevTimestamp = this.#tc.timestamp;
    this.#tc.timestamp = performance.now();

    let delta = this.#tc.timestamp - this.#tc.prevTimestamp;
    this.#tc.accumulator += delta;

    while (this.#tc.accumulator > this.#tc.intervalMs) {
      this.#tc.accumulator -= this.#tc.intervalMs;
      this.#rc.integrate(this.#tc);
    }

    this.receipt = window.requestAnimationFrame(this.loop);
  }
}

export type { TimestepContextImpl, TimestepImpl, RendererImpl };
export { TimestepContext, Timestep };
