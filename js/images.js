import { loadData } from "./load.js";
import { showStatusMessage } from "./status-messages.js";

const createImages = (data) => {
    const pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

    const imagesFragment = document.createDocumentFragment();
    const pictures = document.querySelector('.pictures');

    data.forEach((element) => {
        const picture = pictureTemplate.cloneNode(true);
        picture.querySelector('.picture__img').src = element.url;
        picture.querySelector('.picture__likes').textContent = element.likes;
        picture.querySelector('.picture__comments').textContent = element.comments.length;
        imagesFragment.appendChild(picture);
    });

    pictures.appendChild(imagesFragment);
}

loadData('https://24.javascript.pages.academy/kekstagram/data', createImages, showStatusMessage('connection-error'));