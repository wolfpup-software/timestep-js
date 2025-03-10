import { Timestep } from "timestep";
import { Renderer } from "./renderer.js";

const canvas = document.querySelector("canvas");

const renderer = new Renderer();
const timestep = new Timestep(10, renderer);

timestep.start();

setTimeout(function () {
	timestep.stop();
}, 1000);
