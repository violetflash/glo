import { nameValidator, messageValidator, emailValidator, phoneValidator } from './validationFuncs';

const validation = () => {
    const connect = document.getElementById('connect'),
        mainForm = document.querySelector('.main-form'),
        popup = document.querySelector('.popup');


    const checkWholeValidation = function() {

        this.value = this.value.replace(/\s+/g, ' ')
            .replace(/-+/g, '-')
            .replace(/^[\s|-]+|[\s|-]+$/g, '');

        if (this.value.length === 1) {
            this.value = '';
        }

        if (this.name === 'user_phone') {
            console.log('phone')
            if (this.value.length < 7) {
                this.value = '';
            }
        }


        if (this.name === 'user_name' && this.value) {
            let name = this.value;
            name = name.replace(/./g, letter => letter.toLowerCase())
                .replace(/^[а-я]|[\s|-][а-я]/g, letter => letter.toUpperCase());
            this.value = name;
        }
    };

    const fieldValidator = e => {
        const target = e.target;

        if (target.tagName !== 'INPUT' && !target.classList.contains('top-form')) {
            return;
        }

        if (target.name === 'user_name') {
            target.addEventListener('input', nameValidator);
        }

        if (target.name === 'user_message') {
            target.addEventListener('input', messageValidator);
        }

        if (target.name === 'user_email') {
            // target.type = 'text';
            target.addEventListener('input', emailValidator);
        }

        if (target.name === 'user_phone') {
            target.addEventListener('input', phoneValidator);
        }

        target.addEventListener('blur', checkWholeValidation);
    };

    mainForm.addEventListener('click', fieldValidator);
    connect.addEventListener('click', fieldValidator);
    popup.addEventListener('click', fieldValidator);
};

export default validation;
