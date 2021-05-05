document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    class ExchangeCalc {
        constructor({form, amount, amountLabel, currFrom, currTo, output, calcBtn, switchBtn, baseURL, apiKey}) {
            this.form = form;
            this.amount = amount;
            this.amountLabel = amountLabel;
            this.currFrom = currFrom;
            this.currTo = currTo;
            this.output = output;
            this.calcBtn = calcBtn;
            this.switchBtn = switchBtn;
            this.baseURL = baseURL;
            this.apiKey = apiKey;
            this.queryString = '';
            this.strFrom = this.currFrom.value;
            this.strTo = this.currTo.value;
            this.strAmount = '';

        }

        syncDataAttr() {
            this.amountLabel.dataset.symbol = this.currFrom.options[this.currFrom.selectedIndex].dataset.symbol;
        }

        setQueryString() {
            this.queryString = `${this.baseURL}q=${this.strFrom}_${this.strTo}&compact=ultra&${this.apiKey}`;
        }

        setStrFrom() {
            this.strFrom = this.currFrom.value;
        }

        setStrTo() {
            this.strTo = this.currTo.value;
        }

        setStrAmount() {
            this.strAmount = this.amount.value;
        }

        createLoadingAnimation() {
            const styleSheet = document.createElement("style");
            styleSheet.innerText = `
            .loading {
                flex: 1 1 25%;  
            }
            .sk-spinner-pulse {
              width: 4em;
              height: 4em;
              margin: auto;
              background-color: #337ab7;
              border-radius: 100%;
              animation: sk-spinner-pulse 1s infinite ease-in-out;
            }
            @keyframes sk-spinner-pulse {
              0% {
                  transform: scale(0);
              }
              100% {
                  transform: scale(1);
                  opacity: 0;
              }
            }
            `;
            document.head.appendChild(styleSheet);

            return `
                <div class="loading">
                    <div class="sk-spinner sk-spinner-pulse"></div>
                </div>
                                
<!--            <div class="loading">-->
<!--                <div class="sk-wandering-cubes">-->
<!--                    <div class="sk-cube sk-cube-1"></div> -->
<!--                    <div class="sk-cube sk-cube-2"></div>-->
<!--                </div>-->
<!--            </div>-->
            `;
        }

        eventListeners() {
            this.amount.addEventListener('input', () => {
                this.amount.value = this.amount.value.replace(/[^\d.]/, '');
                this.setStrAmount();
                this.setQueryString();
            });
            this.amount.addEventListener('blur', () => {
                this.amount.value = this.amount.value.replace(/(?<=(\...)).+/, '');
                this.setStrAmount();
            });

            const handleFromSelect = () => {
                this.setStrFrom();
                this.setQueryString();
                this.syncDataAttr();
            };
            this.currFrom.addEventListener('change', handleFromSelect);

            const handleToSelect = () => {
                this.setStrTo();
                this.setQueryString();
            };
            this.currTo.addEventListener('change', handleToSelect);

            this.switchBtn.addEventListener('click', () => {
                const temp = this.currFrom.value;
                this.currFrom.value = this.currTo.value;
                this.currTo.value = temp;
                this.syncDataAttr();
                this.setStrFrom();
                this.setStrTo();
                this.setQueryString();
                if (this.strAmount) {
                    this.output.innerHTML = this.createLoadingAnimation();
                    this.fetchData();
                }
            });

            this.calcBtn.addEventListener('click', (e) => {
                this.output.innerHTML = this.createLoadingAnimation();
                e.preventDefault();
                this.fetchData();
            });
        }

        outputResult(res) {
            this.output.textContent = `${this.amount.value} ${this.currFrom.value} = ${res.toFixed(2)} ${this.currTo.value}`;
        }


        fetchData() {
            console.log(this.queryString);
            fetch(this.queryString)
                .then((response) => {
                    console.log(response)
                    if (response.status !== 200) throw new Error('status code is not 200');
                    return response.json()
                        .then((data) => {
                            const result = +this.strAmount * +data[`${this.strFrom}_${this.strTo}`];
                            this.outputResult(result);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        init() {
            this.syncDataAttr();
            this.eventListeners();
        }
    }


    const calc = new ExchangeCalc({
        form: document.querySelector('.calc'),
        amount: document.getElementById('amount'),
        amountLabel: document.getElementById('amount-label'),
        currFrom: document.getElementById('currency-from'),
        currTo: document.getElementById('currency-to'),
        output: document.getElementById('output'),
        calcBtn: document.getElementById('calc-btn'),
        switchBtn: document.getElementById('switch'),
        baseURL: 'https://free.currconv.com/api/v7/convert?',
        apiKey: 'apiKey=8c1d6671c887dddb2c0c',
    });

    calc.init();
});

