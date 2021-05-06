const digitsValidator = function() {
    this.value = this.value.replace(/[^\d]/g, '');
};

const nameValidator = function() {
    this.value = this.value.replace(/[^а-яА-Я ]/g, '');
};

const messageValidator = function() {
    this.value = this.value.replace(/[^а-яА-Я\d .,:()?!_-]/g, '');
};

const emailValidator = function() {
    this.value = this.value.replace(/[^A-Za-z@_.!~*'-]/g, '');
};

const phoneValidator = function() {
    this.value = this.value.replace(/[^\d+]/g, '').replace(/(?<=(.{12})).+/g, '');

};

export { digitsValidator, nameValidator, messageValidator, emailValidator, phoneValidator };