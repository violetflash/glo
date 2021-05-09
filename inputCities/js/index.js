class CitySearcher {
    constructor({ db, input, closeBtn, defaultDropdown, selectDropdown, autocompleteDropdown, root, popup }) {
        this.db = db;
        this.input = input;
        this.closeBtn = closeBtn;
        this.defaultDropdown = defaultDropdown;
        this.selectDropdown = selectDropdown;
        this.autocompleteDropdown = autocompleteDropdown;
        this.popup = popup;
        this.linkBtn = document.querySelector('.button');
        this.label = document.querySelector('.label');
        this.nonResult = document.getElementById('nope-info');
        this.root = root;


    }

    async fetchData() {
        // return fetch(this.db);
        this.popup.style.display = 'block';

        this.response = await (await fetch(this.db)).json();
        console.log(this.response);

        this.popup.style.display = 'none';
        console.log(1)

    }

    renderCity(name, count, link) {
        return `
            <div class="dropdown-lists__line">
                <div class="dropdown-lists__city" data-link="${link}">${name}</div>
                <div class="dropdown-lists__count">${count}</div>
            </div>
        `;
    }

    renderCountry(name, count) {
        return `
             <div class="dropdown-lists__total-line">
                <div class="dropdown-lists__country">${name}</div>
                <div class="dropdown-lists__count">${count}</div>
             </div>
        `;
    }

    async fillDropdown(dropdown, country, searchTerm, response = this.response) {

        if (dropdown === this.defaultDropdown) {
            // this.popup.style.display = 'block';
        }
        //animation here

        // const response = await (await this.fetchData()).json();
        const target = dropdown.querySelector('.dropdown-lists__col');

        // this.popup.style.display = 'none';


        for (const responseKey in response) {
            //Отфильтровывание страны
            const countryArray = response[responseKey];

            countryArray.forEach(elem => {
                elem.cities.sort((a, b) => +a.count - +b.count).reverse();

                if (dropdown === this.defaultDropdown) {
                    //заполняем дефолтный блок
                    const countryBlock = document.createElement('div');
                    countryBlock.classList.add('dropdown-lists__countryBlock');
                    countryBlock.innerHTML = this.renderCountry(elem.country, elem.count);
                    target.append(countryBlock);

                    elem.cities.forEach((city, index) => {
                        if (index > 2) return;
                        target.innerHTML += this.renderCity(city.name, city.count, city.link);
                    });
                }

                if (dropdown === this.selectDropdown) {
                    if (elem.country !== country) return;

                    target.innerHTML = this.renderCountry(elem.country, elem.count);

                    elem.cities.forEach(city => {
                        target.innerHTML += this.renderCity(city.name, city.count, city.link);
                    });
                }

                if (dropdown === this.autocompleteDropdown) {

                    //Вывод "не найдено" при остутствии совпадений при поиске в инпуте
                    const check = this.autocompleteDropdown.querySelector('.dropdown-lists__city');
                    if (!check) {
                        this.showElement(this.nonResult);
                    } else {
                        this.hideElement(this.nonResult);
                    }

                    const regExp = new RegExp(searchTerm, 'gi');
                    elem.cities.forEach((city) => {

                        if (regExp.test(city.name.toLowerCase())) {
                            city.name = city.name.replace(regExp, match => `<b>${match}</b>`);
                            target.innerHTML += this.renderCity(city.name, city.count, city.link);
                        }

                    });
                }
            });
        }
    }


    setInputValue(value) {
        this.label.style.cssText = `top: -25px;left: 0;color: #00416A;`;
        this.input.value = value;
        this.closeBtn.style.display = 'block';
    }

    clearInputValue() {
        this.label.style.cssText = ``;
        this.input.value = '';
        this.closeBtn.style.display = 'none';
    }

    closeDropdowns() {
        this.autocompleteDropdown.querySelector('.dropdown-lists__col').innerHTML = '';
        // this.defaultDropdown.style.maxHeight = '0';
        this.defaultDropdown.style.display = 'none';
        document.querySelector('.dropdown').scrollTop = 0;
        this.selectDropdown.style.display = 'none';
        this.autocompleteDropdown.style.display = 'none';
    }

    showElement(target) {
        target.style.display = 'block';
    }

    hideElement(target) {
        target.style.display = 'none';
    }

    lockElement(target) {
        target.setAttribute('disabled', 'true');
    }

    unlockElement(target) {
        target.removeAttribute('disabled');
    }

    eventListeners() {

        this.root.addEventListener('click', (e) => {
            let target = e.target;

            if (target === this.input) {
                // this.defaultDropdown.style.maxHeight = this.defaultDropdown.scrollHeight + "px";

                if (!this.input.value) {
                    if (this.selectDropdown.style.display !== 'block') {
                        this.hideElement(this.autocompleteDropdown);
                        this.fillDropdown(this.defaultDropdown);
                        this.showElement(this.defaultDropdown);
                    }

                }

                const inputHandler = () => {
                    this.hideElement(this.closeBtn);
                    this.showElement(this.defaultDropdown);
                    this.hideElement(this.autocompleteDropdown);

                    if (this.input.value) {
                        this.showElement(this.closeBtn);
                        this.hideElement(this.defaultDropdown);

                        //обнуление блока городов и формирование нового при каждом введении нового символа в инпут
                        this.autocompleteDropdown.querySelector('.dropdown-lists__col').innerHTML = '';
                        this.fillDropdown(this.autocompleteDropdown, null, this.input.value);
                        this.showElement(this.autocompleteDropdown);
                    }
                };

                target.addEventListener('input', inputHandler);

                target.addEventListener('blur', () => {
                    this.lockElement(this.linkBtn);
                    if (this.input.value) {
                        this.label.style.display = 'none';
                        this.unlockElement(this.linkBtn);
                    }
                    target.removeEventListener('input', inputHandler);

                });
            }

            if (target === this.closeBtn) {
                this.clearInputValue();
                this.closeDropdowns();
            }

            //переключение между дефолтом и селектом
            if (target.closest('.dropdown-lists__list--default .dropdown-lists__total-line')) {
                target = target.closest('.dropdown-lists__total-line');
                const country = target.querySelector('.dropdown-lists__country').textContent;
                this.setInputValue(country);
                //заполнение селекта
                this.fillDropdown(this.selectDropdown, country);
                this.hideElement(this.defaultDropdown);
                this.showElement(this.selectDropdown);

            }

            //обратно
            if (target.closest('.dropdown-lists__list--select .dropdown-lists__total-line')) {
                this.showElement(this.defaultDropdown);
                this.hideElement(this.selectDropdown);
            }


            //клик по городу
            if (target.closest('.dropdown-lists__line')) {
                target = target.closest('.dropdown-lists__line');
                const city = target.querySelector('.dropdown-lists__city');
                this.setInputValue(city.textContent);
                this.linkBtn.href = city.dataset.link;
                this.autocompleteDropdown.querySelector('.dropdown-lists__col').innerHTML = '';
                this.fillDropdown(this.autocompleteDropdown, null, this.input.value);
                this.hideElement(this.defaultDropdown);
                this.hideElement(this.selectDropdown);
                this.showElement(this.autocompleteDropdown);

            }
        });

        //ховеры
        this.root.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.classList.contains('dropdown-lists__city')) {
                target.classList.add('dropdown-lists__city--ip');
            }
        });

        this.root.addEventListener('mouseout', (e) => {
            const target = e.target;
            if (target.classList.contains('dropdown-lists__city--ip')) {
                target.classList.remove('dropdown-lists__city--ip');
            }
        });
    }


    init() {
        this.fetchData();
        this.lockElement(this.linkBtn);
        this.linkBtn.setAttribute('target', '_blank');
        this.fillDropdown(this.defaultDropdown);
        this.eventListeners();
    }
}

const searcher = new CitySearcher({
    input: document.getElementById('select-cities'),
    closeBtn: document.querySelector('.close-button'),
    defaultDropdown: document.querySelector('.dropdown-lists__list--default'),
    selectDropdown: document.querySelector('.dropdown-lists__list--select'),
    autocompleteDropdown: document.querySelector('.dropdown-lists__list--autocomplete'),
    root: document.querySelector('.input-cities'),
    db: 'http://localhost:3000/db',
    popup: document.getElementById('popup')
});

searcher.init();
