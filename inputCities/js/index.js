class CitySearcher {
    constructor({ db, input, closeBtn, defaultDropdown, selectDropdown, autocompleteDropdown, root }) {
        this.db = db;
        this.input = input;
        this.closeBtn = closeBtn;
        this.defaultDropdown = defaultDropdown;
        this.selectDropdown = selectDropdown;
        this.autocompleteDropdown = autocompleteDropdown;
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

    async fillDropdown(dropdown, country, searchTerm) {
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
                }

                if (dropdown === this.selectDropdown) {
                    if (elem.country !== country) return;

                    target.innerHTML = this.renderCountry(elem.country, elem.count);

                    elem.cities.forEach(city => {
                        target.innerHTML += this.renderCity(city.name, city.count, city.link);
                    });
                }

                if (dropdown === this.autocompleteDropdown) {

                    const regExp = new RegExp(searchTerm, 'gi');
                    elem.cities.forEach((city) => {
                        if (regExp.test(city.name.toLowerCase())) {
                            target.innerHTML += this.renderCity(city.name, city.count, city.link);
                        }
                        // if (index > 0 && target.innerHTML === '') {
                        //     target.innerHTML = 'не найдено';
                        // }
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

    closeDefaultDropdown() {
        // this.defaultDropdown.style.maxHeight = '0';
        this.defaultDropdown.style.display = 'none';
    }

    showDefaultDropdown() {
        this.defaultDropdown.style.display = 'block';
    }

    closeSelectDropDown() {
        this.selectDropdown.style.display = 'none';
    }

    showSelectDropDown() {
        this.selectDropdown.style.display = 'block';
    }

    closeAutocompleteDropdown() {
        this.autocompleteDropdown.style.display = 'none';
    }

    showAutocompleteDropdown() {
        this.autocompleteDropdown.style.display = 'block';
    }

    lockLinkButton() {
        this.linkBtn.setAttribute('disabled', 'true');
    }

    unlockLinkButton() {
        this.linkBtn.removeAttribute('disabled');
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

            if (target === this.input) {
                // this.defaultDropdown.style.maxHeight = this.defaultDropdown.scrollHeight + "px";

                // const styles = window.getComputedStyle(this.defaultDropdown);
                // console.log(styles.maxHeight);
                this.showDefaultDropdown();

                const inputHandler = () => {
                    this.hideCloseBtn();
                    this.showDefaultDropdown();
                    this.closeAutocompleteDropdown();

                    if (this.input.value) {
                        this.showCloseBtn();
                        this.closeDefaultDropdown();
                        this.autocompleteDropdown.querySelector('.dropdown-lists__col').innerHTML = '';
                        this.fillDropdown(this.autocompleteDropdown, null, this.input.value);
                        this.showAutocompleteDropdown();
                    } else {
                        this.autocompleteDropdown.querySelector('.dropdown-lists__col').innerHTML = 'нету ничего';
                    }



                    if (this.input.value === '') {

                    }

                    // target.removeEventListener('input', inputHandler);

                };

                target.addEventListener('input', inputHandler);

                target.addEventListener('blur', () => {
                    this.lockLinkButton();
                    if (this.input.value) {
                        this.label.style.display = 'none';
                        this.unlockLinkButton();
                    }
                    target.removeEventListener('input', inputHandler);

                });
            }

            if (target === this.closeBtn) {
                this.clearInputValue();
                this.closeDropdowns();
                //TODO закрытие всех дропдаунов
            }

            //переключение между дефолтом и селектом
            if (target.closest('.dropdown-lists__list--default .dropdown-lists__total-line')) {
                target = target.closest('.dropdown-lists__total-line');
                const country = target.querySelector('.dropdown-lists__country').textContent;
                this.setInputValue(country);
                this.fillDropdown(this.selectDropdown, country);
                this.closeDefaultDropdown();
                this.showSelectDropDown();
            }

            if (target.closest('.dropdown-lists__list--select .dropdown-lists__total-line')) {
                this.showDefaultDropdown();
                this.closeSelectDropDown();
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


    init() {
        this.lockLinkButton();
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
    db: 'js/db_cities.json',
});

searcher.init();