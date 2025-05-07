import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { useWavesurfer } from '@wavesurfer/react'
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js'
import {
  PiPlayLight,
  PiPauseLight,
  PiSpeakerSimpleHighLight,
  PiSpeakerSimpleSlashLight
} from 'react-icons/pi'

const formatTime = seconds =>
  [seconds / 60, seconds % 60].map(v => `0${Math.floor(v)}`.slice(-2)).join(':')

const Player = ({ audioUrl }) => {
  const wavesurferRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: wavesurferRef,
    height: 40,
    waveColor: '#6366f1',
    progressColor: '#4345d27b',
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], [])
  })

  useEffect(() => {
    if (wavesurfer) {
      setIsLoading(true)
      wavesurfer.on('ready', () => setIsLoading(false))
      wavesurfer.on('error', () => setIsLoading(false))
    }
  }, [wavesurfer])

  // Play/Pause toggle
  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  // Mute/Unmute toggle
  const onMuteUnmute = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.setMuted(!isMuted)
      setIsMuted(!isMuted)
    }
  }, [wavesurfer, isMuted])

  return (
    <div className='flex flex-col items-center w-full space-y-5'>
      <div className='w-full'>
        <div ref={wavesurferRef} id='waveform' />
        {isLoading && (
          <p className='text-sm text-center text-gray-500'>Loading audio...</p>
        )}
      </div>

      <div className='flex items-center justify-center gap-4 w-full'>
        <p className='text-sm min-w-[50px]'>
          {isLoading ? '00:00' : formatTime(currentTime)}
        </p>

        <div
          onClick={onPlayPause}
          className={` p-3 border-black/50 border-1  cursor-pointer rounded-full ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isPlaying ? <PiPauseLight size={20} /> : <PiPlayLight size={20} />}
        </div>

        <div
          onClick={onMuteUnmute}
          className={`border-1 border-dark/50 p-2 rounded-full ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isMuted ? (
            <PiSpeakerSimpleSlashLight size={15} />
          ) : (
            <PiSpeakerSimpleHighLight size={15} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Player
