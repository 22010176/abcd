import axios from "axios";

const url = '/api/bang-cap'

export async function getBangCap() {
  const result = await axios.get(url)
  return result.data
}

export async function createBangCap({ tenBC, tenVietTat, moTa, heSo }) {
  const result = await axios.post(url, { tenBC, tenVietTat, moTa, heSo })
  return result.data
}

export async function updateBangCap(id, { tenBC, tenVietTat, moTa, heSo }) {
  const result = await axios.put(`${url}/${id}`, { tenBC, tenVietTat, moTa, heSo })
  return result.data
}

export async function deleteBangCap(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}