import './image-editor.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadPhoto = document.querySelector('#upload-file');
const uploadOverlayClose = document.querySelector('#upload-cancel');
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');

const openModal = (evt) => {
    if (evt.currentTarget.value) {
        uploadPhotoOverlay.classList.remove('hidden');
        document.body.classList.add('modal-open');
        
        uploadOverlayClose.addEventListener('click', closeModal);
        document.addEventListener('keydown', closePopupOnEsc);
    }
}

const closeModal = (evt) => {
    uploadPhotoOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadPhoto.value = '';
}

const closePopupOnEsc = (evt) => {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        closeModal();
    }
    
}

uploadPhoto.addEventListener('change', openModal);

const descriptionInput = uploadForm.querySelector('.text__description');
const descriptionMaxLength = descriptionInput.attributes.maxlength.nodeValue;

descriptionInput.addEventListener('input', () => {
    const descriptionLength = descriptionInput.value.length;
    if (descriptionLength >= descriptionMaxLength) {
        descriptionInput.setCustomValidity(`Длинна комментария ${descriptionLength}/${descriptionMaxLength} символов`);
    } else {
        descriptionInput.setCustomValidity('');  
    } 
    descriptionInput.reportValidity();
})

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const hashtagRegexp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

hashtagInput.addEventListener('input', () => {
    const hashtagArray = hashtagInput.value.split(' ');
    console.log(hashtagArray);
    hashtagArray.forEach((hashtag) => { 
        if (hashtagRegexp.test(hashtag) === false) {
            if (hashtag.length === 1 || hashtag.length === 2 ) {
                hashtagInput.setCustomValidity('Формат хештега — #хештег (минимум 1 символ после решётки)')
            } else  {
                hashtagInput.setCustomValidity('')
            }
        } else {
            hashtagInput.setCustomValidity('');
        }
        hashtagInput.reportValidity();
    })
})




