import createLoadingAnimation from './createLoadingAnimation';

const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        emptyMessage = 'Надо заполнить ВСЕ поля!',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!',
        loadMessage = createLoadingAnimation();

    const checkFormInputs = (form) => {
        const inputs = form.querySelectorAll('input');
        let result = true;
        inputs.forEach((element) => {
            if (element.type.toLowerCase() === 'button') return;
            if (!element.value) {
                result = false;
            }
        });
        return result;
    };


    const forms = document.querySelectorAll('form');



    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = form.querySelector('.status-message');
            //проверка на пустые инпуты
            if (!checkFormInputs(form)) {
                statusMessage.style.cssText = 'font-size: 2rem; color: red;padding: 20px 0;';
                statusMessage.innerHTML = emptyMessage;
                return;
            }

            statusMessage.style.cssText = 'font-size: 2rem; color: #19b5fe;padding: 20px 0;';
            statusMessage.innerHTML = loadMessage;

            const formData = new FormData(form);
            let body = {};
            // for (const val of formData.entries()) {
            //     body[val[0]] = val[1];
            // }
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then((response) => {
                    if (response.status !== 200) throw new Error('Нет ответа ответа сервера');
                    statusMessage.textContent = successMessage;
                    clearForm(form);
                })
                .catch((error) => {
                    console.error(error);
                    statusMessage.textContent = errorMessage;
                });
        });
    });


    const postData = (obj) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(obj),
        });
    };

    const clearForm = (form) => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach((element) => {
            if (element.type.toLowerCase() === 'button') return;
            element.value = '';
        });

    };
};

export default sendForm;
