import { json } from "@sveltejs/kit";


import { db } from "$lib/server/db";
import { HocPhan } from "$lib/server/db/schema";
import { getHocPhan } from "$lib/server/db/utils.js";

export async function GET() {
  return json(await getHocPhan())
}

export async function POST({ request }) {
  const data = await request.json()
  await db.insert(HocPhan).values(data)

  return json({ success: true, data: await getHocPhan() })
}

