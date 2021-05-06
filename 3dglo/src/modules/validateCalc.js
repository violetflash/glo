import digitsValidator from './validationFuncs';

const validateCalc = () => {
    const calc = document.getElementById('calc');

    const calcValidator = e => {
        const target = e.target;
        if (target.tagName !== 'INPUT' && !target.classList.contains('calc-item') || target.tagName === 'SELECT') {
            return;
        }

        target.addEventListener('input', digitsValidator);
    };

    calc.addEventListener('click', calcValidator);
};

export default validateCalc;
