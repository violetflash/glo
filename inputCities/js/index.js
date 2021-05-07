class CitySearcher {
    constructor({ db, input, closeBtn, defaultDropdown, selectDropdown, root }) {
        this.db = db;
        this.input = input;
        this.closeBtn = closeBtn;
        this.defaultDropdown = defaultDropdown;
        this.selectDropdown = selectDropdown;
        this.linkBtn = document.querySelector('.button');
        this.label = document.querySelector('.label');
        this.root = root;
    }

    async fetchData() {
        return fetch(this.db);
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

    // async renderAllCities(country) {
    //     const response = await (await this.fetchData()).json();
    //     const target = this.selectDropdown.querySelector('.dropdown-lists__col');
    //     target.innerHTML = '';
    //
    //     for (const responseKey in response) {
    //         //Отфильтровывание страны
    //         const countryArray = response[responseKey];
    //
    //         countryArray.forEach(elem => {
    //             elem.cities.sort((a, b) => +a.count - +b.count).reverse();
    //             if (elem.country !== country) return;
    //
    //             target.innerHTML = this.renderCountry(elem.country, elem.count);
    //
    //             elem.cities.forEach(city => {
    //                 target.innerHTML += this.renderCity(city.name, city.count, city.link);
    //             });
    //         });
    //     }
    // }
    // async fillDefaultDropdown() {
    //     const response = await (await this.fetchData()).json();
    //
    //     for (const responseKey in response) {
    //         //Отфильтровывание страны
    //         // if (responseKey !== 'RU') return;
    //
    //         const countryArray = response[responseKey];
    //
    //         countryArray.forEach(elem => {
    //             //заполняем дефолтный блок
    //             const countryBlock = document.createElement('div');
    //             countryBlock.classList.add('dropdown-lists__countryBlock');
    //             countryBlock.innerHTML = this.renderCountry(elem.country, elem.count);
    //
    //             elem.cities.sort((a, b) => +a.count - +b.count).reverse();
    //
    //             elem.cities.forEach((city, index) => {
    //                 if (index > 2) return;
    //                 countryBlock.innerHTML += this.renderCity(city.name, city.count, city.link);
    //             });
    //             this.defaultDropdown.querySelector('.dropdown-lists__col').append(countryBlock);
    //         });
    //     }
    // }

    async fillDropdown(dropdown, country) {
        const response = await (await this.fetchData()).json();
        const target = dropdown.querySelector('.dropdown-lists__col');

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


                } else if (dropdown === this.selectDropdown) {
                    if (elem.country !== country) return;

                    target.innerHTML = this.renderCountry(elem.country, elem.count);

                    elem.cities.forEach(city => {
                        target.innerHTML += this.renderCity(city.name, city.count, city.link);
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
        this.defaultDropdown.style.maxHeight = '0';
        this.defaultDropdown.classList.remove('d-none');
        document.querySelector('.dropdown').scrollTop = 0;
        this.selectDropdown.classList.remove('d-block');
        // this.selectDropdown.style.display = 'none';
    }

    lockLinkButton() {
        this.linkBtn.disabled = true;
    }

    unlockLinkButton() {
        this.linkBtn.disabled = false;
    }

    showCloseBtn() {
        this.closeBtn.style.display = 'block';
    }

    hideCloseBtn() {
        this.closeBtn.style.display = 'none';
    }

    eventListeners() {

        this.root.addEventListener('click', (e) => {
            let target = e.target;

            const inputHandler = () => {
                if (this.input.value) {
                    this.showCloseBtn();
                }
                this.hideCloseBtn();
            };

            if (target === this.input) {
                this.defaultDropdown.style.maxHeight = this.defaultDropdown.scrollHeight + "px";
                target.addEventListener('input', () => {
                    this.showCloseBtn();
                    if (this.input.value === '') {
                        this.hideCloseBtn();
                    }
                });
                target.addEventListener('blur', () => {
                    if (this.input.value) {
                        this.label.style.display = 'none';
                    }
                })
            }

            if (target === this.closeBtn) {
                this.clearInputValue();
                this.closeDropdowns();
                //TODO закрытие всех дропдаунов
            }

            //переключение между дефолтом и селектом
            if (target.closest('.dropdown-lists__total-line')) {
                target = target.closest('.dropdown-lists__total-line');
                const country = target.querySelector('.dropdown-lists__country').textContent;
                this.setInputValue(country);
                this.fillDropdown(this.selectDropdown, country);
                this.defaultDropdown.classList.toggle('d-none');
                this.selectDropdown.classList.toggle('d-block');
            }

            if (target.closest('.dropdown-lists__line')) {
                target = target.closest('.dropdown-lists__line');
                const city = target.querySelector('.dropdown-lists__city');
                this.setInputValue(city.textContent);
                this.linkBtn.href = city.dataset.link;
            }
        });

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


    async init() {
        this.fillDropdown(this.defaultDropdown);
        this.eventListeners();
    }
}

const searcher = new CitySearcher({
    input: document.getElementById('select-cities'),
    closeBtn: document.querySelector('.close-button'),
    defaultDropdown: document.querySelector('.dropdown-lists__list--default'),
    selectDropdown: document.querySelector('.dropdown-lists__list--select'),
    root: document.querySelector('.input-cities'),
    db: 'js/db_cities.json',
});

searcher.init();