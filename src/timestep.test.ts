import type { RendererImpl } from "./timestep.js";

import { Timestep } from "./timestep.js";

// create a render
// create a time step

// run time step for 1 second

// make sure many integrations occured
// make sure multiple renders occured

function sleep(time: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

class Renderer implements RendererImpl {
	integrateCount: number = 0;
	renderCount: number = 0;

	integrate(stepMs: number, intervalMs: number) {
		this.integrateCount += 1;
	}

	render() {
		this.renderCount += 1;
	}
}

async function testIntegrationAndRender() {
	const assertions = [];

	const renderer = new Renderer();
	const timestep = new Timestep(renderer, 10);

	timestep.start();

	await sleep(1000);

	timestep.stop();

	if (renderer.integrateCount < 100) {
		assertions.push("failed to integrate enough times");
	}

	if (renderer.renderCount < 10) {
		assertions.push("failed to render enough times");
	}

	return assertions;
}

export const tests = [testIntegrationAndRender];

export const options = {
	title: import.meta.url,
};
