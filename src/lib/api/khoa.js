import axios from "axios";

const url = '/api/khoa'

export async function getKhoa() {
  const result = await axios.get(url)
  return result.data
}

export async function createKhoa({ maKhoa, tenKhoa, tenVietTat, moTaNhiemVu }) {
  const result = await axios.post(url, { maKhoa, tenKhoa, tenVietTat, moTaNhiemVu })
  return result.data
}

export async function updateKhoa(id, { maKhoa, tenKhoa, tenVietTat, moTaNhiemVu }) {
  const result = await axios.put(`${url}/${id}`, { maKhoa, tenKhoa, tenVietTat, moTaNhiemVu })
  return result.data
}

export async function deleteKhoa(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}