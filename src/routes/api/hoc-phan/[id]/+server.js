import { json } from '@sveltejs/kit'

import { db } from '$lib/server/db/index.js'
import { HocPhan } from '$lib/server/db/schema.js'
import { eq } from 'drizzle-orm'
import { getHocPhan } from '$lib/server/db/utils.js'

export async function PUT({ params, request }) {
  const data = await request.json()

  await db.update(HocPhan).set(data).where(eq(HocPhan.id, params.id))
  return json({ success: true, data: await getHocPhan() })
}

export async function DELETE({ params }) {
  await db.delete(HocPhan).where(eq(HocPhan.id, params.id))
  return json({ success: true, data: await getHocPhan() })
}