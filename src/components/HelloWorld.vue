<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="drawRect">Function</button>
    <canvas id="canvas" width="600" height="600" ></canvas>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() msg!: string
  vueCanvas!: object

  mounted(): void {
    const canvasElement = document.getElementById("canvas");
    this.vueCanvas = canvasElement.getContext("2d");
  }

  drawRect() {
    const canvasWidth = 600;
    const marginX = 10;
    const canvasHeight = 600;
    const marginY = 10;

    const maxX = 2 * Math.PI;
    const aX = (canvasWidth - 2 * marginX) / (2 * maxX);
    const bX = canvasWidth / 2;
    const convertWidth = function (width: number): number{
      return width * aX;
    }
    const convertX = function (x: number): number {
      return convertWidth(x) + bX
    }

    const maxY = 1;
    const aY = (canvasHeight - 2 * marginY) / (2 * maxY);
    const bY = canvasHeight / 2;
    const convertHeight = function (height: number): number {
      return height * aY;
    }
    const convertY = function (y: number): number {
      return -convertHeight(y) + bY
    }

    const ctx = this.vueCanvas;
    const rect = function (x: number, y: number, width: number, height: number): void {
      ctx.rect(convertX(x), convertY(y), convertWidth(width), convertHeight(height));
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    rect(-maxX, maxY, 2 * maxX, 2 * maxY);
    ctx.strokeStyle = '#22695c';
    ctx.lineWidth = 2;

    const xb = 110; //Коодринаты точки В (см в записи)
    const yb = 10;

    const xd = 460; //Коодринаты точки D (см в записи)
    const yd = 360;

    const AB = 360; // длина стороны прямоугольника
    const CD = 460; // длина стороны прямоугольника
    const CoordinateAxis = 300; //длина оси координат


    ctx.moveTo((xb+xd)/2, (yb+yd)/2); //ось ОУ (-)
    ctx.lineTo((xb+xd)/2, AB - 30);
    ctx.moveTo((xb+xd)/2, (yb+yd)/2); //ось ОУ (+)
    ctx.lineTo((xb+xd)/2, AB - 330);

    ctx.moveTo((xb+xd)/2, AB - 330) //стрелки oy
    ctx.lineTo(CoordinateAxis/2 + 120, AB/16 + AB - 330);
    ctx.moveTo((xb+xd)/2, AB - 330) //стрелки
    ctx.lineTo(CoordinateAxis/2 + AB/2 - 30,AB/16 + AB - 330);

    ctx.moveTo((xb+xd)/2, (yb+yd)/2);//ось ОХ (+)
    ctx.lineTo(430, (yb+yd)/2);
    ctx.moveTo((xb+xd)/2, (yb+yd)/2);//ось ОХ (-)
    ctx.lineTo(130, (yb+yd)/2);

    ctx.moveTo(450, (yb+yd)/2)//стрелки ox
    ctx.lineTo(430, 190);
    ctx.moveTo(450, (yb+yd)/2)//стрелки
    ctx.lineTo(430, 170);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#16967f';
    ctx.lineWidth = 1;
    //Цикл для рисования сетки по ОХ
    for(let x1 = 3; x1 < 12; x1++) {

      ctx.moveTo(x1*37 + 6.9*(Math.PI),54);
      ctx.lineTo(x1*37 + 6.9*(Math.PI), 305);
      ctx.stroke();
    }

    //Цикл для рисования сетки по ОY
    for(let y1 = 1; y1 < 12; y1++) {
      ctx.moveTo(132,y1*25 + 30);
      ctx.lineTo(430, y1*25 + 30);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#22695c';
    ctx.moveTo(132,180);
    let x = 0;
    let y = 119;
    const x2 = 132;
    const y2 = 180;
    const m = 7.5*Math.PI
    for (x = 0; x<12.6; x = x+1/m)
    {
      y = Math.sin(-x);
      ctx.lineTo(x*m+x2,y*m+y2);


    }
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.font = "20px serif";

    ctx.fillText("\u03C0", 355.5, 179.5);// число Пи по оси ОХ+

    ctx.fillText("X", 434, 170);//Ox
    ctx.fillText("O", 280, 180);//O
    ctx.fillText("Y", 290, 40);//Oy

    ctx.fillText("\u03C0", 318.25, 179.5); // число Пи/2
    ctx.fillText("\u2013", 319.5, 189, 600);
    ctx.fillText("2", 319.5, 203);

    ctx.fillText("2" + "\u03C0", 430, 200);    // число 2Пи

    ctx.fillText("3"+"\u03C0", 392.75, 179.5); // число 3Пи/2
    ctx.fillText("\u2013" + "\u2013", 393.5, 189);
    ctx.fillText("2", 397, 203);

    ctx.fillText("-"+"\u03C0", 206.5, 179.5);// число Пи по оси ОХ-

    ctx.fillText("-"+"\u03C0", 243.75, 179.5); // число -Пи/2
    ctx.fillText("\u2013"+"\u2013", 245, 189, 600);
    ctx.fillText("2", 248, 203);

    ctx.fillText("-"+"3"+"\u03C0", 169.25, 179.5); // число -3Пи/2
    ctx.fillText("\u2013" + "\u2013", 173, 189);
    ctx.fillText("2", 177, 203);

    ctx.fillText("-" + "2" + "\u03C0", 134, 200);    // число -2Пи
    ctx.stroke();



    //ctx.beginPath(); //нули функции и вершины функции
    //ctx.fillStyle = 'orange';
    //ctx.arc (355.5, 179.5, 2, 0, Math.PI * 2, false); // pi
    //ctx.arc (318.25, 179.5, 2, 0, Math.PI * 2, false); // pi/2
    //ctx.fill();


  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
