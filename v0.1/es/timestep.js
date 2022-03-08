class FixedTimestep {
  status = "STOPPED";
  accumulatorTime = 0;
  receipt = -1;
  time = 0;
  totalTime = 0;
  ctx;
  constructor(ctx) {
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
  loop = () => {
    const prevTime = this.time;
    this.time = performance.now();
    const delta = this.time - prevTime;
    if (delta > this.ctx.maxTimestep) {
      this.accumulatorTime = this.ctx.maxTimestep;
    } else {
      this.accumulatorTime += delta;
    }
    while (this.accumulatorTime >= this.ctx.timestepInterval) {
      this.ctx.integrate(this.totalTime, this.accumulatorTime);
      this.totalTime += this.ctx.timestepInterval;
      this.accumulatorTime -= this.ctx.timestepInterval;
    }
    const alpha = this.accumulatorTime / this.ctx.timestepInterval;
    this.ctx.render(this.totalTime, alpha);
    this.receipt = window.requestAnimationFrame(this.loop);
  };
}
export { FixedTimestep as FixedTimestep };
