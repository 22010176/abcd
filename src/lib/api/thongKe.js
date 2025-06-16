import axios from 'axios'

export async function getDuLieuThongKe() {
  const result = await axios.get('/api/thong-ke')
  return result.data

}