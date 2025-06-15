import { Test } from '$lib/server/db/bangCap.js'

export async function load({ params }) {
  const a = await Test()
  console.log({ params, a })
  return { data: a }
}