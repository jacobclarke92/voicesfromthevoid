import { kv } from '@vercel/kv'

import type { Voice, VoiceConfig } from '../constants/voices'
import { defaultVoiceConfigs } from '../constants/voices'

export async function getConfig(voice: Voice) {
  const hz = await getHz(voice)
  const minDist = await getMinDist(voice)
  const maxDist = await getMaxDist(voice)
  const volume = await getVolume(voice)
  return { hz, minDist, maxDist, volume, waveform: 'sine' } satisfies VoiceConfig
}

export async function getHz(voice: Voice) {
  return (await kv.get<number>(`voice${voice}_hz`)) || defaultVoiceConfigs[`voice${voice}`].hz
}

export async function setHz(voice: number, hz: number) {
  return kv.set(`voice${voice}_hz`, hz)
}

export async function getMinDist(voice: Voice) {
  return (await kv.get<number>(`voice${voice}_minDist`)) || defaultVoiceConfigs[`voice${voice}`].minDist
}

export async function setMinDist(voice: number, minDist: number) {
  return kv.set(`voice${voice}_minDist`, minDist)
}

export async function getMaxDist(voice: Voice) {
  return (await kv.get<number>(`voice${voice}_maxDist`)) || defaultVoiceConfigs[`voice${voice}`].maxDist
}

export async function setMaxDist(voice: number, maxDist: number) {
  return kv.set(`voice${voice}_maxDist`, maxDist)
}

export async function getVolume(voice: Voice) {
  return (await kv.get<number>(`voice${voice}_volume`)) || defaultVoiceConfigs[`voice${voice}`].volume
}

export async function setVolume(voice: number, volume: number) {
  return kv.set(`voice${voice}_volume`, volume)
}

export async function getLastUpdated(voice: Voice) {
  return (await kv.get<number>(`voice${voice}_lastUpdated`)) || 0
}

export async function updated(voice: number) {
  return kv.set(`voice${voice}_lastUpdated`, Date.now())
}

export async function getLastPing(voice: Voice) {
  return (await kv.get<number>(`voice${voice}_lastPing`)) || 0
}

export async function ping(voice: Voice) {
  return kv.set(`voice${voice}_lastPing`, Date.now())
}
