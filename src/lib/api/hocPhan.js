import axios from "axios";

const url = '/api/hoc-phan'

export async function getHocPhan() {
  const result = await axios.get(url)
  return result.data
}

export async function createHocPhan({ khoaId, tenHP, heSoHP, soTiet, soTinChi }) {
  const result = await axios.post(url, { khoaId, tenHP, heSoHP, soTiet, soTinChi })
  return result.data
}

export async function updateHocPhan(id, { khoaId, tenHP, heSoHP, soTiet, soTinChi }) {
  const result = await axios.put(`${url}/${id}`, { khoaId, tenHP, heSoHP, soTiet, soTinChi })
  return result.data
}

export async function deleteHocPhan(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}