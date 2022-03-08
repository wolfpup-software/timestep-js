// brian taylor vann
// fixed timestep types

interface TimestepContextInterface {
  timestepInterval: number;
  maxTimestep: number; // minimum frames before stutter
  integrate: (totalTime: number, deltaTime: number) => void;
  render: (timestep: number, alpha: number) => void;
}

interface TimestepInterface {
  status: TimestepStatus;
  start(): void;
  stop(): void;
}

type TimestepStatus = "STOPPED" | "STARTED";

export type { TimestepContextInterface, TimestepInterface, TimestepStatus };
