"use client";

import { useState } from "react";

type Props = {
  mainColor: string;
  serverIp: string;
};

export default function PlayButton({ mainColor, serverIp }: Props) {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    window.location.href = `samp://${serverIp}`;
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-8 py-2.5 border-2 rounded-lg font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-lg"
      style={{
        borderColor: mainColor,
        backgroundColor: hovered ? mainColor : "transparent",
        color: "#fff",
      }}
      aria-label="Play"
    >
      <span className="relative flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
        PLAY
      </span>
    </button>
  );
}
