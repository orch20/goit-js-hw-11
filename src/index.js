import './css/styles.css';
import ApiService from './api-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const apiService = new ApiService();
// let gallery = new SimpleLightbox('.gallery a');

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

const refs = {
  form: document.querySelector('#search-form'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
};
// const API = {
//   key: '28032736-ad36f6ce87d03da58a29c5b67',
// };

refs.form.addEventListener('submit', onSubmit);
refs.buttonLoadMore.addEventListener('click', onLoadMore);

function onSubmit(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.searchQuery.value;
  if (apiService.query === '') {
    Notify.warning('Write down your query please.');
    return;
  }
  clearPage();
  apiService.resetPage();
  apiService.search().then(foundData);
  refs.buttonLoadMore.style.display = 'block';
}

function onLoadMore(e) {
  apiService.search().then(data => foundData(data));
}

function foundData(data) {
  console.log(data.totalHits);
  if (data.totalHits === 0) {
    refs.buttonLoadMore.style.display = 'none';
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    console.log(data.totalHits);
    Notify.success(`"Hooray! We found ${data.totalHits} images."`);
    const newData = data.hits.map(data => renderCards(data));
    if (data.totalHits < apiService.page * 40) {
      refs.buttonLoadMore.style.display = 'none';
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }
}

function renderCards(data) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = data;
  const card = `<div class="photo-card">
  <a class="photo-card_image" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}

    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
  refs.gallery.insertAdjacentHTML('beforeend', card);
}

function clearPage() {
  refs.gallery.innerHTML = '';
}
