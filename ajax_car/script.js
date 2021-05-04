
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    const getCar = () => {

        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
            const willGetCar = new Promise(((resolve, reject) => {
                if (request.readyState === 4 && request.status === 200) {
                    resolve(request);
                } else {
                    reject();
                }
            }));
            willGetCar
                .then(response => {
                    const data = JSON.parse(response.responseText);
                    data.cars.forEach(item => {
                        if (item.brand === select.value) {
                            const {brand, model, price} = item;
                            output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                        }
                    });
                })
                .catch(err => {
                    console.error(err);
                    output.innerHTML = 'Произошла ошибка';
                });
        });
    };

    select.addEventListener('change', getCar);

});

