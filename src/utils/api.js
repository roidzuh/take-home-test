import axios from "axios";
const BASE_URL = "http://103.164.54.252:8000/";

export const handleLogin = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}api/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserRole = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchArticles = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}api/articles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUsers = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}api/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (id, userData, accessToken) => {
  try {
    const response = await axios.put(`${BASE_URL}api/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id, accessToken) => {
  try {
    const response = await axios.delete(`${BASE_URL}api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
