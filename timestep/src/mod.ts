interface AccumulatorImpl {
  timestamp: DOMHighResTimeStamp;
  accumulator: number;
}

interface IntegrationCallback {
  (accumlator: number): void;
}

interface TimestepImpl {
  start(): void;
  stop(): void;
}

class Accumulator implements AccumulatorImpl {
  timestamp = performance.now();
  accumulator = 0;
}

class Timestep implements TimestepImpl {
  #ac: AccumulatorImpl;
  #ic: IntegrationCallback;
  #receipt?: number = undefined;

  #boundLoop: (now: DOMHighResTimeStamp) => void;

  constructor(
    callback: IntegrationCallback,
  ) {
    this.#ac = new Accumulator();
    this.#ic = callback;
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
    this.#ac.accumulator += now - this.#ac.timestamp;

    // loop through steps in external integrate function
    // this way can skip or stop at a max step
    this.#ic(this.#ac.accumulator);
    this.#ac.timestamp = now;
    this.#receipt = window.requestAnimationFrame(this.#boundLoop);
  }
}

export type { TimestepImpl, IntegrationCallback };
export { Timestep };
