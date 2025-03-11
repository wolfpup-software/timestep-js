/*
	Example of an Interpolatable Value.
	
	A "value" is a tuple defined by [prev state, current state].

	"Translation" needs to move both values in a tuple.
	
	Interpolation returns the previous state and a percentage of the
	difference defined by a delta value between [0-1].
*/

export class InterpolatableValue {
	#x; // [previous value, current value]

	constructor(val) {
		this.#x = [val, val];
	}

	get value() {
		return this.#x[1];
	}

	add(val) {
		this.#x[0] = this.#x[1];
		this.#x[1] += val;
	}

	translate(val) {
		let delta = this.#x[1] - val;
		this.#x[0] -= delta;
		this.#x[1] -= delta;
	}

	interpolate(delta) {
		// x0 + ((x1 - x0) * delta)
		return this.#x[0] + (this.#x[1] - this.#x[0]) * delta;
	}
}
