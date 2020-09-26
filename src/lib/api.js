/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// const API_SERVER = 'https://api.showcash.io'; // PROD
const API_SERVER = 'http://localhost:8080'; // DEV

export const uploadNewImage = async (payload) => {
  const url = `${API_SERVER}/api/me`;
  try {
    return axios.post(url, payload, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export const updatePost = (id, params = {}) => {
  const url = `${API_SERVER}/api/me/${id}`;
  return axios.put(url, params, {
    withCredentials: true,
  });
};


export const getPost = (id, params = {}) => {
  const url = `${API_SERVER}/api/me/${id}`;
  return axios.get(url, params, {
    withCredentials: true,
  });
};

export const postView = (params = {}) => {
  const url = `${API_SERVER}/api/view`;
  return axios.post(url, params, {
    withCredentials: true,
  });
};

export const postComment = (id, params = {}) => {
  const url = `${API_SERVER}/api/comments/${id}`;
  return axios.post(url, params, {
    withCredentials: true,
  });
};

export const getCommentsForPost = (id = {}) => {
  const url = `${API_SERVER}/api/comments/${id}`;
  return axios.get(url, {
    withCredentials: true,
  });
};

export const getMostRecent = () => {
  const url = `${API_SERVER}/api/recent`;
  return axios.get(url, {
    withCredentials: true,
  });
};

export const getUsersMostRecent = (user = {}) => {
  const url = `${API_SERVER}/api/recent/${user}`;
  return axios.get(url, {
    withCredentials: true,
  });
};

export const getMostViewed = () => {
  const url = `${API_SERVER}/api/mostviewed`;
  return axios.get(url, {
    withCredentials: true,
  });
};

export const getOtherData = (user = {}) => {
  const url = `${API_SERVER}/api/profile/${user}`;
  return axios.get(url, {
    withCredentials: true,
  });
};

export const getUserData = () => {
  const url = `${API_SERVER}/api/profile`;
  return axios.get(url, {
    withCredentials: true,
  });
};


export const updateUserData = (params = {}) => {
  const url = `${API_SERVER}/api/profile`;
  return axios.put(url, params, {
    withCredentials: true,
  });
};


export const postRegister = (params = {}) => {
  const url = `${API_SERVER}/auth/register`;
  return axios.post(url, params, {
    withCredentials: true,
  });
};

export const postLogin = (params = {}) => {
  const url = `${API_SERVER}/auth/login`;
  return axios.post(url, params, {
    withCredentials: true,
  });
};


export const getLogout = () => {
  const url = `${API_SERVER}/auth/logout`;
  return axios.get(url, {
    withCredentials: true,
  });
};


export const postWaitlist = (params = {}) => {
  const url = `${API_SERVER}/api/waitlist`;
  return axios.post(url, params, {
    withCredentials: true,
  });
};
