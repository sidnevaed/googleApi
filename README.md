Работа с GOOGLE API: выведение списка книг согласно выбранным параметрам, паджинация.

1. Должны быть текстовое поле и кнопка поиска. По введенной пользователем подстроке производится поиск книг. Триггером к поиску является либо нажатие Enter (когда текстовое поле в фокусе), либо нажатие кнопки поиска.
2. Фильтрация по категориям. Ниже текстового поля располагается селект с категориями: all, art, biography, computers, history, medical, poetry. Если выбрано "all" (выбрано изначально), то поиск производится по всем категориям.
3. Сортировка. Рядом с селектом категорий находится селект с вариантами сортировки: relevance (выбран изначально), newest.
4. Найденные книги отображаются карточками, каждая из которых состоит из изображения обложки книги, названия книги, названия категории и имен авторов. Если для книги приходит несколько категорий, то отображается только первая. Авторы отображаются все. Если не приходит какой-либо части данных, то вместо нее просто пустое место. Над блоком с карточками отображается количество найденных по запросу книг.
5. Пагинация реализована по принципу 'load more'. Ниже блока с карточками находится кнопка 'Load more', по клику на нее к уже загруженным книгам подгружаются еще. Шаг пагинации - 30.
6. При клике на карточку происходит переход на детальную страницу книги, на которой выводятся ее данные: изображение обложки, название, все категории, все авторы, описание.

Используемые библиотеки:

1. Bootstrap (UI)
2. React и Redux Toolkit (AsyncThunk) (state management)
3. Typescript (типизация приложения)
4. React Router (managing routing)
5. SCSS - препроцессор (CSS)
6. Prettier (контроль качества оформления кода)
7. Eslint (контроль качества кода)
8. Тестирование (Jest и React Testing Library - не включен в итоговый проект)
