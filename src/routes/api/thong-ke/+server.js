import { getDanhSachHocPhanGiangVien } from "$lib/server/db/utils";
import { json } from "@sveltejs/kit";

export async function GET() {
  const res = await getDanhSachHocPhanGiangVien()
  return json(res)
}


