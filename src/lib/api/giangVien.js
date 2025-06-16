import axios from "axios";

const url = '/api/giang-vien'

export async function getGiangVien() {
  const result = await axios.get(url)
  return result.data
}

export async function createGiangVien({ tenGV, dienThoai, ngaySinh, email, khoaId, bangCapId }) {
  const result = await axios.post(url, { tenGV, dienThoai, ngaySinh, email, khoaId, bangCapId })
  return result.data
}

export async function updateGiangVien(id, { tenGV, dienThoai, ngaySinh, email, khoaId, bangCapId }) {
  const result = await axios.put(`${url}/${id}`, { tenGV, dienThoai, ngaySinh, email, khoaId, bangCapId })
  return result.data
}

export async function deleteGiangVien(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}

