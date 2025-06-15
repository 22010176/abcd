import { db } from './index'
import { BangCap } from './schema'

export async function Test() {
  const test = await db
    .select({ id: BangCap.id, name: BangCap.tenBC })
    .from(BangCap)
  return test;
}


