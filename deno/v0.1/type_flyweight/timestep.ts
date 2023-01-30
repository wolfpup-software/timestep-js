interface TimestepContextInterface {
	prevTimestamp: number;
	timestamp: number;
	delta: number;
	physicsInterval: number;
	physicsAccumulator: number;
	renderInterval: number;
	renderAccumulator: number;
}

interface RendererInterface {
	integrate: (ctx: TimestepContextInterface) => void;
	render: (ctx: TimestepContextInterface) => void;
}

interface TimestepInterface {
	start(ctx: TimestepContextInterface, renderer: RendererInterface): void;
	stop(): void;
}

export type { RendererInterface, TimestepContextInterface, TimestepInterface }
