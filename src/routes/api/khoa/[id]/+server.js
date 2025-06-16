import { json } from '@sveltejs/kit'

import { db } from '$lib/server/db/index.js'
import { Khoa } from '$lib/server/db/schema.js'
import { eq } from 'drizzle-orm'

export async function PUT({ params, request }) {
  const data = await request.json()

  await db.update(Khoa).set(data).where(eq(Khoa.id, params.id))
  return json({ success: true, data: await db.select().from(Khoa) })
}

export async function DELETE({ params }) {
  await db.delete(Khoa).where(eq(Khoa.id, params.id))
  return json({ success: true, data: await db.select().from(Khoa) })
}