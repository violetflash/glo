document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    class ExchangeCalc {
        constructor({form, amount, amountLabel, currFrom, currTo, result, calcBtn, switchBtn, baseURL}) {
            this.form = form;
            this.amount = amount;
            this.amountLabel = amountLabel;
            this.currFrom = currFrom;
            this.currTo = currTo;
            this.result = result;
            this.calcBtn = calcBtn;
            this.switchBtn = switchBtn;
            this.baseURL = baseURL;
            this.requestString = '';
            this.strFrom = this.currFrom.value;
            this.strTo = this.currTo.value;
            this.strAmount = '';
        }

        syncDataAttr() {
            this.amountLabel.dataset.symbol = this.currFrom.options[this.currFrom.selectedIndex].dataset.symbol;
        }

        setRequestString() {
            this.requestString = `${this.baseURL}&from=${this.strFrom}&to=${this.strTo}&amount=${this.strAmount}`;
            console.log(this.requestString);
        }

        setStrFrom() {
            this.strFrom = this.currFrom.value;
        }

        setStrTo() {
            this.strTo = this.currTo.value;
        }

        eventListeners() {
            this.amount.addEventListener('input', () => {
                this.amount.value = this.amount.value.replace(/[^\d.]/, '');
                this.strAmount = this.amount.value;
                this.setRequestString();
            });
            this.amount.addEventListener('blur', () => {
                //TODO отсекать цифры после первой точки
            });

            const handleFromSelect = () => {
                this.setStrFrom();
                this.setRequestString();
                this.syncDataAttr();
            };
            this.currFrom.addEventListener('change', handleFromSelect);

            const handleToSelect = () => {
                this.setStrTo();
                this.setRequestString();
            };
            this.currTo.addEventListener('change', handleToSelect);

            this.switchBtn.addEventListener('click', () => {
                const temp = this.currFrom.value;
                this.currFrom.value = this.currTo.value;
                this.currTo.value = temp;
                this.syncDataAttr();
                this.setStrFrom();
                this.setStrTo();
                this.setRequestString();
            });

            this.calcBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.fetchData();
            });
        }

        fetchData() {
            console.log(this.requestString);
            // fetch(this.requestString)
            //     .then((response) => {
            //         console.log(response)
            //         if (response.status !== 200) throw new Error('status code is not 200');
            //         return response.json()
            //             .then((data) => {
            //                 console.log(data);
            //             });
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });
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
        result: document.getElementById('result'),
        calcBtn: document.getElementById('calc-btn'),
        switchBtn: document.getElementById('switch'),
        baseURL: 'https://api.exchangeratesapi.io/v1/convert?access_key=96262ac2a844c5c5300ad6e2e80a7c8e',
        symbols: '&symbols=USD,RUB,EUR',
    });

    calc.init();
});

