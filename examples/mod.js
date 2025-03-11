import { Timestep } from "timestep";
import { Renderer } from "./renderer.js";

const canvas = document.querySelector("canvas");
let rect = canvas.getBoundingClientRect();

const renderer = new Renderer(canvas);
const timestep = new Timestep({ renderer, intervalMs: 10 });

timestep.start();

setTimeout(function () {
	timestep.stop();
}, 5000);
