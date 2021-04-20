'use strict';

const countrySelect = document.querySelector('#country');
const citySelect = document.querySelector('#city');
const result = document.querySelector('.result');

const cityArr = {
  rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
  uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
  bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
  jap: ['Токио', 'Киото', 'Осака', 'Иокогама']
};

function printResult(country, city) {
  result.innerText = `${country}, ${city}`;
}

function renderCities(target, array) {
  target.style.display = 'inline-block';
  target.innerHTML = '';
  array.forEach((city) => {
    const option = document.createElement('option');
    option.innerText = city;
    option.value = city;
    citySelect.append(option);
  });
}

countrySelect.addEventListener('change', function() {
  const key = this.value;
  renderCities(citySelect, cityArr[key]);
  const country = this.options[this.selectedIndex].innerText;
  const city = citySelect.value;
  printResult(country, city);
});

citySelect.addEventListener('change', function() {
  const country = countrySelect.options[countrySelect.selectedIndex].innerText;
  const city = this.value;
  printResult(country, city);
});

document.addEventListener("DOMContentLoaded", () => {
  renderCities(citySelect, cityArr[countrySelect.value]);
  const country = countrySelect.options[countrySelect.selectedIndex].innerText;
  const city = citySelect.value;
  printResult(country, city);
});




