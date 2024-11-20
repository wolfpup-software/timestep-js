interface RendererImpl {
    integrate: (stepMs: number, intervalMs: number) => void;
    render: (lastStepMs: number, intervalMs: number) => void;
}
interface TimestepImpl {
    start(): void;
    stop(): void;
}
declare class Timestep implements TimestepImpl {
    #private;
    constructor(renderer: RendererImpl, intervalMs: number);
    start(): void;
    stop(): void;
}
export type { TimestepImpl, RendererImpl };
export { Timestep };
