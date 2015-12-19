/*

A Vanilla JS plugin to add a sweet perspective hover affect to card-like elements

Created by:   Sydney Hake
Inspired by:  http://www.kikk.be/2015/
Dependencies: Velocity.js (https://github.com/julianshapiro/velocity)

TO DO:
- add a reset function which brings perspective back to normal
- separate mousePosition function from perspective function
- change for loop of parent/els to use a higher order function
 
*/

function perspectiveHover(el, intensity) {
    
    var self         = this,
        parent       = document.getElementsByClassName('js-perspective'),
        els          = document.getElementsByClassName('js-perspective-card');
    
    this.perspective = function(e, el) {
        
        var elX      = el.getBoundingClientRect().left,
            elY      = el.getBoundingClientRect().top,
            elWidth  = el.offsetWidth,
            elHeight = el.offsetHeight;

        var mouseX = e.pageX,
            mouseY = e.pageY;

        var valY = -( ( elWidth/2 - (mouseX - elX) ) / (elWidth/2) * intensity ),
            valX = ( elHeight/2 - (mouseY - elY) ) / (elHeight/2) * intensity;

        Velocity(el, { rotateX: valX+'deg', rotateY: valY+'deg', }, 0);

    }

    this.reset = function(el) {

        Velocity(el, { rotateX: 0, rotateY: 0, }, 250, [0.175, 0.885, 0.75, 2.5]); // Array vals are easing
    }

    for (var i = 0; i < parent.length; i++) {

        parent[i].addEventListener('mousemove', function(e) {
            if ( e.target.classList.contains('js-perspective-card') ) {
                self.perspective(e, e.target);
            }
        });

    }

    for (var i = 0; i < els.length; i++ ) {

        els[i].addEventListener('mouseleave', function(e){
            self.reset(this);
        });

    }
    
}

perspectiveHover('.js-perspective-card', 7);
