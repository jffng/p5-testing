var Particle = function (xPosition, yPosition, color) {
	this.mass = Math.random(1, 4);
	this.location = new PVector(xPosition, yPosition);
	this.velocity = new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.c = color;
};

Particle.prototype.applyForce = function (force) {
	var f = PVector.div(force, this.mass);
	this.acceleration.add(f);
};

Particle.prototype.update = function () {
	this.velocity.add(this.acceleration);
	this.location.add(this.velocity);
	this.acceleration.mult(0);
	this.velocity.limit(6);
};

Particle.prototype.display = function(particleSize) {
	noStroke();
	fill(this.c, 150);
	ellipse(this.location.x, this.location.y, particleSize, particleSize);
};