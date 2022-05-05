const sliderEffect = document.querySelector('.effect-level__slider');
let effectInput = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');


const DEFAULT_EFFECT_VALUE = 100;
effectInput.value = DEFAULT_EFFECT_VALUE;

const imageEffects = {
    'none': 'effects__preview--none',
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat',
}

noUiSlider.create(sliderEffect, {
    start: DEFAULT_EFFECT_VALUE,
    connect: 'lower',
    range: {
        min: 0,
        max: 100
    },
    step: 1,
});

sliderEffect.noUiSlider.on('update', (_, handle, sliderValue) => {
    effectInput.value = sliderValue;
    updateEffectOptions();
})


effectList.addEventListener('change', (evt) => {  
    effectLevel.classList.remove('hidden');  
    imagePreview.className = '';
    const effectName = evt.target.nextElementSibling.children[0].className.split(' ')[2];
    imagePreview.classList.add(effectName);
    updateSliderOptions();
})

function updateSliderOptions() {
    switch(imagePreview.className) {
        case imageEffects.chrome:
        sliderEffect.noUiSlider.updateOptions({
            range: {
                min: 0,
                max: 1
            },
            step: 0.1,
            }
        );
        sliderEffect.noUiSlider.set(1);
        break;
        case imageEffects.sepia:
        sliderEffect.noUiSlider.updateOptions({
            range: {
                min: 0,
                max: 1
            },
            step: 0.1,
            }
        );
        sliderEffect.noUiSlider.set(1);
        break;
        case imageEffects.marvin:
        sliderEffect.noUiSlider.updateOptions({
            range: {
                min: 0,
                max: 100
            },
            step: 1,
            }
        );
        sliderEffect.noUiSlider.set(100);
        break;
        case imageEffects.phobos:
        sliderEffect.noUiSlider.updateOptions({
            range: {
                min: 0,
                max: 3
            },
            step: 0.1,
            }
        );
        sliderEffect.noUiSlider.set(3);
        break;
        case imageEffects.heat:
        sliderEffect.noUiSlider.updateOptions({
            range: {
                min: 1,
                max: 3
            },
            step: 0.1,
            }
        );
        sliderEffect.noUiSlider.set(3);
        break;
        default:
        sliderEffect.noUiSlider.updateOptions({
            range: {
                min: 0,
                max: 100
            },
            step: 1,
            }
        );
        sliderEffect.noUiSlider.set(100);
        break;
    }
}

function updateEffectOptions() {
    switch(imagePreview.className) {
        case imageEffects.chrome:
        imagePreview.style.filter = `grayscale(${effectInput.value})`;
        break;
        case imageEffects.sepia:
        imagePreview.style.filter = `sepia(${effectInput.value})`;
        break;
        case imageEffects.marvin:
        imagePreview.style.filter = `invert(${effectInput.value}%)`;
        break;
        case imageEffects.phobos:
        imagePreview.style.filter = `blur(${effectInput.value}px)`;
        break;
        case imageEffects.heat:
        imagePreview.style.filter = `brightness(${effectInput.value})`;
        break;
        default:
        effectLevel.classList.add('hidden');
        break;
    }
}

function resetImagePreviewEffect() {
    imagePreview.style = '';
    imagePreview.classList = '';
    effectList.querySelector('#effect-none').checked = true;
    effectLevel.classList.add('hidden');
}

export {resetImagePreviewEffect}