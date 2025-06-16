import { json } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { KyHoc } from "$lib/server/db/schema";

export async function GET() {
  const test = await db.select().from(KyHoc)
  return json(test)
}

export async function POST({ request }) {
  const data = await request.json()
  const input = {
    tenKy: data.tenKy,
    ngayBatDau: new Date(data.ngayBatDau),
    ngayKetThuc: new Date(data.ngayKetThuc)
  }
  await db.insert(KyHoc).values(input)

  return json({ success: true, data: await db.select().from(KyHoc) })
}

