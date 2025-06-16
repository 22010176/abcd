import axios from "axios";

const url = '/api/khoa'

export async function getKhoa() {
  const result = await axios.get(url)
  return result.data
}

export async function createKhoa({ tenKhoa, tenVietTat, moTaNhiemVu }) {
  const result = await axios.post(url, { tenKhoa, tenVietTat, moTaNhiemVu })
  return result.data
}

export async function updateKhoa(id, { tenKhoa, tenVietTat, moTaNhiemVu }) {
  const result = await axios.put(`${url}/${id}`, { tenKhoa, tenVietTat, moTaNhiemVu })
  return result.data
}

export async function deleteKhoa(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}