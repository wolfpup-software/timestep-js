import { Timestep } from "./timestep.js";
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
class Renderer {
    integrateCount = 0;
    renderCount = 0;
    integrate(msInterval) {
        this.integrateCount += 1;
    }
    render(msInterval, integrationRemainderMs) {
        this.renderCount += 1;
    }
    error(e) { }
}
async function testIntegrationAndRender() {
    const assertions = [];
    const renderer = new Renderer();
    const timestep = new Timestep({ renderer, msInterval: 10 });
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
