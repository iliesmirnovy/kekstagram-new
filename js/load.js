function loadData(url, cb = console.log) {
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

export {loadData};