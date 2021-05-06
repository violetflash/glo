const scrollDown = () => {
    const scrollBtn = document.querySelector('a[href="#service-block"]'),
        menu = document.querySelector('menu'),
        menuLinks = menu.querySelectorAll('li > a');

    function scroll(e) {
        e.scrollIntoView({behavior: "smooth", block: "start"});
    }

    [...menuLinks, scrollBtn].forEach((elem) => {

        elem.addEventListener('click', function(e) {
            e.preventDefault();
            const element = this.getAttribute('href');
            const anchor = document.querySelector(`${element}`);
            scroll(anchor);
            //TODO реализовать скролл через requestAnimationFrame
        });
    });
};

export default scrollDown;