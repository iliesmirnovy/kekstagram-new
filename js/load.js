import { closeModal } from './form.js';

function loadData(url, onSuccess = console.log, onFail = console.error) {
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
        onSuccess(data);
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

export {loadData, sendData};