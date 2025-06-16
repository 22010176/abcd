import axios from "axios";

const url = '/api/hoc-phan'

export async function getHocPhan() {
  const result = await axios.get(url)
  return result.data
}

export async function createHocPhan({ tenHP, heSoHP, soTiet }) {
  const result = await axios.post(url, { tenHP, heSoHP, soTiet })
  return result.data
}

export async function updateHocPhan(id, { tenHP, heSoHP, soTiet }) {
  const result = await axios.put(`${url}/${id}`, { tenHP, heSoHP, soTiet })
  return result.data
}

export async function deleteHocPhan(id) {
  const result = await axios.delete(`${url}/${id}`)
  return result.data
}