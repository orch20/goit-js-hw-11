import './css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#search-form'),
  button: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget.searchQuery.value);
  search(e.currentTarget.searchQuery.value);
}

// fetch('https://pixabay.com/api/?key=28032736-ad36f6ce87d03da58a29c5b67')
//   .then(respond => respond.json())
//   .then(console.log);
function search(query) {
  axios
    .get(
      `https://pixabay.com/api/?key=28032736-ad36f6ce87d03da58a29c5b67&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(res => foundData(res.data))
    .catch(function (error) {
      console.log('error log', error);
    });
}

function foundData(data) {
  if (!data.total) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    const newData = data.hits.map(data => renderCards(data)));
    
  }
}


// largeImageURL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function renderCards(data) {
  console.log(data);
  const {webformatURL,largeImageURL, tags, likes, views, comments, downloads} = data
  const card = `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
  refs.gallery.insertAdjacentHTML('beforeend',card)
}
