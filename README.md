# Timestep

An implementation of a fixed timestep.

## How to use


Use `TimestepContext` to create a context for the `Timestep` object

Create a `RenderContext` to provide callbacks for the `Timestep` object.

```
import {Timestep, TimestepContext} from "timestep/mod.ts";
import { Renderer } from "my-renderer/renderer.ts";

const ctx = new TimestepContext(90, 60);
const renderer = new Renderer();

const timestep = new Timestep();
timestep.start(ctx, renderer);
```

## License

BSD 3-Clause License
