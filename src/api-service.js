import axios from 'axios';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  //     const API = {
  //   key: '28032736-ad36f6ce87d03da58a29c5b67',
  // };
  search() {
    console.log(this);
    return axios
      .get(
        `https://pixabay.com/api/?key=28032736-ad36f6ce87d03da58a29c5b67&q=${this.query}&page=${this.page}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true`
      )
      .then(({ data }) => {
        this.incrementPage();
        console.log(data);
        return data;
      })
      .catch(function (error) {
        console.log('error log', error);
      });
    // fetch('https://pixabay.com/api/?key=28032736-ad36f6ce87d03da58a29c5b67')
    //   .then(respond => respond.json())
    //   .then(console.log);
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
