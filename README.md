# Timestep

A fixed timestep.

## How to use

### Renderer

Create an object that implements the following interface:

```ts
// my_renderer.ts

import type { RendererInterface } from "timestep";

class Renderer implements RendererInterface {
	integrate(intervalMs: number): void {
		// tick through physics step
	}

	render(intervalMs: number, remainderMs: number): void {
		// draw to canvas or update dom
	}
}
```

The `integrate` function is called between renders.

After integration, the `render` funtion is called and the timestep remainder is pass

### Timestep

Pass a `Renderer` to an instance of `Timestep`.

```ts
import { Timestep } from "timestep";
import { Renderer } from "my_renderer.ts";

let renderer = new Renderer();
const timestep = new Timestep(10, renderer);
```

Then call `start` or `stop` where appropriate.

```ts
timestep.start();
timestep.stop();
```

## License

BSD 3-Clause License
