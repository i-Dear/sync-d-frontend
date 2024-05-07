"use client";

import dynamic from "next/dynamic";
import {
  CSSProperties,
  PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import WaveSurfer from "wavesurfer.js";

const WavesurferPlayer = dynamic(() => import("@wavesurfer/react"), {
  ssr: false,
  loading: () => (
    <div className="text-waveform-gray flex h-[20px] w-full items-center justify-center text-xl">
      Loading...
    </div>
  ),
});

type WaveFormProps = {
  percentage: number;
  src: string;
};

export function WaveForm({ percentage, src }: WaveFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [hoverOffset, setHoverOffset] = useState(0);

  useEffect(() => {
    if (!wavesurferRef.current) {
      return;
    }

    wavesurferRef.current.seekTo(percentage);
  }, [percentage]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) {
        return;
      }

      const left = containerRef.current.getBoundingClientRect().left;
      setHoverOffset(event.clientX - left);
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      className="group relative isolate h-[20px] w-full overflow-hidden [--hover-percentage:0%]"
      style={{ "--hover-amount": `${hoverOffset}px` } as CSSProperties}
      onPointerMove={handlePointerMove}
    >
      <WavesurferPlayer
        waveColor="#A8A8A8"
        progressColor="#369EFF"
        height={20}
        barWidth={1}
        barGap={1}
        barRadius={1}
        url={src}
        backend="WebAudio"
        onReady={(ws) => (wavesurferRef.current = ws)}
      />
      <div className="pointer-events-none absolute inset-0 z-10 h-full translate-x-[calc(-100%+var(--hover-amount))] bg-neutral-50/30 opacity-0 transition-opacity duration-150 ease-out lg:group-hover:opacity-100" />
    </div>
  );
}
