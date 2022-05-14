import { closeModal } from './form.js';
import { Filters } from './img-filter.js';

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
                    onSuccess(Filters.random(data));  
                break;
                case Filters.discussed:
                    onSuccess(Filters.discussed(data));
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