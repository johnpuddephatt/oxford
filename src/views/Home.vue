<template>
  <transition name="fade-out">
    <div id="home">
      <canvas id="overlay"></canvas>
      <div class="home-heading-wrapper">
        <h1 class="home-title"><span>Who</span>&nbsp;<span>Owns</span>&nbsp;<span>Oxford?</span></h1>
        <div class="home-subheading">
          <p class="home-subtitle">An exploration of land ownership in Oxford through six stories</p>
          <router-link class="home-button" to="/stories">&rarr;</router-link>
        </div>
      </div>

    </div>
  </transition>
</template>


<style lang="scss">
  @import '../scss/_variables.scss';
  @import '../scss/_animations.scss';

  .home-heading-wrapper {
    pointer-events: none;
    position: relative;
    z-index: 999;
  }

  .home-title, .home-subtitle {
    pointer-events: none;
    color: white;
  }

  .home-title {
    font-size: 5.5rem;
    text-transform: uppercase;
    margin-top: 0;
    margin-bottom: 0;
    text-shadow: -.25em .25em 0 black;
    span {
      opacity: 0;
      animation: text-flicker 2.5s linear forwards;
      animation-delay: 1s;
      &:nth-child(2) {
        animation-delay: 1.75s;
      }
      &:nth-child(3) {
        animation-delay: 2.5s;
      }
    }
  }

  .home-subheading {
    animation: fadeInSubheading 1s 6s forwards ease-out;
    opacity: 0;
    transform: translateY(-3em);
    text-align: center;
    font-size: 1.3em;
  }

  .home-subtitle {
    margin-top: 0;
    margin-bottom: 2em;
  }

  .home-heading-wrapper {
    animation: moveDownHeadingWrapper 1s 6s forwards ease-out;
  }

  .home-button {
    text-indent: -9999px;
    margin: 0 auto;
    display: block;
    height: 6rem;
    width: 6rem;
    line-height: 6rem;
    font-size: 3rem;
    border-radius: 50%;
    border: .1rem solid white;
    pointer-events: all;
    margin-bottom: -6rem;
    text-decoration: none;
    color: white;
    transition: background-color 1s ease, color 1s ease;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MTIiIGhlaWdodD0iNTk0LjIiIHZpZXdCb3g9IjAgMCA4MTIgNTk0LjIiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNMCAyOTcuNWg4MDVNODA1IDMwMS41TDYwMy42IDQuOE02MDMuNiA1ODkuNUw4MDUgMjkyLjgiLz48L3N2Zz4=');
    background-size: 50% auto;
    background-repeat: no-repeat;
    background-position: center;
    &:hover {
      background-color: white;
    }

  }

  #home {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    z-index: 9;
    position: relative;
    // pointer-events: none;
    &::after {
      content: '';
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: radial-gradient(circle at center, transparentize($blue,1), transparentize($blue,0.1));
      z-index: 8;
    }
  }

  #overlay {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 99;
    top: 0vh;
    left: 0vw;
    opacity: .85;
  }

</style>


