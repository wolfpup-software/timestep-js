class Renderer {
	integrate(intervalMs) {
		console.log("integrate!", intervalMs);
	}

	render(intervalMs, integrationRemainderMs) {
		console.log("render", intervalMs, integrationRemainderMs);
	}
}

export { Renderer };
