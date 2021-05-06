import animate from "./animate";

const removeRequiredAttr = () => {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        const inputs = form.querySelectorAll('input');
        inputs.forEach((element) => {
            if (element.type.toLowerCase() === 'button') return;
            element.required = false;
        });
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status-message');
        statusMessage.style.cssText = 'font-size: 2rem;padding: 20px 0;';
        form.append(statusMessage);
    });
};

export default removeRequiredAttr;
