import { loadData } from "./load.js";

/* <a href="#" class="picture">
    <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
    <span class="picture__comments"></span>
    <span class="picture__likes"></span>
    </p>
</a> */


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

loadData('https://24.javascript.pages.academy/kekstagram/data', createImages);