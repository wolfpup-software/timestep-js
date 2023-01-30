interface RenderInterface<S> {
	integrate: () => void;
	render: () => void;
}

interface TimestepContext {
	maxTimestep: number;
	physicsInterval: number;
}

