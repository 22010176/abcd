import { json } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { HocPhan } from "$lib/server/db/schema";

export async function GET() {
  const test = await db.select().from(HocPhan)
  return json(test)
}

export async function POST({ request }) {
  const data = await request.json()
  await db.insert(HocPhan).values(data)

  return json({ success: true, data: await db.select().from(HocPhan) })
}

