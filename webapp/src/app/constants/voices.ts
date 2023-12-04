export type Voice = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type VoiceConfig = {
  hz: number
  volume: number
  waveform: string
  minDist: number
  maxDist: number
}

export const defaultVoiceConfig: VoiceConfig = {
  hz: 400,
  volume: 0.5,
  waveform: 'sine',
  minDist: 0,
  maxDist: 400,
}

export const defaultVoiceConfigs = {
  voice1: {
    ...defaultVoiceConfig,
    hz: 400,
  },
  voice2: {
    ...defaultVoiceConfig,
    hz: 420,
  },
  voice3: {
    ...defaultVoiceConfig,
    hz: 440,
  },
  voice4: {
    ...defaultVoiceConfig,
    hz: 460,
  },
  voice5: {
    ...defaultVoiceConfig,
    hz: 480,
  },
  voice6: {
    ...defaultVoiceConfig,
    hz: 500,
  },
  voice7: {
    ...defaultVoiceConfig,
    hz: 520,
  },
  voice8: {
    ...defaultVoiceConfig,
    hz: 540,
  },
} satisfies Record<`voice${Voice}`, VoiceConfig>
