import animate from "./animate";

const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            value = 0,
            startInterval;

        const typeValue = calcType.value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = Math.trunc(price * typeValue * squareValue * countValue * dayValue);
            total = Math.ceil(total / 10) * 10;
            // value = total;
        }

        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) {
                    startTimestamp = timestamp;
                }
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    value = total;
                }
            };
            window.requestAnimationFrame(step);
        }

        animateValue(totalValue, value, total, 100);


    };

    calcBlock.addEventListener('change', e => {
        const target = e.target;

        if (target.matches('select') || target.matches('input')) {
            countSum();
        }
    });
};

export default calc;
