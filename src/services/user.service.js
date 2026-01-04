import axios from 'axios'

const API_URL = 'http://localhost:3000/api' // sesuaikan backend kamu

export const createUser = (data) => {
  return axios.post(`${API_URL}/users`, data)
}

export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`)
}
