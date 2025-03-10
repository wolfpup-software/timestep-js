// ON THE CLIENT
// const worker = new Worker("./worker.js");

// console.log(worker);

// const htmlCanvas = document.querySelector("canvas");
// const offscreen = htmlCanvas.transferControlToOffscreen();

// worker.addEventListener("message", function(e) {
// 	console.log(e);
// 	console.log(e.type);
// 	console.log(e.data);
// })

// worker.addEventListener("error", function(e) {
// 	console.log(e);
// 	console.log(e.type);
// 	console.log(e.data);
// })

// worker.postMessage({ canvas: offscreen }, [offscreen]);

// IN THE WORKER
// import { Timestep } from "timestep";
// importScripts("../dist/mod.js");

let canvas = null;
let ctxWorker = null;

// Waiting to receive the OffScreenCanvas
self.onmessage = (event) => {
	canvas = event.data.canvas;
	ctxWorker = canvas.getContext("2d");
};

// Start the counter for Canvas B

// importScripts("timestep");
self.postMessage("hello!!");
