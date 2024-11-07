# Timestep

An implementation of a fixed timestep.

## How to use

```ts
import { Timestep } from "timestep/mod.ts";

import { Renderer } from "my/application/renderer.ts";

let renderer = new Renderer();

const timestep = new Timestep(renderer, 10);

timestep.start();

timestep.stop();
```

## License

BSD 3-Clause License
