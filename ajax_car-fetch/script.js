document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output'),
        data = './cars.json';
    /*
        const getCar = (url) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', url);
                request.setRequestHeader('Content-type', 'application/json');
                request.send();
                request.addEventListener('readystatechange', () => {

                    if (request.readyState !== 4) return;

                    if (request.readyState === 4 && request.status === 200) {
                        resolve(request);
                    } else {
                        reject(request.status);
                    }
                });
            });
        };

        select.addEventListener('change', () => {
            getCar(data)
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
    });
     */
    //====================  FETCH   ============

    select.addEventListener('change', () => {
        fetch(data, {
            method: 'GET',
            mode: 'same-origin',
            cache: "default",
            credentials: 'same-origin',
            header: {
                'Content-type': 'application/json'
            },
            redirect: 'follow',
            referer: 'client',
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) throw new Error('response не получен');
                return response.json()
                    .then((data) => {
                        console.log(data);
                        data.cars.forEach(item => {
                            if (item.brand === select.value) {
                                const {brand, model, price} = item;
                                output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                            }
                        });
                    });
            })
            .catch((error) => console.error(error));
    });
});