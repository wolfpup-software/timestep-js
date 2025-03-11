export type { TimestepInterface, RendererInterface };
export { Timestep };
interface RendererInterface {
    integrate(msInterval: number): void;
    render(msInterval: number, remainderDelta: number): void;
    error(err: Error): void;
}
interface TimestepInterface {
    start(): void;
    stop(): void;
}
interface Params {
    renderer: RendererInterface;
    msMaxIntegration?: number;
    msInterval?: number;
}
declare class Timestep implements TimestepInterface {
    #private;
    constructor(params: Params);
    start(): void;
    stop(): void;
}
