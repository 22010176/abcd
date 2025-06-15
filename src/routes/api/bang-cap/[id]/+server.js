import { json } from '@sveltejs/kit'

import { db } from '$lib/server/db/index.js'
import { BangCap } from '$lib/server/db/schema.js'
import { eq } from 'drizzle-orm'

export async function PUT({ params, request }) {
  const data = await request.json()

  await db.update(BangCap).set(data).where(eq(BangCap.id, params.id))
  console.log(params, data)
  return json({ success: true, data: await db.select().from(BangCap) })
}

export async function DELETE({ params }) {
  await db.delete(BangCap).where(eq(BangCap.id, params.id))
  return json({ success: true, data: await db.select().from(BangCap) })
}