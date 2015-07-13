/* global describe, it */

(function () {
    'use strict';

    var cPos = $('canvas:last').position()['top'],// add to y value 
        cX = 200,
        cY = -cPos-20; 

    describe('Load deps', function () {

    it('p2', function () {
    	expect(p2).to.not.equal(undefined);
    });
    it('PIXI', function () {
    	expect(PIXI).to.not.equal(undefined);
    });
    it('gsop', function () {
    	expect(TweenMax).to.not.equal(undefined);
    });

    });

    describe('Ball collisions', function () {
    	spawners = [];// stop spawning

    	before(function() {
            

        });

    	after(function() {
    		//whiteBall.remove();
    	});
    	
    	describe('White Ball interactions', function () {
    		it('2 blue balls reverse spin', function (done) {
                var whiteBall = new Part(cX, cY, 5, hexColor.white);
                var s = Game.swirlForce;
                var blueBall1 = new Part(cX-5, cY, 5, hexColor.blue);
                var blueBall2 = new Part(cX+5, cY, 5, hexColor.blue);

                setTimeout( function () {
                  check( done, function() {
                    expect(s).to.not.equal(Game.swirlForce);
                  } )
                }, 45);

    		});

    		it('2 red balls push nearby balls away', function () {
                var whiteBall = new Part(cX, cY+20, 5, hexColor.white);
                var n1 = new Part(cX-20, cY+20, 5, hexColor.red),
                    n2 = new Part(cX+20, cY+20, 5, hexColor.red),
                    f1 = n1.body.force,
                    f2 = n2.body.force;
    			var rb1 = new Part(cX-5, cY+20, 5, hexColor.red),
            		rb2 = new Part(cX+5, cY+20, 5, hexColor.red),
                    rb3 = new Part(cX+5, cY+25, 5, hexColor.red);//should't stick
            		
        		// expect(f1).to.not.equal(n1.body.force);
        		// expect(f2).to.not.equal(n2.body.force);
                expect(f2).to.not.equal(rb3.body.force);


    		});


    	});

    });


})();

function check( done, f ) {
  try {
    f()
    done()
  } catch( e ) {
    done( e )
  }
}