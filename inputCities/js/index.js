class CitySearcher {
    constructor({ db, input, closeBtn, defaultDropdown }) {
        this.db = db;
        this.input = input;
        this.closeBtn = closeBtn;
        this.defaultDropdown = defaultDropdown;
        this.response = fetch(this.db);

    }

    async fillDefaultDropdown() {
        const result = await this.response;

        result.json()
            .then((response) => {
                for (const responseKey in response) {
                    //Отфильтровывание страны
                    if (responseKey !== 'RU') return;

                    const countryArray = response[responseKey];

                    countryArray.forEach(elem => {
                        //заполняем дефолтный блок
                        const countryBlock = document.createElement('div');
                        countryBlock.classList.add('dropdown-lists__countryBlock');
                        countryBlock.innerHTML = `
                            <div class="dropdown-lists__total-line">
                                <div class="dropdown-lists__country">${elem.country}</div>
                                <div class="dropdown-lists__count">${elem.count}</div>
                            </div>
                        `;

                        elem.cities.sort((a, b) => +a.count - +b.count).reverse();
                        elem.cities.forEach((city, index) => {
                            if (index > 2) return;
                            countryBlock.innerHTML += `
                                <div class="dropdown-lists__line">
                                    <div class="dropdown-lists__city">${city.name}</div>
                                    <div class="dropdown-lists__count">${city.count}</div>
                                </div>
                            `;
                        });
                        this.defaultDropdown.append(countryBlock);
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    eventListeners() {
        this.defaultDropdown.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.classList.contains('dropdown-lists__city')) {
                target.classList.add('dropdown-lists__city--ip');
            }
        });

        this.defaultDropdown.addEventListener('mouseout', (e) => {
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
    defaultDropdown: document.querySelector('.dropdown-lists__list--default .dropdown-lists__col'),
    db: 'js/db_cities.json',
});

searcher.init();