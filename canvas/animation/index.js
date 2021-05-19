const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//radians to angle
const angle = degrees => (Math.PI / 180) * degrees;

let tick = 0;
let animationID;

const animation = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.fillStyle = 'green';
    ctx.fillRect(tick, tick, 50, 50);
    tick++;
    if (tick < 351) {
        requestAnimationFrame(animation);
    } else {
        reverse();
    }
};

const reverse = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.fillStyle = 'green';
    ctx.fillRect(tick, tick, 50, 50);
    tick--;
    if (tick > 0) {
        requestAnimationFrame(reverse);
    } else {
        animation();
    }
};

animation();
