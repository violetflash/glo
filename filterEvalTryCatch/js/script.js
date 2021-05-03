//объявление функции, которая принимает первый аргумент в виде типа данных (возможно значение селекта)
//и второй аргумент в виде rest аргументов
//возвращает массив из отдельных элементов values, которые равны типу type.
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//функция находит все блоки с указанным классом и скрывает их
	hideAllResponseBlocks = () => {
		//создает массив из элементов с указанным классом
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//скрывает их
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},


	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//сначала скрывает все блоки
		hideAllResponseBlocks();
		//затем делает видимым блок с указанным селектором
		document.querySelector(blockSelector).style.display = 'block';
		//если есть какой-то результат поиска
		if (spanSelector) {
			//сообщаем результат, окей или ошибка
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	//определение функции показа ошибки
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	//определение функции показа положительного результата
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	//определение функции показа сообщения по-умолчанию - без поиска совпадений
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//функция фильтрации с оберткой tey catch для
	tryFilterByType = (type, values) => {
		try {
			//получает строку из массива однотипных элементов без преобразования типов
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//создание информационного сообщения
			const alertMsg = (valuesArray.length) ?
				//если выбранный тип данных присутствует
				`Данные с типом ${type}: ${valuesArray}` :
				//если выбранный тип данных отсутствует
				`Отсутствуют данные типа ${type}`;
			//Отображает результат
			showResults(alertMsg);
		} catch (e) {
			//Или отображает ошибку
			showError(`Ошибка: ${e}`);
		}
	};

//получение элемента кнопки
const filterButton = document.querySelector('#filter-btn');

//навешивание события клик на элемент
filterButton.addEventListener('click', e => {
	//получение элемента селекта с выбором типа
	const typeInput = document.querySelector('#type');
	//получение элемента инпута, куда будут вводиться фильтруемые данные
	const dataInput = document.querySelector('#data');

	//проверка на пустой инпут
	if (dataInput.value === '') {
		//вывод кастомного поля с сообщением об ошибке
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//отображение изначального состояния информационного блока
		showNoResults();
	} else {
		//инпут не пустой - ошибки нет
		dataInput.setCustomValidity('');
		//предотвращение дефолтного события отправки формы и перезагрузки страницы
		e.preventDefault();
		//вызов функции фильтрации
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