<script>
  export default {
    name: 'home',
    mounted() {
      var overlay = document.getElementById("overlay"),
      overlayCanvas = overlay.getContext('2d'),
      overlayColor = 'RGB(69, 80, 107)',
      brushSize = 30;

      overlayCanvas.canvas.width = window.innerWidth;
      overlayCanvas.canvas.height = window.innerHeight;

      function detectLeftButton(event) {
        if ('buttons' in event) {
          return event.buttons === 1;
        } else if ('which' in event) {
          return event.which === 1;
        } else {
          return event.button === 1;
        }
      }

      function getBrushPos(xRef, yRef) {
      	var overlayRect = overlay.getBoundingClientRect();
        return {
      	  x: Math.floor((xRef-overlayRect.left)/(overlayRect.right-overlayRect.left)*overlay.width),
      	  y: Math.floor((yRef-overlayRect.top)/(overlayRect.bottom-overlayRect.top)*overlay.height)
        };
      }

      function debounce(func, wait, immediate) {
      	var timeout;
      	return function() {
      		var context = this, args = arguments;
      		var later = function() {
      			timeout = null;
      			if (!immediate) func.apply(context, args);
      		};
      		var callNow = immediate && !timeout;
      		clearTimeout(timeout);
      		timeout = setTimeout(later, wait);
      		if (callNow) func.apply(context, args);
      	};
      };

      var efficientDraw = debounce(function (mouseEvt) {
        var brushPos = getBrushPos(mouseEvt.clientX, mouseEvt.clientY);
        drawDot(brushPos.x, brushPos.y);
      }, 16);

      function drawDot(mouseX,mouseY){
        overlayCanvas.beginPath();
        // overlayCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
         var newMouseX = Math.floor(mouseX/brushSize)*brushSize;
         var newMouseY = Math.floor(mouseY/brushSize)*brushSize;

        overlayCanvas.rect(newMouseX, newMouseY, brushSize, brushSize);
        overlayCanvas.fillStyle = 'rgba(255,255,255,.5)';
        overlayCanvas.globalCompositeOperation = "destination-out";
        overlayCanvas.fill();

        //big background square
        // overlayCanvas.beginPath();
        // overlayCanvas.rect((newMouseX - 2 * brushSize), (newMouseY - 2 * brushSize), 5 * brushSize, 5  * brushSize);

        overlayCanvas.fillStyle = 'rgba(255,255,255,.05)';
        overlayCanvas.fill();

        //medium background square
        overlayCanvas.beginPath();
        overlayCanvas.rect((newMouseX - brushSize), (newMouseY - brushSize), 3 * brushSize, 3 * brushSize);

        overlayCanvas.fillStyle = 'rgba(255,255,255,.2)';
        overlayCanvas.fill();

        //top background square
        overlayCanvas.beginPath();
        overlayCanvas.rect((newMouseX), (newMouseY - brushSize), brushSize, brushSize);
        overlayCanvas.rect((newMouseX), (newMouseY + brushSize), brushSize, brushSize);
        overlayCanvas.rect((newMouseX - brushSize), (newMouseY), brushSize, brushSize);
        overlayCanvas.rect((newMouseX + brushSize), (newMouseY), brushSize, brushSize);

        overlayCanvas.rect((newMouseX), (newMouseY - 2 * brushSize), brushSize, brushSize);
        overlayCanvas.rect((newMouseX), (newMouseY + 2 * brushSize), brushSize, brushSize);
        overlayCanvas.rect((newMouseX - 2 * brushSize), (newMouseY), brushSize, brushSize);
        overlayCanvas.rect((newMouseX + 2 * brushSize), (newMouseY), brushSize, brushSize);

        overlayCanvas.fillStyle = 'rgba(255,255,255,.05)';
        overlayCanvas.fill();

      }

      overlay.addEventListener("mousemove", function(e) {
        efficientDraw(e);
      }, false);

      overlay.addEventListener("touchmove", function(e) {
          e.preventDefault();
          var touch = e.targetTouches[0];
          if (touch) {
          var brushPos = getBrushPos(touch.pageX, touch.pageY);
              drawDot(brushPos.x, brushPos.y);
          }
      }, false);


      // re-covering fill
      setInterval(function(){
        overlayCanvas.beginPath();
        overlayCanvas.rect(0, 0, overlay.width, overlay.height);
        overlayCanvas.globalCompositeOperation = "source-over";
        overlayCanvas.fillStyle = "rgba(69,80,107,.05)";
        overlayCanvas.fill();
      },42);

      // initial fill
      overlayCanvas.beginPath();
      overlayCanvas.rect(0, 0, overlay.width, overlay.height);
      overlayCanvas.globalCompositeOperation = "source-over";
      overlayCanvas.fillStyle = "rgba(69,80,107,1)";
      overlayCanvas.fill();
    }
  }

</script>
