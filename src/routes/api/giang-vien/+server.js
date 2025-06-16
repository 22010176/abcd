import { json } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { GiangVien } from "$lib/server/db/schema";
import { getGiangVien } from "$lib/server/db/utils.js";

export async function GET() {
  const test = await getGiangVien()
  return json(test)
}

export async function POST({ request }) {
  const data = await request.json()
  data.ngaySinh = new Date(data.ngaySinh)

  await db.insert(GiangVien).values(data)
  return json({ success: true, data: await getGiangVien() })
}

