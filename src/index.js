import './css/styles.css';
import axios from 'axios';

const refs = {
  form: document.querySelector('#search-form'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('submit', onSubmit);
const qwerty = 'asdasdasd';

function onSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget.searchQuery.value);
}

// fetch('https://pixabay.com/api/?key=28032736-ad36f6ce87d03da58a29c5b67')
//   .then(respond => respond.json())
//   .then(console.log);

// axios
//   .get('https://pixabay.com/api/?key=28032736-ad36f6ce87d03da58a29c5b67')
//   .then(res => console.log(res.data));

function renderCards() {
  `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
}
