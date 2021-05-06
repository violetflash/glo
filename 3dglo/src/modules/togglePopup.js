import animate from "./animate";

const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        btnPopup = document.querySelectorAll('.popup-btn');

    if (document.documentElement.clientWidth > 768) {
        popupContent.style.top = `-${popupContent.offsetHeight}px`;
    }

    const popupArrival = () => {
        animate({
            duration: 500,
            timing(timeFraction) {
                return 1 - Math.sin(Math.acos(timeFraction));
            },
            draw(progress) {
                popup.style.display = 'block';
                if (document.documentElement.clientWidth > 768) {
                    if (popupContent.offsetTop < 90) {
                        popupContent.style.top = -popupContent.offsetHeight + progress * 1000 + 'px';
                    }
                }
            }
        });
    };

    const popupDeparture = () => {
        animate({
            duration: 500,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                if (document.documentElement.clientWidth > 768) {
                    if (popupContent.offsetTop > -popupContent.offsetHeight) {
                        popupContent.style.top = popupContent.offsetTop - progress * 100 + 'px';
                    } else {
                        popup.style.display = 'none';
                    }
                } else {
                    popup.style.display = 'none';
                }

            },
        });
    };

    btnPopup.forEach(elem => elem.addEventListener('click', popupArrival));

    popup.addEventListener('click', (e) => {
        let target = e.target;
        if (target.classList.contains('popup-close')) {
            popupDeparture();
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popupDeparture();
            }
        }
    });
};

export default togglePopup;