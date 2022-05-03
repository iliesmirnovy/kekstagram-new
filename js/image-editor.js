let scaleControlValue = document.querySelector('.scale__control--value');
const scaleControl = document.querySelector('.img-upload__scale');
let scaleControlInt = parseInt(scaleControlValue.value);
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
imagePreview.style.transition = 'all 0.2s ease-in-out 0s';

const SCALE_INCREMENT = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

scaleControlValue.value = `${SCALE_DEFAULT}%`;

const scaleImagePreview = (evt) => {
    if (evt.target === scaleControlBigger) {
        if (scaleControlInt <= SCALE_MAX - SCALE_INCREMENT) {
            scaleControlInt += SCALE_INCREMENT;
        }
    } else {
        if (scaleControlInt >= SCALE_MIN + SCALE_INCREMENT) {
            scaleControlInt -= SCALE_INCREMENT;
        }
    }
    scaleControlValue.value = `${scaleControlInt}%`;
    imagePreview.style.transform = `scale(${scaleControlInt / 100})`;
}

scaleControl.addEventListener('click', scaleImagePreview);