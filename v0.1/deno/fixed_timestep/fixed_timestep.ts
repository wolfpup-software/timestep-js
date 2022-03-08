// brian taylor vann
// timestep

import type {
  TimestepContextInterface,
  TimestepInterface,
  TimestepStatus,
} from "./fixed_timestep_types.ts";

class FixedTimestep implements TimestepInterface {
  status: TimestepStatus = "STOPPED";

  private accumulatorTime = 0;
  private receipt = -1;
  private time = 0;
  private totalTime = 0;

  private ctx: TimestepContextInterface;

  constructor(ctx: TimestepContextInterface) {
    this.ctx = ctx;
  }

  start() {
    if (this.status === "STARTED") return;

    this.status = "STARTED";
    this.receipt = window.requestAnimationFrame(this.loop);
  }

  stop() {
    if (this.status === "STOPPED" && this.receipt !== -1) return;

    this.status = "STOPPED";
    window.cancelAnimationFrame(this.receipt);
  }

  private loop = () => {
    // swap values
    const prevTime = this.time;
    this.time = performance.now();

    // get delta diff since last render
    // add to the time difference
    const delta = this.time - prevTime;

    // off chance delta time is less than interval
    // if (delta < this.ctx.timestepInterval) {
    //   this.receipt = window.requestAnimationFrame(this.loop);
    // }

    // Compound delta time or max out
    if (delta > this.ctx.maxTimestep) {
      this.accumulatorTime = this.ctx.maxTimestep;
    } else {
      this.accumulatorTime += delta;
    }

    // iterate through fixed timestep intervals
    while (this.accumulatorTime >= this.ctx.timestepInterval) {
      this.ctx.integrate(this.totalTime, this.accumulatorTime);
      this.totalTime += this.ctx.timestepInterval;
      this.accumulatorTime -= this.ctx.timestepInterval;
    }

    // distance between last timestep
    const alpha = this.accumulatorTime / this.ctx.timestepInterval;
    this.ctx.render(this.totalTime, alpha);

    // get another render
    this.receipt = window.requestAnimationFrame(this.loop);
  };
}

export { FixedTimestep };
