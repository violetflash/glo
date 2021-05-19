const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//radians to angle
const angle = degrees => (Math.PI / 180) * degrees;

const gradient = ctx.createLinearGradient(20, 20, 120, 120);
const gradient2 = ctx.createRadialGradient(70, 70, 0, 70, 70, 70);

gradient.addColorStop(0, 'hsl(250, 70%, 70%)');
gradient.addColorStop(1, 'hsl(0, 70%, 70%)');

gradient2.addColorStop(0, 'hsl(156, 20%, 70%)');
gradient2.addColorStop(1, 'hsl(0, 40%, 30%)');


//простые фигуры
/*
ctx.fillStyle = gradient;
// ctx.fillStyle = '#bb55ff';
ctx.fillRect(20, 20, 100, 100);

// ctx.strokeStyle = 'rgb(30, 255, 10)';
ctx.strokeStyle = gradient2;
ctx.strokeRect(5, 5, 130, 130);

//полностью прозрачный квадрат
ctx.clearRect(30, 30, 80, 80);
 */


//СОСТАВНЫЕ ФИГУРЫ

//Обозначаем начало контура. Все что будет идти после него - будет считаться одним единым контуром
ctx.beginPath();
//300*150 размеры канваса по-умолчанию
//перемещаемся на середину по х
ctx.moveTo(150, 0);
//переместиться и начертить за собой линию
// ctx.lineTo(175, 125);
ctx.moveTo(175, 125);
ctx.lineTo(300, 150);
ctx.lineTo(175, 175);

// ctx.lineTo(150, 300);
// ctx.lineTo(125, 175);
ctx.moveTo(125, 175);
ctx.lineTo(0, 150);
ctx.lineTo(125, 125);
// ctx.lineTo(150, 0);

ctx.moveTo(175, 150);
ctx.arc(150, 150, 25, 0, angle(360), false);

ctx.lineWidth = 4;
ctx.strokeStyle = gradient;
//
// ctx.lineTo(115, 150);
// ctx.moveTo(150, 115);
// ctx.lineTo(150, 220);

// ctx.moveTo(185, 255);


// ctx.arc(150, 255, 35, 0, angle(360), false);
// ctx.moveTo(165, 255);
// ctx.arc(150, 255, 15, 0, angle(360), false);

ctx.moveTo(125, 125);
ctx.arcTo(150, 110, 175, 125, 30);
ctx.lineTo(175, 125);

ctx.moveTo(175, 175);
ctx.arcTo(150, 190, 125, 175, 30);
ctx.lineTo(125, 175);

// ctx.arcTo();


ctx.stroke();

canvas.addEventListener('click', () => {
   canvas.style.transform = 'rotate(180deg)';
});

canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    canvas.style.transform = 'rotate(0)';
});


