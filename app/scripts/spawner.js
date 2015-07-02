function Spawner(x,y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.time = 0;
	spawners.push(this);
}

Spawner.prototype.update = function() {
	this.time += dt || 0;
	if (this.time > 1000) {
		var p = new Part(this.x, this.y, Game.r, this.color);
		// if (this.x > renderer.width/2) {
		// 	p.body.force[1] -= 10;
		// } else {
		// 	p.body.force[1] += 10;
		// }
		this.time = 0;
	}

}

