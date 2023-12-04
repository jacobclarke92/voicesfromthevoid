import type { NextRequest } from 'next/server'

import { getLastPing } from '../../../actions/voice'
import type { Voice } from '../../../constants/voices'

export async function GET(request: NextRequest) {
  const now = Date.now()
  const pings = await Promise.all(
    Array.from({ length: 8 }, (_, i) => (i + 1) as Voice).map(async (voice) => ({ voice, ping: await getLastPing(voice) }))
  )
  const data = pings.map(({ voice, ping }) => ({ voice, ping, lag: now - ping }))
  const offlineVoices: Voice[] = []
  for (const { voice, ping, lag } of data) {
    if (lag > 10000) {
      offlineVoices.push(voice)
    }
  }

  if (offlineVoices.length > 0) {
    return Response.json({ data, offlineVoices }, { status: 500 })
  }

  return new Response(null, { status: 200 })
}
