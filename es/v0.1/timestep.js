// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

function createContext(physicsInterval, renderInterval) {
    return {
        prevTimestamp: performance.now(),
        timestamp: performance.now(),
        delta: 0,
        physicsAccumulator: 0,
        renderAccumulator: 0,
        physicsInterval,
        renderInterval
    };
}
class Timestep {
    ctx;
    renderer;
    receipt = -1;
    start(ctx, renderer) {
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
        this.ctx.prevTimestamp = this.ctx.timestamp;
        this.ctx.timestamp = performance.now();
        this.ctx.delta = this.ctx.timestamp - this.ctx.prevTimestamp;
        this.ctx.physicsAccumulator += this.ctx.delta;
        if (this.ctx.physicsAccumulator < this.ctx.physicsInterval) {
            this.receipt = window.requestAnimationFrame(this.loop);
            return;
        }
        while(this.ctx.physicsAccumulator > this.ctx.physicsInterval){
            this.ctx.physicsAccumulator -= this.ctx.physicsInterval;
            this.renderer.integrate(this.ctx);
        }
        this.ctx.renderAccumulator += this.ctx.delta;
        if (this.ctx.renderAccumulator > this.ctx.renderInterval) {
            this.renderer.render(this.ctx);
        }
        while(this.ctx.renderAccumulator > this.ctx.renderInterval){
            this.ctx.renderAccumulator - this.ctx.renderInterval;
        }
        this.receipt = window.requestAnimationFrame(this.loop);
    }
}
export { Timestep as Timestep, createContext as createContext };
