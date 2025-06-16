import axios from "axios";

const url = '/api/hoc-ky'

export async function getKyHoc() {
  const result = await axios.get(url)
  return result.data
}

export async function createKyHoc({ tenKy, ngayBatDau, ngayKetThuc }) {
  const result = await axios.post(url, { tenKy, ngayBatDau, ngayKetThuc })
  return result.data
}

export async function updateKyHoc(id, { tenKy, ngayBatDau, ngayKetThuc }) {
  const result = await axios.put(`${url}/${id}`, { tenKy, ngayBatDau, ngayKetThuc })
  return result.data
}

export async function deleteKyHoc(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}