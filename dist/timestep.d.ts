export type { TimestepInterface, RendererInterface };
export { Timestep };
interface RendererInterface {
	integrate(intervalMs: number): void;
	render(intervalMs: number, integrationRemainderMs: number): void;
}
interface TimestepInterface {
	start(): void;
	stop(): void;
}
declare class Timestep implements TimestepInterface {
	#private;
	constructor(intervalMs: number, renderer: RendererInterface);
	start(): void;
	stop(): void;
}
