<template>
  <transition name="fade-out">
    <div id="home">
      <canvas id="overlay"></canvas>
      <div class="home-heading-wrapper">
        <h1 class="home-title"><span>Who</span>&nbsp;<span>Owns</span><span>Oxford</span></h1>
        <div class="home-subheading">
          <p class="home-subtitle">An exploration of land ownership across Oxford told through six stories</p>
          <router-link class="home-button" to="/stories">
            Enter
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="812" height="594.2" viewBox="0 0 812 594.2"><path vector-effect="non-scaling-stroke" fill="none" stroke="#FFF" stroke-width="25" stroke-miterlimit="10" d="M0 297.5h805m0 4L603.6 4.8m0 584.7L805 292.8"/></svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" width="33.4" height="51.3" viewBox="0 0 33.4 51.3"><path fill="#FFF" d="M10.4 33.9V32c0-2.4.6-4.3 1.8-5.8 1.2-1.5 3-3 5.3-4.6 1.9-1.3 3.3-2.4 4.2-3.5.9-1 1.4-2.2 1.4-3.7s-.6-2.8-1.7-3.7c-1.2-.9-2.7-1.4-4.5-1.4-2 0-3.6.5-4.9 1.5-1.2 1-1.8 2.3-1.8 3.9v.8c0 .8-.4 1.2-1.2 1.2l-7.7-.3c-.3 0-.6-.1-.9-.3-.3-.2-.4-.4-.4-.6v-.8C0 11.8.7 9.3 2.2 7c1.4-2.2 3.4-4 6-5.2C10.7.6 13.7 0 17.1 0c3.3 0 6.1.6 8.6 1.8 2.5 1.2 4.4 2.8 5.7 4.9 1.3 2.1 2 4.6 2 7.3 0 2.1-.4 3.9-1.1 5.4-.7 1.5-1.6 2.7-2.7 3.7s-2.4 2-4 3.2c-1.7 1.2-3 2.2-3.8 3.1-.8.9-1.2 1.9-1.2 3.2v1.3c0 .8-.4 1.2-1.2 1.2h-7.6c-1 0-1.4-.4-1.4-1.2zm1.2 15.7c-1.2-1.1-1.8-2.5-1.8-4.1s.6-2.9 1.8-4.1c1.2-1.1 2.7-1.7 4.4-1.7 1.6 0 3.1.6 4.3 1.7 1.2 1.1 1.8 2.5 1.8 4.1s-.6 2.9-1.8 4.1c-1.2 1.1-2.7 1.7-4.4 1.7-1.7 0-3.1-.6-4.3-1.7z"/></svg>
          </router-link>
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
  }

  .home-title {
    color: white;
    font-size: modular-scale(9);
    text-transform: uppercase;
    margin-top: .5em;
    margin-bottom: .25em;
    text-shadow: -.1em .1em 0 transparentize($blue,.85);
    text-align: center;
    line-height: 1;
    &.show span {
      opacity: 1;
    }
    span {
      opacity: 0;
      transition: opacity 1.5s cubic-bezier(0.62, 0.02, 0.34, 1);
      animation: shadow-flicker 1.5s ease-out forwards;
      animation-delay: 1s;
      transition-delay: 1s;
      // animation: text-flicker 2.5s linear forwards;
      // animation-delay: 1s;
      &:nth-child(2) {
        animation-delay: 2s;
        // animation-delay: 1.75s;
        transition-delay: 2s;
      }
      &:nth-child(3) {
        display: block;
        font-size: modular-scale(2);
        animation-delay: 3s;
        // animation-delay: 2.5s;
        transition-delay: 3s;
        position: relative;
      }
    }
  }

  .home-subheading {
    animation: fadeInSubheading 1s 5s forwards ease-out;
    opacity: 0;
    transform: translateY(-2em);
    text-align: center;
    font-weight: 500;
    font-size: 1.3em;
    margin-top: .25em;
  }

  .home-subtitle {
    font-size: modular-scale(1);
    margin: 0 auto 2em;
    color: $light-gray;
    max-width: 20em;
    line-height: $heading-line-height;
  }

  .home-heading-wrapper {
    animation: moveDownHeadingWrapper 1s 5s forwards ease-out;
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
    position: relative;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40%;
      height: auto;
      transform: translate(-50%,-50%);
      * {
        stroke-width: 0.125rem;
      }
    }
    &:hover {
      background-color: $green;
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
      background-image: radial-gradient(circle at center, transparentize($blue,1), transparentize($blue,0.2));
      z-index: 8;
    }
    &::before {
      content: '';
      position: fixed;
      // z-index: 99;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(to right, transparentize($blue,.65) 1px, #0000 1px), linear-gradient(to bottom, transparentize($blue,0.65) 1px, #0000 1px);
      background-size: 30px 30px;
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
        // Snap to grid
         var newMouseX = Math.floor(mouseX/brushSize)*brushSize;
         var newMouseY = Math.floor(mouseY/brushSize)*brushSize;

        overlayCanvas.rect(newMouseX, newMouseY, brushSize, brushSize);
        overlayCanvas.fillStyle = 'rgb(255,255,255)';
        overlayCanvas.globalAlpha = 0.5;

        overlayCanvas.globalCompositeOperation = "destination-out";
        overlayCanvas.fill();

        //big background square
        // overlayCanvas.beginPath();
        // overlayCanvas.rect((newMouseX - 2 * brushSize), (newMouseY - 2 * brushSize), 5 * brushSize, 5  * brushSize);
        // overlayCanvas.fillStyle = 'rgb(255,255,255)';
        // overlayCanvas.globalAlpha = 0.05;
        // overlayCanvas.fill();

        //medium background square
        overlayCanvas.beginPath();
        overlayCanvas.rect((newMouseX - brushSize), (newMouseY - brushSize), 3 * brushSize, 3 * brushSize);

        // overlayCanvas.fillStyle = 'rgb(255,255,255)';
        // overlayCanvas.fillStyle = 'rgb(166,244,190)';
        overlayCanvas.globalAlpha = 0.2;
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

        overlayCanvas.fillStyle = 'rgb(255,255,255)';
        overlayCanvas.globalAlpha = 0.05;
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
        overlayCanvas.fillStyle = "rgb(69,80,107)";
        overlayCanvas.globalAlpha = 0.1;
        overlayCanvas.fill();
      },80);

      // initial fill
      overlayCanvas.beginPath();
      overlayCanvas.rect(0, 0, overlay.width, overlay.height);
      overlayCanvas.globalCompositeOperation = "source-over";
      overlayCanvas.fillStyle = "rgb(69,80,107)";
      overlayCanvas.globalAlpha = 1;
      overlayCanvas.fill();

      var homeTitle = document.querySelector('.home-title');
      homeTitle.classList.add('show');
    }
  }

</script>
