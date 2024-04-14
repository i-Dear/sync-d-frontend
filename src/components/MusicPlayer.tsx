"use client";

import { WaveForm } from "@/components/WaveForm";
import { useMutation, useStorage } from "~/liveblocks.config";
import { useSkipToListener } from "~/src/hooks/useSkipTo";
import * as Slider from "@radix-ui/react-slider";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pause as PauseIcon, Play as PlayIcon } from "react-feather";
import { cn } from "@/lib/utils";

const musics = [
  {
    title: "고민중독",
    artist: "QWER",
    src: "/qwer.mp3",
    cover: "/qwer.png",
  },
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0);
  const [mute, setMute] = useState(true);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const seeking = useRef(false);
  const [duration, setDuration] = useState(0);
  const projectMusic = useStorage((root) => root.music);

  // 프로젝트 내 전체 음악 재생 상태 변경
  const updateMusicState = useMutation(({ storage }, playing: boolean) => {
    const projectMusic = storage.get("music");
    projectMusic.set("musicState", playing ? "playing" : "paused");
  }, []);

  // 프로젝트 내 전체 음악 시간 변경
  const updateMusicTime = useMutation(({ storage }, time: number) => {
    const projectMusic = storage.get("music");
    projectMusic.set("musicTime", time);
  }, []);

  // 음악 길이 설정
  const setAudioDuration = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    if (!Number.isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  // audio가 먼저 로드될 경우, 컴포넌트 마운트 시 지속 시간 확인
  useEffect(() => {
    setAudioDuration();
  }, [setAudioDuration]);

  // 음악 재생 시간 업데이트 (재생 중일 때)
  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    if (!seeking.current) {
      setTime(audioRef.current.currentTime);
    }
  }, []);

  // 음악 재생 종료 처리
  const handleEnded = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    setPlaying(false);
    audioRef.current.currentTime = 0;
    audioRef.current.pause();
  }, []);

  // 음악 재생/일시정지 토글
  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      return null;
    }

    updateMusicState(!playing);
  }, [playing, updateMusicState]);

  // 음소거 토글
  const toggleMute = useCallback(() => {
    if (!audioRef.current) {
      return;
    }

    if (!mute) {
      audioRef.current.muted = true;
    } else {
      audioRef.current.muted = false;
      audioRef.current.play();
    }
    setMute(!mute);
    audioRef.current.muted = !mute;
  }, [mute]);

  // 슬라이더 변경 시, 시간 업데이트
  const handleSliderChange = useCallback(([value]: [number]) => {
    if (!audioRef.current) {
      return;
    }

    seeking.current = true;
    setTime(value);
  }, []);

  // 슬라이더 변경 후, 시간 업데이트
  const handleSliderCommit = useCallback(
    ([value]: [number]) => {
      if (!audioRef.current) {
        return;
      }

      seeking.current = false;
      setTime(value);
      updateMusicTime(value);
      setPlaying(true);
      updateMusicState(true);
      audioRef.current.currentTime = value;
      audioRef.current.play();
    },
    [updateMusicState, updateMusicTime]
  );

  // skipTo 이벤트 받아서 시간 업데이트하는 로직 (hooks의 useSkipToListener 사용)
  useSkipToListener((newTime) => {
    if (!audioRef.current) {
      return;
    }

    seeking.current = false;
    setPlaying(true);
    updateMusicState(true);
    setTime(newTime);
    updateMusicTime(newTime);
    audioRef.current.currentTime = newTime;
    audioRef.current.play();
  });

  // 음악 전체 재생 상태 변경 시, 플레이/일시정지 처리
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (projectMusic.musicState === "playing") {
      setPlaying(true);
      audioRef.current.play();
    } else {
      setPlaying(false);
      audioRef.current.pause();
    }
    console.log("togglePlay", projectMusic.musicState);
  }, [projectMusic.musicState]);

  // 음악 전체 재생 시간 변경 시, 시간 업데이트
  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.currentTime = projectMusic.musicTime;
    setTime(projectMusic.musicTime);
  }, [projectMusic.musicTime]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <audio
            ref={audioRef}
            src={musics[0].src}
            preload="true"
            onLoadedMetadata={setAudioDuration}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            muted={mute}
            autoPlay
          />
          <div className="w-full flex items-center justify-center gap-4">
            <div
              className={cn(
                "relative bg-neutral-900 w-20 aspect-square rounded-3xl overflow-hidden transition-transform ease-out-back duration-300 shadow-2xl",
                "after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-br after:from-transparent after:via-white/5 after:pointer-events-none after:to-transparent",
                {
                  "scale-95": !playing,
                }
              )}
            >
              <div className="scale-75">
                <Image
                  className="rounded-full animate-spin-slow select-none"
                  style={{
                    animationPlayState: playing ? "running" : "paused",
                  }}
                  src={musics[0].cover}
                  width={384}
                  height={384}
                  alt=""
                />
              </div>
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  type="button"
                  className="size-4 shadow-xl rounded-full hover:scale-120 transition-transform ease-out-expo duration-500"
                  onClick={togglePlay}
                  title={playing ? "Pause" : "Play"}
                >
                  <span className="sr-only">{playing ? "Pause" : "Play"}</span>
                  <PauseIcon
                    className={cn(
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-transparent fill-neutral-900 transition duration-300 ease-out-expo",
                      {
                        "scale-50 opacity-0": !playing,
                      }
                    )}
                  />
                  <PlayIcon
                    className={cn(
                      "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-transparent fill-neutral-900 ml-0.5 transition duration-300 ease-out-expo",
                      {
                        "scale-50 opacity-0": playing,
                      }
                    )}
                  />
                </button>
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-medium text-lg">{musics[0].title}</span>
              <span className="text-neutral-600 text-sm">{musics[0].artist}</span>
            </div>
          </div>
        </div>
        <div className="relative h-[--wave-height]">
          {/* Range slider for audio time and waveform */}
          {duration ? (
            <Slider.Root
              className="relative flex-1 flex items-center select-none touch-none w-full h-full"
              min={0}
              max={duration}
              step={1}
              value={[time]}
              onValueChange={handleSliderChange}
              onValueCommit={handleSliderCommit}
            >
              <div className="absolute inset-0">
                <WaveForm percentage={time / duration} src={musics[0].src} />
              </div>
              <Slider.Track>
                <Slider.Range />
                <Slider.Thumb />
              </Slider.Track>
            </Slider.Root>
          ) : null}
        </div>
        <div className="flex">
          <div>
            {mute ? (
              <Image
                src="/mute.svg"
                alt="Mute"
                width={24}
                height={24}
                onClick={toggleMute}
              />
            ) : (
              <Image
                src="/sound.svg"
                alt="Unmute"
                width={24}
                height={24}
                onClick={toggleMute}
              />
            )}
          </div>
        </div>
        <div>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-50 h-5"
            min={0}
            max={1}
            step={0.01}
            value={[volume]}
            onValueChange={[value]) => {
              if (!audioRef.current) {
                return;
              }
  
              setVolume(value);
              audioRef.current.volume = value;
            }}
          >
            <Slider.Track className="relative bg-neutral-200 flex-grow rounded-full h-1" />
            <Slider.Range className="absolute bg-white rounded-full h-1" />
            <Slider.Thumb className="block w-3 h-3 bg-primary rounded-full" />
          </Slider.Root>
        </div>
      </div>
    </>
      );
}
