# Timestep

An implementation of a fixed timestep.

## How to use

Use `TimestepContext` to create a context for the `Timestep` object

Create a `RenderContext` to provide callbacks for the `Timestep` object.

```ts
import { Timestep } from "timestep/mod.ts";
import { Renderer } from "my/application/renderer.ts";

function Renderer(delta: number) {
    while
};

const timestep = new Timestep(renderer);
timestep.start();
```

## License

BSD 3-Clause License
