import type { NextRequest } from 'next/server'

import { getConfig, ping } from '../../../actions/voice'
import type { Voice } from '../../../constants/voices'

export const dynamic = 'force-dynamic'

const getRoutes = ['config'] as const
type GetRoute = (typeof getRoutes)[number]

const postRoutes = ['ping'] as const
type PostRoute = (typeof postRoutes)[number]

export async function GET(request: NextRequest, { params }: { params: { voice: string; route: GetRoute } }) {
  const { voice: _voice, route } = params
  if (isNaN(parseInt(_voice))) return new Response(null, { status: 400 })
  const voice = parseInt(_voice) as Voice

  switch (route) {
    case 'config': {
      const data = await getConfig(voice)
      return Response.json({ data, params }, { status: 200 })
    }
    default: {
      return new Response(null, { status: 400 })
    }
  }
}

export async function POST(request: NextRequest, { params }: { params: { voice: string; route: PostRoute } }) {
  const { voice: _voice, route } = params
  if (isNaN(parseInt(_voice))) return new Response(null, { status: 400 })
  const voice = parseInt(_voice) as Voice

  switch (route) {
    case 'ping': {
      await ping(voice)
      return new Response(null, { status: 200 })
    }
    default: {
      return new Response(null, { status: 400 })
    }
  }
}
