import { getConfig } from '@/app/actions/fromPi'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const routes = ['config'] as const
type Route = (typeof routes)[number]

export async function GET(request: NextRequest, { params }: { params: { voice: string; route: Route } }) {
  const { voice: _voice, route } = params
  if (isNaN(parseInt(_voice))) return new Response(null, { status: 400 })
  const voice = parseInt(_voice)

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
