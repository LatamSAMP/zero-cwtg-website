"use client";

import PlayButton from "./PlayButton";

type Props = {
  mainColor: string;
  serverIp: string;
};

export default function HeaderNav({ mainColor, serverIp }: Props) {
  const baseLinkClass =
    "text-gray-300 hover:text-white transition-colors duration-200 font-medium text-sm uppercase tracking-wide";

  return (
    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
      <a href="#tables" className={baseLinkClass}>
        Rankings
      </a>

      <PlayButton mainColor={mainColor} serverIp={serverIp} />

      <a href="#matches" className={baseLinkClass}>
        Matches
      </a>
    </nav>
  );
}
