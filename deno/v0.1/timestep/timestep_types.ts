interface RenderInterface {
	integrate: (ctx: TimestepContext) => void;
	render: (ctx: TimestepContext) => void;
}

interface TimestepContext {
	timestamp: number;
	delta: number;
	physicsInterval: number;
	physicsAccumulator: number;
	renderInterval: number;
	renderAccumulator: number;
}

export { RenderInterface, TimestepContext }
