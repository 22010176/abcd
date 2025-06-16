import axios from "axios";

const url = '/api/lop-hoc-phan'

export async function getLopHocPhan() {
  const result = await axios.get(url)
  return result.data
}

export async function createLopHocPhan({ tenLop, soLuongSV, hocPhanId, kyHocId, giangVienId }) {
  const result = await axios.post(url, { tenLop, soLuongSV, hocPhanId, kyHocId, giangVienId })
  return result.data
}

export async function updateLopHocPhan(id, { tenLop, soLuongSV, hocPhanId, kyHocId, giangVienId }) {
  const result = await axios.put(`${url}/${id}`, { tenLop, soLuongSV, hocPhanId, kyHocId, giangVienId })
  return result.data
}

export async function deleteLopHocPhan(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}