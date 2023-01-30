import type { TimestepInterface } from "timestep_types.ts";


class Timestep implements TimestepInterface {
	ctx;
	renderCtx;
	
	receipt = -1;
	
	constructor(timestepCtx, renderCtx) {
		this.ctx = timestepCtx;
		this.renderCtx = renderCtx;
	}
	
  start() {
    if (this.receipt !== -1) return;
  	
    this.receipt = window.requestAnimationFrame(this.loop);
  }

  stop() {
    if (this.receipt === -1) return;
    
    window.cancelAnimationFrame(this.receipt);
    this.receipt = -1;
  }

	loop() {
		// swap values
    const prevTimestamp = this.ctx.timestamp;
    this.ctx.timestamp = performance.now();
    this.ctx.delta = this.ctx.timestamp - prevTimestamp;
    
    // get delta diff since last render
    // add to the time difference
    // offchance delta is less than timestep, skip
    this.ctx.accumulatorTime += this.ctx.delta;
    if (this.ctx.accumulatorTime < this.ctx.timestepInterval) {
      this.receipt = window.requestAnimationFrame(this.loop);
      return;
    }

    // iterate through fixed timestep intervals
    // delta on context will let integration step to decide physics requirements
    while (this.ctx.phsyicsAccumulator > this.ctx.physicsInterval) {
      this.ctx.phsyicsAccumulator -= this.ctx.physicsInterval;
      this.renderCtx.integrate(this.ctx);
    }

    // distance between last timestep
    // render after fps
    this.ctx.renderAccumulator += delta
    if (this.ctx.renderAccumulator > this.ctx.renderInterval) {
        this.renderCtx.render(this.ctx);
    }
    
    // reduce accumulator for next render
    while (this.ctx.renderAccumulator > this.ctx.renderInterval) {
			this.ctx.renderAccumulator - this.ctx.renderInterval;
		}
    
    // get another render
    this.receipt = window.requestAnimationFrame(this.loop);
	}
}
