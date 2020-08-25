$(document).ready(function(){


  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
  
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
  
    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());
  
  var movePoint = 0;
  var ticking = false;
  var isWheel = false;
  
  var list = document.querySelector('ul');
  var transformPrefix = getComputedStyle(list).msTransform ? "msTransform" :
    getComputedStyle(list).mozTransform ? "mozTransform" :
    getComputedStyle(list).webkitTransform ? "webkitTransform" : "transform";
  var getTransX = getComputedStyle(list)[transformPrefix];
  var listMoveX = parseInt(getTransX.split(',')[4]);
  var listMoveEnd = (list.scrollWidth - list.offsetWidth) * -1;
  
  function listMoving(movePoint) {
    listMoveX -= movePoint;
    if (listMoveX > 0) {
      listMoveX = 0;
    } else if (listMoveX < listMoveEnd) {
      listMoveX = listMoveEnd;
    }
    console.log(transformPrefix, listMoveX);
    list.style[transformPrefix] = 'translateX(' + listMoveX + 'px)';
  }
  
  function wheelEvent(e) {
    movePoint = (e.type == "mousewheel" ? e.wheelDelta : e.deltaX) || e.deltaY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        listMoving(movePoint);
        ticking = false;
      });
    }
    ticking = true;
  }
  
  list.addEventListener('mousewheel', wheelEvent);
  list.addEventListener('wheel', function (e) {
    wheelEvent(e);
    if (!isWheel) {
      list.removeEventListener('mousewheel', wheelEvent);
      isWheel = true;
    }
  });
  
  list.addEventListener('mouseenter', function (e) {
    document.querySelector('html').className += ' prevent-history';
  });
  list.addEventListener('mouseleave', function (e) {
    document.querySelector('html').className = document.querySelector('html').className.replace(/\s?(prevent-history)\s?/g, "");
  });
  
  
  });