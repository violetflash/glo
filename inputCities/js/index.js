class CitySearcher {
    constructor({ db, input, closeBtn, defaultDropdown, selectDropdown, root }) {
        this.db = db;
        this.input = input;
        this.closeBtn = closeBtn;
        this.defaultDropdown = defaultDropdown;
        this.selectDropdown = selectDropdown;
        this.root = root;
        this.response = fetch(this.db);

    }

    renderCity(name, count) {
        return `
            <div class="dropdown-lists__line">
                <div class="dropdown-lists__city">${name}</div>
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

    async fillDefaultDropdown() {
        const result = await this.response;

        result.json()
            .then((response) => {
                for (const responseKey in response) {
                    //Отфильтровывание страны //TODO временная фигня
                    // if (responseKey !== 'RU') return;

                    const countryArray = response[responseKey];

                    countryArray.forEach(elem => {
                        //заполняем дефолтный блок
                        const countryBlock = document.createElement('div');
                        countryBlock.classList.add('dropdown-lists__countryBlock');
                        countryBlock.innerHTML = this.renderCountry(elem.country, elem.count);

                        elem.cities.sort((a, b) => +a.count - +b.count).reverse();

                        elem.cities.forEach((city, index) => {
                            if (index > 2) return;
                            countryBlock.innerHTML += this.renderCity(city.name, city.count);
                        });
                        this.defaultDropdown.querySelector('.dropdown-lists__col').append(countryBlock);
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    async renderAllCities(country) {
        const response = fetch(this.db);
        const result = await response;
        const target = this.selectDropdown.querySelector('.dropdown-lists__col');
        target.innerHTML = '';

        result.json()
            .then((response) => {
                for (const responseKey in response) {
                    //Отфильтровывание страны
                    // if (responseKey !== 'RU') return;

                    const countryArray = response[responseKey];

                    countryArray.forEach(elem => {
                        elem.cities.sort((a, b) => +a.count - +b.count).reverse();
                        if (elem.country !== country) return;

                        target.innerHTML = this.renderCountry(elem.country, elem.count);

                        elem.cities.forEach(city => {
                            target.innerHTML += this.renderCity(city.name, city.count);
                        });
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    eventListeners() {

        this.root.addEventListener('click', (e) => {
            let target = e.target;

            if (target === this.input) {
                const panel = this.defaultDropdown;
                if (panel.classList.contains('js-opened')) {
                    panel.style.maxHeight = '0';
                    panel.classList.remove('js-opened');
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    panel.classList.add('js-opened');
                }
            }

            //переключение между дефолтом и селектом
            if (target.closest('.dropdown-lists__total-line')) {
                target = target.closest('.dropdown-lists__total-line');
                const country = target.querySelector('.dropdown-lists__country').textContent;
                this.renderAllCities(country);
                // this.defaultDropdown.classList.add('js-moved-off');
                this.defaultDropdown.classList.toggle('d-none');
                this.selectDropdown.classList.toggle('d-block');
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


    init() {
        this.fillDefaultDropdown();
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