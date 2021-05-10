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
  savePost: (payload) => {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/posts`, payload).then(
        resp => resolve(resp.data),
        err => reject()
      )
    })
  },
  updatePost: (id, payload) => {
    return new Promise((resolve, reject) => {
      axios.put(`${API_URL}/posts/${id}`, payload).then(
        resp => resolve(resp.data),
        err => reject()
      )
    })
  },
  deletePost: (id) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${API_URL}/posts/${id}`).then(
        resp => resolve(),
        err => reject(),
      )
    })
  },
};

export default Api;