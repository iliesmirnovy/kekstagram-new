import {loadData} from "./load.js";

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const imageShow = (evt) => {

    const getImageData = (data) => {
        data.forEach((image) => {
            if (!evt.target?.attributes[1]?.nodeValue) {
                return;
            }
            if (image.url == evt.target.attributes[1].nodeValue) {
                document.body.classList.add('modal-open');
                bigPicture.classList.remove('hidden');
                bigPicture.querySelector('.comments-loader').classList.add('hidden'); 
                bigPicture.querySelector('.social__comment-count').classList.add('hidden'); 
                bigPicture.querySelector('.big-picture__img img').src = image.url;
                bigPicture.querySelector('.likes-count').textContent = image.likes;
                bigPicture.querySelector('.comments-count').textContent = image.comments.length;
                commentFeedShow(image.comments);
                bigPicture.querySelector('.social__caption').textContent = image.description;
            } 
        })
    }

    loadData('https://24.javascript.pages.academy/kekstagram/data', getImageData);

    const cancelBigPicture = document.querySelector('#picture-cancel');
    cancelBigPicture.addEventListener('click', closePopup);
    document.addEventListener('keydown', closePopupOnEsc);
}

pictures.addEventListener('click', imageShow);

const commentFeedShow = (array) => {
    const comments = document.querySelector('.social__comments');
    comments.innerHTML = '';

    const commentTemplate = () => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('social__comment');
        const commentSocialPicture = document.createElement('img');
        commentSocialPicture.classList.add('social__picture');
        commentSocialPicture.width = '35';
        commentSocialPicture.height = '35';
        const commentSocialText = document.createElement('p');
        commentSocialText.classList.add('social__text');
        commentElement.appendChild(commentSocialPicture);
        commentElement.appendChild(commentSocialText);
        return commentElement;
    }

    array.forEach((comment) => {
        const commentElement = commentTemplate().cloneNode(true);
        commentElement.querySelector('.social__picture').src = comment.avatar;
        commentElement.querySelector('.social__text').textContent = comment.message;
        commentElement.querySelector('.social__picture').alt = comment.name;
        comments.appendChild(commentElement);
    })
}



const closePopup = (evt) => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

const closePopupOnEsc = (evt) => {
    if (evt.keyCode === 27) {
        evt.preventDefault();
        bigPicture.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}
