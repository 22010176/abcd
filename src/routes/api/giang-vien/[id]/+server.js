import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

import { db } from '$lib/server/db/index.js'
import { GiangVien } from '$lib/server/db/schema.js'
import { getGiangVien } from '$lib/server/db/utils.js'

export async function PUT({ params, request }) {
  const data = await request.json()
  data.ngaySinh = new Date(data.ngaySinh)
  await db.update(GiangVien).set(data).where(eq(GiangVien.id, params.id))
  return json({ success: true, data: await getGiangVien() })
}

export async function DELETE({ params }) {
  await db.delete(GiangVien).where(eq(GiangVien.id, params.id))
  return json({ success: true, data: await getGiangVien() })
}