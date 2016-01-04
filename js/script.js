/*

A Vanilla JS plugin to add a sweet perspective hover affect to card-like elements

Created by:   Sydney Hake
Inspired by:  http://www.kikk.be/2015/
Dependencies: Velocity.js (https://github.com/julianshapiro/velocity)

TO DO:
- change for loop of parent/els to use a higher order function (??)
- change function from accepting parameters to having an options object that overwrites defaults
- implement requestAnimationFrame so plugin isn't dependent on velocity (code based on http://www.sitepoint.com/simple-animations-using-requestanimationframe/)
  by using the values returned in getTransforms to animate back to 0 in this.reset

*/

function perspectiveHover(el, parent, intensity) {
    
    var self         = this,
        elClass      = el.replace(/\./g,''),
        parentClass  = parent.replace(/\./g,''),
        parent       = document.getElementsByClassName(parentClass),
        els          = document.getElementsByClassName(elClass);

    this.perspective = function(e, el) {
        
        var elX      = el.getBoundingClientRect().left,
            elY      = el.getBoundingClientRect().top,
            elWidth  = el.offsetWidth,
            elHeight = el.offsetHeight;

        var mouseX = e.pageX,
            mouseY = e.pageY;

        var valY = -( ( elWidth/2 - (mouseX - elX) ) / (elWidth/2) * intensity ),
            valX = ( elHeight/2 - (mouseY - elY) ) / (elHeight/2) * intensity;

        // Velocity(el, { rotateX: valX+'deg', rotateY: valY+'deg', }, 0);
        el.style.transform = 'rotateX('+ valX + 'deg) rotateY(' + valY + 'deg)';

    }

    this.reset = function(el, valX, valY) {

        // start implementation of request animation frame
        console.log(valX);

        animate({
            time: 1,  // time in seconds
            run: function(rate) {
                console.log(rate);
                el.style.transform = 'rotateX('+ rate*valX +'deg) rotateY('+ rate*valY +'deg)';
            }
        });

        function animate(item) {

            var duration = 1000*item.time,
                end = +new Date() + duration;

            var step = function() {

                var current = +new Date(),
                    remaining = end - current;

                if( remaining < 60 ) {
                    item.run(0);  //1 = progress is at 100%
                    return;

                } else {
                    // var rate = 1 - remaining/duration;
                    var rate = remaining/duration;
                    item.run(rate);
                }
                window.requestAnimationFrame(step);
            }
            step();
        }
        // end implementation of request animation frame

        // Velocity(el, { rotateX: 0, rotateY: 0, }, 250, [0.175, 0.85, 0.55, 1.2]); // Array vals are easing
    }

    this.getTransforms = function(el) {

        var st      = window.getComputedStyle(el, null),
            tr      = st.getPropertyValue("transform"),
            matrix  = st.getPropertyValue("transform"),
            rotateX = 0,
            rotateY = 0,
            rotateZ = 0;

        if (matrix !== 'none') {

            // calculate the values of the rotation
            var values      = matrix.split('(')[1].split(')')[0].split(','),
                pi          = Math.PI,
                sinB        = parseFloat(values[8]),
                b           = Math.asin(sinB) * 180 / pi,
                cosB        = Math.cos(b * pi / 180),
                matrixVal10 = parseFloat(values[9]),
                a           = Math.asin(-matrixVal10 / cosB) * 180 / pi,
                rotateX = a;
                rotateY = b;

            return [rotateX, rotateY];
        }

    }

    for (var i = 0; i < parent.length; i++) {

        parent[i].addEventListener('mousemove', function(e) {
            if ( e.target.classList.contains(elClass) ) {
                self.perspective(e, e.target);
            }
        });

    }

    for (var i = 0; i < els.length; i++ ) {

        els[i].addEventListener('mouseleave', function(){
            // pass the x transform and y transform to reset, to animate back to 0
            self.reset(this, self.getTransforms(this)[0], self.getTransforms(this)[1]);
        });

    }
    
}

perspectiveHover('.js-perspective-card', '.js-perspective', 10);
