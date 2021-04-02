let money = 7500;
let income = 'попрошайничество';
let addExpenses = 'алкоголь,еда,оброк хозяину';
let deposit = false;
let mission = 50000;
let period = 5;

console.log(`money: ${typeof money}`);
console.log(`income: ${typeof income}`);
console.log(`deposit: ${typeof deposit}`);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей`);

console.log(addExpenses.toLowerCase().split(','));

let budgetDay = money / 30;
console.log(budgetDay);