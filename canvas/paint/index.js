const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const color = document.getElementById('color');

color.addEventListener('input', () => {
   ctx.strokeStyle = color.value;
});

canvas.addEventListener('mousemove', (e) => {
    const x = e.offsetX,
        y = e.offsetY,
        //координаты указателя мыши относительно позиции последнего события mousemove
        mx = e.movementX,
        my = e.movementY;

    console.log(e.buttons);

    if (e.buttons > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - mx, y - my);
        ctx.stroke();
        ctx.closePath();
    }


});
