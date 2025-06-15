import { json } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { BangCap } from "$lib/server/db/schema";

export async function GET() {
  const test = await db
    .select()
    .from(BangCap)
  return json(test)
}

export async function POST({ request, cookies }) {
  console.log({ request, cookies })

  const data = await request.json()
  await db.insert(BangCap).values(data)

  return json({ success: true, data: await db.select().from(BangCap) })
}

