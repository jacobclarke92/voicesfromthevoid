import './init'

import type { Voice } from './init'

const { API_HOSTNAME, VOICE_NUM } = process.env
const voiceNum = parseInt(VOICE_NUM!) as Voice

const main = async () => {
  await fetch(`${API_HOSTNAME}/api/${voiceNum}/ping`)
}

main()
