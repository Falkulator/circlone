function Part(x,y,r,c) {

	this.shape = new p2.Circle(r);// store shapes make less objects
	this.mass = Math.PI*r*r;
	this.r = r;


    this.body = new p2.Body({
            mass:this.mass,
            position:[x,y]
        });
    this.body.ballType = c;
    this.body.entity = this;
    this.body.stuck = false;
    this.body.addShape(this.shape);
    world.addBody(this.body);

    this.attached = [];


    // Draw 
    this.sprite = new PIXI.Sprite(balltex);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.alpha = 0.5;
    this.sprite.scale.set(r/IMAGE_SCALING);
    this.sprite.tint = parseInt(c, 16);

    this.constraints = [];
    container.addChild(this.sprite);
    entities.push(this)

}

Part.prototype.animate = function() {
    // Transfer positions of the physics objects to Pixi.js
    

    this.sprite.position.x = this.body.position[0];
    this.sprite.position.y = this.body.position[1];
    this.sprite.rotation =   this.body.angle;

    this.sprite.scale.set(this.r/IMAGE_SCALING);

}

Part.prototype.update = function() {
    this.swirl();
    this.goCenter();
    if (this.attached.length>1) {
        this.checkAttached();
    };
}

Part.prototype.goCenter = function() {
    var xc = renderer.width/2,
        yc = -renderer.height/2,
        dx = xc - this.body.position[0],
        dy = yc - this.body.position[1] ,
        k = Game.centerForce,
        d = Math.sqrt(dx*dx +dy*dy),
        m = this.mass;


    this.body.force[0] += this.mass * (k * dx)/(d);
    this.body.force[1] += this.mass * (k * dy)/(d);
}

Part.prototype.swirl = function() {
    var xc = renderer.width/2,
        yc = -renderer.height/2,
        dx = xc - this.body.position[0],
        dy = yc - this.body.position[1] ,
        k = Game.swirlForce,
        d = Math.sqrt(dx*dx +dy*dy),
        m = this.mass;


    this.body.force[0] += this.mass * (k * dy)/(d);
    this.body.force[1] -= this.mass * (k * dx)/(d);
}

Part.prototype.stick = function(e) {
    var c = new p2.DistanceConstraint(this.body, e.body);
    this.constraints.push(c);
    world.addConstraint(c);
    e.stuck = true;
    if (this.attached.length > 0) {
        var p = this.attached.pop();

        if (this.attached.length > 0) {

        } else {
            if (p.body.ballType == e.body.ballType) {
                this.body.ballType = false;
                this.matchedPair(p.body.ballType);
            } else {
                var c = this.getColorMix(e,p);
                this.colorChange(c);
                p.shrink();
                e.shrink();
                this.body.ballType = c;
                this.removeConstraints();
            }

        }
    };
    this.attached.push(e);
}

Part.prototype.colorChange = function(c) {
    var d = Game.animationDuration;
    TweenLite.to(this.sprite, d, {tint: parseInt(c, 16), ease:Expo.easeOut});
    var t = TweenLite.to(this.sprite, d, {alpha:0.9, yoyo:true, repeat:1, ease:Power2.easeInOut});


}

Part.prototype.getColorMix = function(e, p) {
    var ec = e.body.ballType,
        pc = p.body.ballType;

    if (ec == hexColor.red || pc == hexColor.red) {
        if (ec == hexColor.blue || pc == hexColor.blue) {
            return hexColor.purple;
        }
        else if (ec == hexColor.yellow || pc == hexColor.yellow) {
            return hexColor.orange;
        }
    }
    if (ec == hexColor.blue || pc == hexColor.blue) {
        if (ec == hexColor.yellow || pc == hexColor.yellow) {
            return hexColor.green;
        }
    }
}

Part.prototype.shrink = function() {
    var d = Game.animationDuration;
    var t = TweenLite.to(this, d, {r: 0, ease:Expo.easeInOut});

    TweenLite.to(this.body.shapes[0], d, {radius: 0, ease:Expo.easeInOut});

    t.eventCallback("onComplete", this.remove, [this]);
}


Part.prototype.removeConstraints = function() {
    for (var i=0;i<this.constraints.length;i++) {
        var c = this.constraints[i];
        world.removeConstraint(c);
    }
} 

Part.prototype.matchedPair = function(c) {
    if (c == hexColor.blue) {
        TweenMax.to(Game, 20, {swirlForce: -Game.swirlMax, ease:Power2.easeInOut});
    }
    else if (c == hexColor.red) {

    }
}

Part.prototype.remove = function(o) {
    world.removeBody(o.body);
    container.removeChild(o.sprite);
    var i = entities.indexOf(o);
    entities.splice(i,1);
}