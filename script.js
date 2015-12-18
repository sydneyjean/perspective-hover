/*

A Vanilla JS plugin to add a sweet perspective hover affect to card-like elements

Created by: Sydney Hake
Inspired by http://www.kikk.be/2015/

TO DO:
- add a reset function which brings perspective back to normal
- separate mousePosition function from perspective function
 
*/

function perspectiveHover(el, intensity) {
    
    var self   = this,
        parent = document.querySelector('.js-perspective');
    
    this.perspective = function(e, el) {
        
      var elX      = el.offsetLeft,
          elY      = el.offsetTop,
          elWidth  = el.offsetWidth,
          elHeight = el.offsetHeight;

      var mouseX = e.pageX,
          mouseY = e.pageY;

      var rotateY = -( ( elWidth/2 - (mouseX - elX) ) / (elWidth/2) * intensity ),
          rotateX = ( elHeight/2 - (mouseY - elY) ) / (elHeight/2) * intensity;
            
      el.style.transform = 'rotateX('+rotateX+'deg) rotateY('+ rotateY +'deg)';

    }
    
    parent.addEventListener('mousemove', function(e) {  
        
        if ( e.target.classList.contains('js-perspective-card') ) {
           self.perspective(e, e.target);
        }
        
    });
    
    
    /*this.reset = function(el) {
        el.style.transform = '';
    }*/
    /*els.addEventListener('mouseleave', function(e){
        self.reset(this);
    });*/
    
}

perspectiveHover('.js-perspective-card', 7);
