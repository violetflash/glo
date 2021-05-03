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


	tryFilterByType = (type, values) => {
		try {
			//получаем сумму однотипных элементов
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			showResults(alertMsg);
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

const filterButton = document.querySelector('#filter-btn');

filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

