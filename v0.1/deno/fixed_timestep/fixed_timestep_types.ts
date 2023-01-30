// brian taylor vann
// fixed timestep types


// need something for 

interface RenderInterface<S> {
	prevState: S;
	currentState: S;
	render: () => void;
}

interface SpillOver {
	maxTimestepInterval
	timestepInterval
	prevTime
	deltaTime
}

interface TimestepContextInterface {
  timestepInterval: number;
  
  maxTimestep: number; // minimum frames before stutter
  integrate: (deltaTime: number) => void;
  render: (timestep: number, alpha: number) => void;
}

  integrate: (deltaTime: number) => void;
  render: (timestep: number, alpha: number) => void;

type TimestepStatus = "STOPPED" | "STARTED";

interface TimestepInterface {
	ctx: TimestepContextInterface;
  status: TimestepStatus;
  start(): void;
  stop(): void;
}

  start(): void;
  stop(): void;

export type { TimestepContextInterface, TimestepInterface, TimestepStatus };
