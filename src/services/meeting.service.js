import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

// kalau pakai auth token (opsional)
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export const getMeetings = () => {
  return axios.get(`${API_URL}/meetings`, getAuthHeader())
}

export const createMeeting = (data) => {
  return axios.post(`${API_URL}/meetings`, data, getAuthHeader())
}

export const getMeetingDetail = (id) => {
  return axios.get(`${API_URL}/meetings/${id}`, getAuthHeader())
}

export const updateMeetingStatus = (id, status) => {
  return axios.patch(
    `${API_URL}/meetings/${id}/status`,
    { status },
    getAuthHeader()
  )
}
