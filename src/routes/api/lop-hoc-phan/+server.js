import { json } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { LopHocPhan } from "$lib/server/db/schema";
import { getLopHocPhan } from "$lib/server/db/utils.js";

export async function GET() {
  const test = await getLopHocPhan()
  return json(test)
}

export async function POST({ request }) {
  const data = await request.json()

  await db.insert(LopHocPhan).values(data)
  return json({ success: true, data: await getLopHocPhan() })
}

