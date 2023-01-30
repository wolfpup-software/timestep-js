import type {
  RendererInterface,
  TimestepContextInterface,
  TimestepInterface,
} from "../type_flyweight/timestep.ts";

function createContext(
  physicsInterval: number,
  renderInterval: number,
): TimestepContextInterface {
  return {
    prevTimestamp: performance.now(),
    timestamp: performance.now(),
    delta: 0,
    physicsAccumulator: 0,
    renderAccumulator: 0,
    physicsInterval,
    renderInterval,
  };
}

class Timestep implements TimestepInterface {
  ctx!: TimestepContextInterface;
  renderer!: RendererInterface;

  // specfic to browser animation frames
  receipt = -1;

  start(ctx: TimestepContextInterface, renderer: RendererInterface) {
    if (this.receipt !== -1) return;

    this.ctx = ctx;
    this.renderer = renderer;
    this.receipt = window.requestAnimationFrame(this.loop);
  }

  stop() {
    if (this.receipt === -1) return;

    window.cancelAnimationFrame(this.receipt);
    this.receipt = -1;
  }

  loop() {
    // swap values
    this.ctx.prevTimestamp = this.ctx.timestamp;
    this.ctx.timestamp = performance.now();
    this.ctx.delta = this.ctx.timestamp - this.ctx.prevTimestamp;

    // get delta diff since last render
    // add to the time difference
    // offchance delta is less than timestep, skip
    this.ctx.physicsAccumulator += this.ctx.delta;
    if (this.ctx.physicsAccumulator < this.ctx.physicsInterval) {
      this.receipt = window.requestAnimationFrame(this.loop);
      return;
    }

    // iterate through fixed timestep intervals
    // delta on context will let integration step to decide physics requirements
    while (this.ctx.physicsAccumulator > this.ctx.physicsInterval) {
      this.ctx.physicsAccumulator -= this.ctx.physicsInterval;
      this.renderer.integrate(this.ctx);
    }

    // distance between last timestep
    // render after fps
    this.ctx.renderAccumulator += this.ctx.delta;
    if (this.ctx.renderAccumulator > this.ctx.renderInterval) {
      this.renderer.render(this.ctx);
    }

    // reduce accumulator for next render
    while (this.ctx.renderAccumulator > this.ctx.renderInterval) {
      this.ctx.renderAccumulator - this.ctx.renderInterval;
    }

    // get another render
    this.receipt = window.requestAnimationFrame(this.loop);
  }
}

export { createContext, Timestep };
