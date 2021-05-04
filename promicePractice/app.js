'use strict';

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
    data.forEach((elem, index) => {
        if (index > 5) return;
        const img = document.createElement('img');
        img.src = elem.url;
        output.append(img);
    });
};

const photosUrl = 'https://jsonplaceholder.typicode.com/photos';

getData(photosUrl, (data) => {
    outputPhotos(data);
});
