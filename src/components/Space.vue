<template>
  <div class="my-canvas-wrapper">
    <canvas id="canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "space",
  data () {
    return {
      exampleContent: "Stones World",
      stonesArray: [
          {x: 10, y: 545},
          {x: 45, y: 186},
          {x: 67, y: 675},
          {x: 109, y: 370},
          {x: 700, y: 500},
          {x: 30, y: 678},
          {x: 800, y: 424},
          {x: 345, y: 786},
          {x: 45, y: 456},
          {x: 987, y: 500},
          {x: 391, y: 378},
          {x: 654, y: 112},
          {x: 128, y: 570},
          {x: 643, y: 378},
          {x: 356, y: 100},
          {x: 200, y: 67}
      ]
    };
  },
  methods: {
    getRndColor: function () {
      let r = 255 * Math.random() | 0;
      let g = 255 * Math.random() | 0;
      let b = 255 * Math.random() | 0;
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    updateCanvas: function () {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.font = "20px Georgia";
      ctx.fillText(this.exampleContent, 10, 50);
      this.stonesArray.forEach((stone) => {
        console.log(stone);
        ctx.beginPath();
        ctx.arc(stone.x, stone.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = this.getRndColor();
        ctx.fill();
      });
    }
  },
  watch: {
    exampleContent: function () {
      this.updateCanvas();
    }
  },
  mounted: function () {
    this.updateCanvas();
  }
};
</script>