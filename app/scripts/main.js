   
    $(window).resize(resize)
    window.onorientationchange = resize;


    var renderer, 
    container, 
    zoom,         
    world,
    input,
    t,
    dt,
    lastTime = 0,
    entities = [],
    spawners = [],
    balltex,
    IMAGE_SCALING = 25;

    var Game = {
        width: 800,
        height: 600,
        swirlMax: 4,
        swirlForce: 4,
        centerMax: 10,
        centerForce: 5,
        animationDuration: 3,
        r: 3

    }

    var hexColor = {
            blue: '0x0066FF',
            red: '0xD11919',
            white: '0xFFFFFF',
            green: '0x66FF00',
            purple: '0x8A008A',
            orange: '0xFF9900',
            yellow: '0xFFFF66'
        }


    function init(){

        var ballTexture = new PIXI.Texture.fromImage("images/ball.png")
        balltex = new PIXI.Texture(ballTexture.baseTexture, new PIXI.math.Rectangle(0, 0, 50, 50));
        // Init p2.js
        world = new p2.World({ gravity : [0, 0]});



        // Pixi.js zoom level
        zoom = 1;

        // Initialize the stage
        renderer =  PIXI.autoDetectRenderer(window.width, window.height);

        Input.init();

        container =  new PIXI.Container();


        // Add the canvas to the DOM
        document.body.appendChild(renderer.view);

        stats = new Stats();
    
    
        document.body.appendChild( stats.domElement );
        stats.domElement.style.position = "absolute";
        stats.domElement.style.top = "0px";


        container.scale.x =  zoom;  // zoom in
        container.scale.y = -zoom; // Note: we flip the y axis to make "up" the physics "up"
        
        resize();

        // Create bottom plane
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            position : [0,-renderer.height],
        });
        plane.addShape(planeShape);
        world.addBody(plane);

        // Left plane
        var planeLeft = new p2.Body({
            angle: -Math.PI/2,
            position: [0, 0]
        });
        planeLeft.addShape(planeShape);
        world.addBody(planeLeft);

        // Right plane
        var planeRight = new p2.Body({
            angle: Math.PI/2,
            position: [renderer.width, 0]
        });
        planeRight.addShape(planeShape);
        world.addBody(planeRight);

        // top plane
        var planeShape = new p2.Plane();
        var plane = new p2.Body({
            angle: Math.PI,
            position : [0,0],
        });
        plane.addShape(planeShape);
        world.addBody(plane);

        var s1 = new Spawner(renderer.width/4, -renderer.height/2, hexColor.red);
        var s2 = new Spawner(renderer.width/2 + renderer.width/4, -renderer.height/2, hexColor.blue);
  
        manageTweens();

        //collision events
        world.on("beginContact",function(event){
         
            if (event.bodyA.ballType == event.bodyB.ballType){

            }
            else if (!event.shapeA.radius || !event.shapeB.radius) {//wall
                
            }
            else if (event.bodyA.ballType != event.bodyB.ballType){
                if (event.bodyA.ballType == hexColor.white || event.bodyB.ballType == hexColor.white) {
                    if (event.bodyA.ballType == hexColor.white && !event.bodyB.stuck) {
                        console.log(123)
                        event.bodyA.entity.stick(event.bodyB.entity)
                    } else if (!event.bodyA.stuck){
                        console.log(123)
                        event.bodyB.entity.stick(event.bodyA.entity)
                    }
                }
                


            }
        });

    }

    function resize()
    {

        Game.width = $(window).width(); 
        Game.height = $(window).height(); 
        
        
        var w = $(window).width() / 2 - Game.width/2;
        var h = $(window).height() / 2 - Game.height/2;
        
        renderer.view.style.left = $(window).width() / 2 - Game.width/2 + "px"
        renderer.view.style.top = $(window).height() / 2 - Game.height/2 + "px"
        
        // stats.domElement.style.left = w + "px";
        // stats.domElement.style.top = h + "px";
        

        

        
        renderer.resize(Game.width, Game.height);
    }

    function update() {
        for (var i=0;i<entities.length; i++) {
            entities[i].update();
        }
        for (var i=0;i<spawners.length; i++) {
            spawners[i].update();
        }
        if (Input.mouseDown) {
            var i = Input.currentMousePos;
            if (Input.clicked) {
                //var b = new Part(i.x, i.y, 1 + Math.random()*5, hexColor.green);
                var b = new Part(i.x, i.y, 5, hexColor.white);
                Input.clicked = false;
            };
            
        }
        
    }


    // Animation loop
    function animate(t){

        stats.begin();
        t = t || 0;
        update();
        requestAnimationFrame(animate);

        // Move physics bodies forward in time
        world.step(1/60);
        for (var i=0;i<entities.length; i++) {
           entities[i].animate();
        }

        // Render scene
        renderer.render(container);
        stats.end();
        dt = t - lastTime;

        lastTime = t;


    }

    function manageTweens() {

        // TweenMax.to(Game, 40, {centerForce: Game.centerMax, repeat:-1, yoyo:true, ease:Power2.easeInOut});
        // TweenMax.to(Game, 40, {swirlForce: -Game.swirlMax, repeat:-1, repeatDelay:10, yoyo:true, ease:Power2.easeInOut});

        //TweenMax.to(Game, 40, {centerForce: Game.centerMax, repeat:-1, yoyo:true, ease:Power2.easeInOut});
        TweenMax.to(Game, 20, {r: 6, repeat:-1, repeatDelay:10, yoyo:true, ease:Power2.easeOut});

    
    }



    init();
    animate();



