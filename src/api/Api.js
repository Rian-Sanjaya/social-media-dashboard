import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Api = {
  fetchUsers: () => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/users`).then(
        resp => resolve(resp.data),
        err => reject(),
      );
    });
  },
  fetchUserPosts: (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/posts?userId=${id}`).then(
        resp => resolve(resp.data),
        err => reject(),
      );
    });
  },
  fetchUserAlbums: (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/albums?userId=${id}`).then(
        resp => resolve(resp.data),
        err => reject(),
      );
    });
  },
  fetchUserAlbum: (id) => {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/photos?albumId=${id}`).then(
        resp => resolve(resp.data),
        err => reject(),
      );
    });
  },
};

export default Api;