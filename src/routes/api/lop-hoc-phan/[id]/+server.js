import { json } from '@sveltejs/kit'
import { eq } from 'drizzle-orm'

import { db } from '$lib/server/db/index.js'
import { LopHocPhan } from '$lib/server/db/schema.js'
import { getLopHocPhan } from '$lib/server/db/utils.js'

export async function PUT({ params, request }) {
  const data = await request.json()

  await db.update(LopHocPhan).set(data).where(eq(LopHocPhan.id, params.id))
  return json({ success: true, data: await getLopHocPhan() })
}

export async function DELETE({ params }) {
  await db.delete(LopHocPhan).where(eq(LopHocPhan.id, params.id))
  return json({ success: true, data: await getLopHocPhan() })
}