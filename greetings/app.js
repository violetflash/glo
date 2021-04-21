/*
Вывести текущий день и время  на страницу в таком формате
Добрый день (утро, вечер, ночь в зависимости от времени суток)
Сегодня: Понедельник
Текущее время:12:05:15 PM
До нового года осталось 175 дней
 */

'use strict';

const getDate = function() {
    const today = new Date(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds(),
        dayNum = today.getDay(),
        ending = today.toLocaleTimeString('en').split(' ')[1],
        timeRemaining = New



    let time = '';



    const timeOfDay = hours < 12 ? 'утро!' :
        (hours > 12 && hours < 17) ? 'день!' :
            (hours > 17 && hours < 22) ? 'вечер!' :
                'ночи!';

    const dayName = dayNum === 0 ? 'Воскресенье' :
        dayNum === 1 ? 'Понедельник' :
            dayNum === 2 ? 'Вторник' :
                dayNum === 3 ? 'Среда' :
                    dayNum === 4 ? 'Четверг' :
                        dayNum === 5 ? 'Пятница' :
                            'Суббота';

    function checkZero(num) {
        return num < 10 ? '0' + num : num;
    }

    time = `${checkZero(hours)}:${checkZero(minutes)}:${checkZero(seconds)} ${ending}`;

    return { time, timeOfDay, dayName };
};

const today = getDate();

const greeting = today.timeOfDay === 'Утро' ? 'Доброе' :
    today.timeOfDay === 'Ночи' ? 'Доброй' :
        'Добрый';

const block = document.querySelector('div');
block.innerText = `${greeting} ${today.timeOfDay}\n`;
block.innerText += `Сегодня: ${today.dayName}\n`;
block.innerText += `Текущее время: ${today.time}\n`;

