const showStatusMessage = (statusMessage) => {
    return function() {
        const messageFragment = document.querySelector(`#${statusMessage}`)
        .content
        .cloneNode(true);

        const message = document.body.appendChild(messageFragment);

        if (statusMessage === 'connection-error') {
            const reloadButton = document.querySelector('.reload__button');
            reloadButton.addEventListener('click', () => window.location.reload(), {once : true})
        } else if (statusMessage === 'error') {
            const errorButton = document.querySelector('.error__button');
            errorButton.addEventListener('click', () => {
                document.querySelector('.error').remove();
            }, {once : true})
        } else if (statusMessage === 'success') {
            const successButton = document.querySelector('.success__button');
            successButton.addEventListener('click', () => {
                document.querySelector('.success').remove();
            }, {once : true})
        }

        const statusMessageBackground = document.querySelector(`section.${statusMessage}`)
        statusMessageBackground.addEventListener('click', () => {
            statusMessageBackground.remove();
        }, {once : true})

        document.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 27) {
                evt.preventDefault();
                statusMessageBackground.remove();
            }  
        }, {once: true})
    }
}

export { showStatusMessage }