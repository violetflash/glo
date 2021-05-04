'use strict';
/*
const output = document.getElementById('output');

const getData = (url, outputData) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
            const response = JSON.parse(request.responseText);
            outputData(response);
        } else {
            console.error(request.statusText);
        }
    });
    request.send();
};

const outputPhotos = (data) => {
    const random = Math.floor(Math.random() * data.length);
    const object = data[random];
    console.log(object);
    output.innerHTML = `
        <h2>${object.title}</h2>
        <img src="${object.url}" alt="">
    `;

};

const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

getData(photosUrl, outputPhotos);

 */

//====================================
const output = document.getElementById('output');

const getData = (url) => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else {
                reject(request.statusText);
            }
        });
        request.send();
    });

};

const outputPhotos = (data) => {
    const random = Math.floor(Math.random() * data.length);
    const object = data[random];
    console.log(object);
    output.innerHTML = `
        <h2>${object.title}</h2>
        <img src="${object.url}" alt="">
    `;

};

const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

getData(photosUrl)
    .then(outputPhotos)
    .catch(err => console.log(err));

