import animate from "./animate";

const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
        tabs = document.querySelectorAll('.service-header-tab'),
        tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = index => {
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
                tabs[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tabs[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };

    tabHeader.addEventListener('click', e => {
        let target = e.target;
        target = target.closest('.service-header-tab');
        if (target) {
            tabs.forEach((item, index) => {
                if (target === item) {
                    toggleTabContent(index);
                }
            });
        }
    });
};

export default tabs;
