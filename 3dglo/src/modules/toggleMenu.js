import animate from "./animate";

const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const menuHandler = () => {
        menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', (e) => {
        let target = e.target;
        if (target.closest('.menu')) {
            menuHandler();
        } else {
            //исключаем само меню и li внутри него
            if (target.closest('menu') && target.hasAttribute('href') && target !== menu) {
                menuHandler();
            }
            target = target.closest('menu');
            //если клик не по меню
            if (!target) {
                menu.classList.remove('active-menu');
            }
        }
    });
};

export default toggleMenu;