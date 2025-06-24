import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

import { db } from '$lib/server/db/index.js'
import { KyHoc } from '$lib/server/db/schema.js'

export async function PUT({ params, request }) {
  const data = await request.json()
  const input = {
    tenKy: data.tenKy,
    namHoc: data.namHoc,
    ngayBatDau: new Date(data.ngayBatDau),
    ngayKetThuc: new Date(data.ngayKetThuc)
  }
  await db.update(KyHoc).set(input).where(eq(KyHoc.id, params.id))
  return json({ success: true, data: await db.select().from(KyHoc) })
}

export async function DELETE({ params }) {
  await db.delete(KyHoc).where(eq(KyHoc.id, params.id))
  return json({ success: true, data: await db.select().from(KyHoc) })
}