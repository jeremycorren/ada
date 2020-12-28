const snowColors = [
	'rgba(255, 255, 255, 0.5)',
	'rgba(232, 235, 239, 0.5)',
	'rgba(197, 200, 204, 0.5)',
	'rgba(215, 226, 239, 0.5)',
	'rgba(219, 219, 219, 0.5)'
];

class Circle {
	constructor(x, y, r, velocity, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.initR = r;
		this.velocity = {
			y: randomDelta(velocity)
		};
		this.color = randomFrom(snowColors);
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
	}

	update() {
		if (touchesBorder(this.x, this.r, canvas.width)) {
			this.velocity.x = -this.velocity.x;
		}

		if (touchesBorder(this.y, this.r, canvas.height)) {
			this.velocity.y = -this.velocity.y;
		}

		this.y += this.velocity.y;

		if (mouse.x - this.x < 20 && mouse.x - this.x > -20
				&& mouse.y - this.y < 20 && mouse.y - this.y > -20) {
			if (this.r < 15) {
				this.r += 0.5;
			}
		} else {
			if (this.r > this.initR) {
				this.r -= 0.5;
			}
		}

		this.draw();
	}
}

class Builder {
	constructor(density) {
		this.density = density;
	}

	minRadius(minRadius) {
		this.minRadius = minRadius;
		return this;
	}

	maxRadius(maxRadius) {
		this.maxRadius = maxRadius;
		return this;
	}

	velocity(velocity) {
		this.velocity = velocity;
		return this;
	}
}

const randomFrom = (array) => array[Math.floor(Math.random() * array.length)];

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);

const randomDelta = (factor) => (Math.random() - 0.5) * factor;

const distanceBetween = (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const touchesBorder = (axis, r, measure) => axis + r > measure || axis - r < 0;

const makeCircles = (builder) => {
	units = []
	for (let i = 0; i < builder.density; i++) {
		let r = randomBetween(builder.minRadius, builder.maxRadius);
		let rSquared = r * 2;
		let x = randomBetween(canvas.width, rSquared);
		let y = randomBetween(canvas.height, rSquared)
		
		if (i > 0) {
			for (let j = 0; j < units.length; j++) {
				if (distanceBetween(x, y, units[j].x, units[j].y) - rSquared < 0) {
					x = randomBetween(canvas.width, rSquared);
					y = randomBetween(canvas.height, rSquared);

					j = -1;
				}
			}
		}

		units.push(new Circle(x, y, r, builder.velocity, builder.color));
	}
	return units;
}