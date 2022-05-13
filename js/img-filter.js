/* global _: readonly */
import { loadData } from "./load.js";
import { createImages } from './images.js';
import { showStatusMessage } from "./status-messages.js";
// 5.3. При переключении фильтров, отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз 500 мс (устранение
// дребезга).
// 6. Необязательная функциональность
// 6.1. После выбора изображения пользователем с помощью стандартного контрола загрузки файла #upload-file , нужно подставить его в форму редактирования вместо тестового изображения.


const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const Filters = {
    random() {
        console.log('сработал фильтр random');
    },
    discussed() {
        console.log('сработал фильтр discussed');
    },
    default() {
        console.log('сработал фильтр default');
    },
    sortByComments(a,b) {
        if (a.comments.length < b.comments.length) {
            return 1;
        }
        if (a.comments.length > b.comments.length) {
            return -1;
        }
        return 0;
    },
}
const RERENDER_DELAY = 500;

const setFilter = (evt) => {
    const filterButtons = imgFilterForm.querySelectorAll('[type=button');
    filterButtons.forEach((button) => {
        if (button == evt.target) {
            button.classList.add(ACTIVE_FILTER_CLASS);
        } else {
            button.classList.remove(ACTIVE_FILTER_CLASS);
        }
    })
}

const loadfilteredData = (evt) => {
    switch(evt.target.id) {
        case FILTER_RANDOM:
            loadFilteredPictures(Filters.random);
        break;
        case FILTER_DISCUSSED:
            loadFilteredPictures(Filters.discussed);
        break;
        default:
            loadFilteredPictures(Filters.default);
        break;
    }
}

const imgFilterForm = document.querySelector('.img-filters__form');
imgFilterForm.addEventListener('click', setFilter);
imgFilterForm.addEventListener('click', _.debounce(loadfilteredData, RERENDER_DELAY));



function loadFilteredPictures(filter) {
    loadData('https://24.javascript.pages.academy/kekstagram/data', createImages, showStatusMessage('connection-error'), filter);
}
console.log(loadFilteredPictures);
export { Filters };