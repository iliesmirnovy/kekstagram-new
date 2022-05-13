import { closeModal } from './form.js';
import { Filters } from './img-filter.js';
import { getRandomIntFromRange } from './utils.js'

function loadData(url, onSuccess = console.log, onFail = console.error, filter) {
    fetch(url)
    .then((response) => {
        if (response.ok) {
            return response;
        }
        const {statusText, status} = response;
        throw new Error (`${status} – ${statusText}`);
    })
    .then((response) => response.json())
    .then((data) => {
        if (filter) {
            switch(filter) {
                case Filters.random:
                    const randomizedData = data.slice(0, 10);
                    const uniqueNumbers = [];
                    while (uniqueNumbers.length < randomizedData.length) {
                        const randomNumber = getRandomIntFromRange(0, data.length);
                        if (!uniqueNumbers.includes(randomNumber)) {
                            uniqueNumbers.push(randomNumber);
                        } else {
                            continue;
                        }
                    }
                    uniqueNumbers.forEach((randomNumber, i) => {
                        randomizedData[i] = data[randomNumber];
                        })
                    onSuccess(randomizedData);  
                break;
                case Filters.discussed:
                    const sortedByCommentsData = data.slice();
                    sortedByCommentsData.sort(Filters.sortByComments);
                    onSuccess(sortedByCommentsData);
                break;
                default: 
                    onSuccess(data);
            }
        } else {
            onSuccess(data);
        }
    })
    .then((data) => {
        const imagesFilter = document.querySelector('.img-filters ');
        imagesFilter.style.opacity = '1';
    })
    .catch((err) => {
        onFail(err);
    })
}

function sendData(url, sendMethodParameters, onSuccess = console.log, onFail = console.error) {
    fetch(url, sendMethodParameters)
    .then((response) => {
        if (response.ok) {
            return response;
        }
        const {statusText, status} = response;
        throw new Error (`${status} – ${statusText}`);
    })
    .then((response) => response.json())
    .then((json) => {
        onSuccess();
        closeModal();
    })
    .catch((err) => {
        onFail(err);
        closeModal();
    })
    .finally(() => {
        document.body.classList.add('modal-open');
    })
}

export { loadData, sendData };