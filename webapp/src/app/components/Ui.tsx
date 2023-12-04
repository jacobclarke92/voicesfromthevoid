'use client'

import { useState } from 'react'

import type { Voice } from '../constants/voices'
import { defaultVoiceConfigs } from '../constants/voices'
import { Range } from './Range'

export const Ui: React.FC = () => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      {Array.from({ length: 8 }, (_, i) => i + 1).map((voice) => (
        <Strip key={voice} voice={voice as Voice} />
      ))}
    </div>
  )
}

export const Strip: React.FC<{ voice: Voice }> = ({ voice }) => {
  const config = defaultVoiceConfigs[`voice${voice}`]
  const [hz, setHz] = useState(config.hz)
  const [minDist, setMinDist] = useState(config.minDist)
  const [maxDist, setMaxDist] = useState(config.maxDist)
  const [volume, setVolume] = useState(config.volume)
  return (
    <div className='w-full border-amber-200 border p-2'>
      <h2>Voice {voice}</h2>
      <Range label={`${hz}Hz`} value={hz} onChange={setHz} min={20} max={10000} step={1} />
      <Range label={`Volume ${volume}`} value={volume} onChange={setVolume} min={0} max={1} step={0.01} />
      <Range label={`Min Range: ${minDist}cm`} value={minDist} onChange={setMinDist} min={0} max={1000} step={1} />
      <Range label={`Max Range: ${maxDist}cm`} value={maxDist} onChange={setMaxDist} min={0} max={1000} step={1} />
    </div>
  )
}
