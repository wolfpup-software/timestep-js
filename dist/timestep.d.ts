export type { TimestepInterface, RendererInterface };
export { Timestep };
interface RendererInterface {
    integrate(intervalMs: number): void;
    render(intervalMs: number, remainderDelta: number): void;
    error(err: Error): void;
}
interface TimestepInterface {
    start(): void;
    stop(): void;
}
interface Params {
    renderer: RendererInterface;
    maxIntegrationMS?: number;
    intervalMs?: number;
}
declare class Timestep implements TimestepInterface {
    #private;
    constructor(params: Params);
    start(): void;
    stop(): void;
}
