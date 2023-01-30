interface TimestepContextInterface {
	prevTimestamp: number;
	timestamp: number;
	delta: number;
	physicsInterval: number;
	physicsAccumulator: number;
	renderInterval: number;
	renderAccumulator: number;
}

interface RenderInterface {
	integrate: (ctx: TimestepContextInterface) => void;
	render: (ctx: TimestepContextInterface) => void;
}

interface TimestepInterface {
	start(ctx: TimestepContextInterface, renderer: RenderInterface): void;
	stop(): void;
}

export type { RenderInterface, TimestepContextInterface, TimestepInterface }
