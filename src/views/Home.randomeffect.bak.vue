<template>
  <div>
    <div id="home">
      <div class="home-heading-wrapper">
        <h1 class="home-title"><span>Who</span>&nbsp;<span>Owns</span>&nbsp;<span>Oxford?</span></h1>
        <div class="home-subheading">
          <p class="home-subtitle">An exploration of land ownership in Oxford through six stories</p>
          <router-link class="button" to="/stories">Start</router-link>
        </div>
      </div>
    </div>

    <canvas id="overlay"></canvas>
  </div>
</template>


<style lang="scss">
@keyframes bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: translate3d(-3000px, 0, 0);
    transform: translate3d(-3000px, 0, 0);
  }

  60% {
    opacity: 1;
    -webkit-transform: translate3d(25px, 0, 0);
    transform: translate3d(25px, 0, 0);
  }

  75% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  90% {
    -webkit-transform: translate3d(5px, 0, 0);
    transform: translate3d(5px, 0, 0);
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes text-flicker {
  0% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }

  2% {
    opacity:.3;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }
  8% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }
  9% {
    opacity:.4;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }
  12% {
    opacity:0.1;
    text-shadow: 0px 0px rgba(255,255,255,1);
  }
  20% {
    opacity:.5;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }
  25% {
    opacity:0.3;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }
  30% {
    opacity:.6;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }

  70% {
    opacity:0.1;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }

  72% {
    opacity:0.2;
    text-shadow:0px 0px 29px rgba(255,255,255,1);
  }

  87% {
    opacity:.4;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }
  100% {
    opacity: 0;
    text-shadow: 0px 0px 29px rgba(255,255,255,1);
  }
}
  .home-title {
    font-size: 4rem;
    text-transform: uppercase;
    color: white;
    margin-top: 2rem;
    margin-bottom: 0;
    span {
      opacity: 0;
      animation: text-flicker 4s linear;
      &:nth-child(2) {
        animation-delay: 1s;
      }
      &:nth-child(3) {
        animation-delay: 2s;
      }
    }

  }

  .home-subheading {
    display: none;
    animation: fadeInSubheading 1s 10s forwards ease-out;
    opacity: 0;
    transform: translateY(-4em);
    text-align: center;
  }

  .home-subtitle {
    margin-top: 0;
    margin-bottom: 2em;
  }

  .home-heading-wrapper {
    // animation: moveDownHeadingWrapper 1s 10s forwards ease-out;
  }

  #home {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    z-index: 999;
    position: relative;
  }

  #overlay {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0vh;
    left: 0vw;
    animation: fadeOutOverlay forwards ease-out;
    animation-duration: 4s;
    animation-delay: 6s;
  }

  @keyframes fadeOutOverlay {
    to {
      opacity: 0;
    }
  }

  @keyframes fadeToYellow {
    to {
      color: #F2C149;
    }
  }

  @keyframes fadeOutBackground {
    to {
      background-color: rgba(255,255,255,0);
    }
  }

  @keyframes fadeInSubheading {
    to {
      opacity: 1;
      transform: translateY(0)
    }
  }

  @keyframes moveDownHeadingWrapper {
    to {
      transform: translateY(-2em)
    }
  }


</style>


<script>
  export default {
    name: 'home',
    mounted() {
      var bridge = document.getElementById("overlay"),
      bridgeCanvas = bridge.getContext('2d'),
      pixelSize = window.innerWidth/25,
      columnCount = window.innerWidth/pixelSize,
      rowCount = window.innerHeight/pixelSize,
      img = new Image();
      bridgeCanvas.canvas.width = window.innerWidth;
      bridgeCanvas.canvas.height = window.innerHeight;

      bridgeCanvas.beginPath();
      bridgeCanvas.rect(0, 0, bridge.width, bridge.height);
      bridgeCanvas.fillStyle = "rgba(0,0,0,1)";
      bridgeCanvas.fill();

      function drawDot(Xpos,Ypos,opacity){
          bridgeCanvas.beginPath();
          bridgeCanvas.rect((Xpos - pixelSize/2), (Ypos - pixelSize/2), (pixelSize),  (pixelSize));
          // bridgeCanvas.arc((Xpos - pixelSize/2), (Ypos - pixelSize/2), pixelSize/2, 0, 2*Math.PI, true);
          bridgeCanvas.fillStyle = 'rgba(255,255,255,'+ opacity +')';
          bridgeCanvas.globalCompositeOperation = "destination-out";
          bridgeCanvas.fill();
      }

      var newTimeout,
      progress,
      spread,
      randX,
      randY,
      widthY,
      widthX,
      totalFrames = 4000;
      var acceleratorFunction = function(tick, initialDuration, acceleration) {
          return function() {
              if (++tick <= totalFrames) {
                newTimeout = 16 + ( 1 / (tick * acceleration + 1 )) * initialDuration;
                window.setTimeout(acceleratorFunction, newTimeout);
                // progress = tick/totalFrames;
                randomiser(tick);
            }
          }
      }(100,200,0.6);

      acceleratorFunction();

      function randomiser(tick) {

        progress = tick/totalFrames;
        spread = 10;

        if(tick % 2) {
          randY = (Math.random() * rowCount) + 1;

          randX = Math.random(); // rand between 0~1;
          randX = randX * spread; // rand betwen 0~spread
          randX = randX - spread/2; // rand between -1 ~ +1
          widthX = (columnCount)/ (1 - (2 + progress * (columnCount - 2)));  // trends towards 1
          // widthX = columnCount/(2 * columnCount - progress * columnCount);
          randX = (randX + (Math.sign(randX) * widthX)); // split rands based on sign
          // randX = randX * widthX;
          randX= randX + columnCount/2; // shift scale from -5~~~+5 to 0~~~10
        }
        else {
          randX = (Math.random() * columnCount) + 1;

          randY = Math.random(); // rand between 0~1;
          randY = randY * spread; // rand betwen 0~spread
          randY = randY - spread/2; // rand between -1 ~ +1
          widthY = (rowCount)/(1 - (2 + progress * (rowCount - 2)));
          // widthY = rowCount/(2 * rowCount - progress * rowCount);

          randY = (randY + (Math.sign(randY) * widthY)); // split rands based on sign
          // randY = randY * widthY;
          randY= randY + rowCount/2; // shift scale from -5~~~+5 to 0~~~10
        }

        randX = Math.floor(randX);
        randY = Math.floor(randY)

        randX = randX * pixelSize;
        randY = randY * pixelSize;
        var opacity = .25 + (progress * .5);
        // var opacity = 1;
        drawDot(randX, randY, opacity);
      }

    }
  }

</script>
