import { config as dotenv } from 'dotenv'

dotenv({ path: './.env' })
dotenv({ path: './.env.local' })

export type Voice = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

const { API_HOSTNAME, VOICE_NUM } = process.env
if (!VOICE_NUM) throw new Error('VOICE_NUM not set in .env.local')
if (!API_HOSTNAME) throw new Error('API_HOSTNAME not set in .env.local')
