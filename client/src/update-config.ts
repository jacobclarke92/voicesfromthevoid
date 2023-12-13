import './init'

import type { Voice } from './init'

const { API_HOSTNAME, VOICE_NUM } = process.env
const voiceNum = parseInt(VOICE_NUM!) as Voice

const main = async () => {
  console.log('fetching config...')
  const response = await fetch(`${API_HOSTNAME}/api/${voiceNum}/config`)
  const { data } = (await response.json()) as {
    data: { hz: number; minDist: number; maxDist: number; volume: number; waveform: string }
  }
  // TODO:
  // - write to config file
  // - restart pd
}

main()
