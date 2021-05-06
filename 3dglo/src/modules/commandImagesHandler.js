import animate from "./animate";

const commandImagesHandler = () => {
    const commandSection = document.getElementById('command');

    const getDatasetValue = (target, name) => target.dataset[name];
    const setDatasetValue = (target, name, value) => {
        target.dataset[name] = value;
    };
    const switchSrcToDataAttr = (target, name) => {
        const dataAttr = getDatasetValue(target, name);
        const src = target.src.replace(/.+Glo\//g, '');
        setDatasetValue(target, name, src);
        target.src = dataAttr;
    };

    const changeImageSrc = e => {
        let target = e.target;
        if (!target.classList.contains('command__photo')) {
            return;
        }
        target = target.closest('.command__photo');
        target.classList.add('js-faded');
        setTimeout(switchSrcToDataAttr.bind(null, target, 'img'), 250);
        setTimeout(() => {
            target.classList.remove('js-faded');
        }, 250);
    };

    commandSection.addEventListener('mouseover', changeImageSrc);
    commandSection.addEventListener('mouseout', changeImageSrc);
};

export default commandImagesHandler;