function DOMCreate() {
    this.buttonNumber = 0;
    this.marginTop = 200;
    this.createButton = function(name, className, callback, styles) {
        name = name || "Click Me";
        this.buttonNumber += 1;
        this.marginTop += 100;
        var defaultStyles = "color:white;background: red;z-index: 100;width: 200px;padding: 10px;position:absolute;top: " + this.marginTop.toString() + "px;left: 50%;margin-left: -100px;";
        styles = (styles ? defaultStyles + styles : defaultStyles);     
        var newButton = document.createElement("BUTTON");
        newButton.appendChild(document.createTextNode(name));
        newButton.setAttribute("style", styles);
        newButton.setAttribute("class", className + this.buttonNumber);
        newButton.setAttribute("id", className + this.buttonNumber);
        newButton.setAttribute("type", "button");
        document.body.appendChild(newButton);
        var buttonNumber = this.buttonNumber;
        newButton.addEventListener("click", function() {
        if (callback) {
            callback(className + buttonNumber);
        }
        });
    };
}

function animate(_id) {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var start = null;
  var d = document.getElementById(_id);
  var easing = {
      Sine: function( p ) {
          return 1 - Math.cos( p * Math.PI / 2 );
      },
      Circ: function( p ) {
          return 1 - Math.sqrt( 1 - p * p );
      },
      Elastic: function( p ) {
          return p === 0 || p === 1 
          ? p 
          : -Math.pow( 2, 8 * ( p - 1 ) ) * Math.sin( ( ( p - 1 ) * 20 - 1 ) * Math.PI / 15 );
      },
      Back: function( p ) {
          return p * p * ( 10 * p - 5 );
      },
      Bounce: function( p ) {
          var pow2,
              bounce = 4;

          while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {
              return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
          }
      }
  };
  var step = function(timestamp) {
      var progress = undefined;
      if (!start) { 
          console.log(timestamp);
          start = timestamp;
      }
      setTimeout(function() {
        progress = easing.Elastic((timestamp - start) / 1000);
        d.style.top = progress + "px";
        if (progress < 500 ) {
          requestAnimationFrame(step);
        }
      }, 20);
  };

  requestAnimationFrame(step);
}

//introduction du bouton dans le DOM
var dom = new DOMCreate();
dom.createButton("myButton", "btn-", animate);