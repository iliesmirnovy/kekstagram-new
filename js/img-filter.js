/* global _: readonly */
import { loadData } from "./load.js";
import { createImages } from './images.js';
import { showStatusMessage } from "./status-messages.js";
import { getUniqueNumbersArray } from './utils.js';

const ACTIVE_FILTER_CLASS = 'img-filters__button--active';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';
const MAX_RANDOM_PICTURES = 10;
const ZERO_NUMBER = 0;

const Filters = {
    random(data) {
        const randomizedData = getUniqueNumbersArray(MAX_RANDOM_PICTURES, ZERO_NUMBER, data.length);
        randomizedData.forEach((randomNumber, i) => {
        randomizedData[i] = data[randomNumber];
        })
        return randomizedData;
    },
    discussed(data) {
        return data.slice().sort(Filters.sortByComments);  
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

export { Filters };