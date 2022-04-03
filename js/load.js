console.log('Модуль load.js подключён');

function loadData(url, cb) {
    fetch(url)
    .then((response) => {
        if (response.ok) {
            return response;
        }
        const {statusText, status} = response;
        throw new Error (`${status}, – ${statusText}`);
    })
    .then((response) => response.json())
    .then((data) => {
        cb(data);
    })
}

//loadData('https://24.javascript.pages.academy/kekstagram/data', console.log);