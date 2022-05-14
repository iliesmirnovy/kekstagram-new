import { imagePreview } from './image-editor.js';

const pictureUploadInput = document.querySelector('#upload-file');
const PICTURE_FILE_FORMATS = ['jpg', 'jpeg', 'png'];

pictureUploadInput.addEventListener('change', (evt) => {
    const file = pictureUploadInput.files[0];
    const fileName = file.name.toLowerCase();
    
    const matches = PICTURE_FILE_FORMATS.some((format) => {
        return fileName.endsWith(format);
    })
    
    if (matches) {
        imagePreview.src = URL.createObjectURL(file);
    }
})