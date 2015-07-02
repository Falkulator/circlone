var Input = {
	
}

Input.init = function() {
	this.clicked = true;

	this.mouseDown = false;
	this.currentMousePos = {x:-1, y:-1};

	$(renderer.view).mousedown(function(event){
		Input.mouseDown = true;
	});
	
	$(renderer.view).mouseup(function(event){
		Input.mouseDown = false;
		Input.clicked = true;

	})
	
	$(renderer.view).mousemove(function(event){

		Input.currentMousePos.x = event.pageX;
  		Input.currentMousePos.y = -event.pageY;

	})

	var spaceBar = keyboard(32);
	spaceBar.press = function() {

	};


	spaceBar.release = function() {

	};

	var gKey = keyboard(71);
	gKey.press = function() {

  		
	};
	gKey.release = function() {
	
	};

	var fKey = keyboard(70);
	fKey.press = function() {
		
	};
	fKey.release = function() {

	};
	
	
	

	
}



function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}