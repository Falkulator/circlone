function Part(x,y,r,c) {

	this.shape = new p2.Circle(r);// store shapes make less objects
	this.mass = Math.PI*r*r;
	this.r = r;

    this.body = new p2.Body({
            mass:this.mass,
            position:[x,y]
        });
    this.body.ballType = c;
    this.body.addShape(this.shape);
    world.addBody(this.body);

    // Draw 
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(c, 0.5);
    this.graphics.drawCircle(0,0,this.r);


    container.addChild(this.graphics);
    entities.push(this)

}

Part.prototype.animate = function() {
    // Transfer positions of the physics objects to Pixi.js
    

    this.graphics.position.x = this.body.position[0];
    this.graphics.position.y = this.body.position[1];
    this.graphics.rotation =   this.body.angle;

}

Part.prototype.update = function() {
    this.swirl();
    this.goCenter();
}

Part.prototype.goCenter = function() {
    var xc = renderer.width/2,
        yc = -renderer.height/2,
        dx = xc - this.body.position[0],
        dy = yc - this.body.position[1] ,
        k = 350,
        d = Math.sqrt(dx*dx +dy*dy),
        m = this.mass;


    this.body.force[0] += (k * dx)/(d);
    this.body.force[1] += (k * dy)/(d);
}

Part.prototype.swirl = function() {
    var xc = renderer.width/2,
        yc = -renderer.height/2,
        dx = xc - this.body.position[0],
        dy = yc - this.body.position[1] ,
        k = 100,
        d = Math.sqrt(dx*dx +dy*dy),
        m = this.mass;


    this.body.force[0] += (k * dy)/(d);
    this.body.force[1] -= (k * dx)/(d);
}