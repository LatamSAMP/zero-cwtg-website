import Link from "next/link";

type Tier = { id: string; name: string };

type Props = {
  tiers: Tier[];
  mainColor: string;
  currentTier: string;
};

function clamp(n: number, lo = 0, hi = 255) {
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

function adjustBrightness(hex: string, factor = 1) {
  try {
    const cleaned = hex.replace("#", "");
    const bigint = parseInt(cleaned, 16);
    const r = clamp(((bigint >> 16) & 255) * factor);
    const g = clamp(((bigint >> 8) & 255) * factor);
    const b = clamp((bigint & 255) * factor);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch {
    return hex;
  }
}

export default function TierTabs({ tiers, mainColor, currentTier }: Props) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-12">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {tiers.map((tier) => {
          const isActive = currentTier === tier.id;

          return (
            <Link
              key={tier.id}
              href={`/?tier=${tier.id}`}
              className={`
                px-6 py-2.5 sm:px-8 sm:py-3 
                min-w-32 sm:min-w-40 md:min-w-48
                rounded-lg font-semibold text-sm sm:text-base
                transition-all duration-200 
                flex items-center justify-center
                ${
                  isActive
                    ? "text-white shadow-lg"
                    : "bg-gray-900/80 border border-gray-700/60 text-gray-300 hover:border-gray-600 hover:bg-gray-800/80"
                }
              `}
              style={
                isActive
                  ? {
                      backgroundImage: `linear-gradient(135deg, ${mainColor}, ${adjustBrightness(
                        mainColor,
                        0.7
                      )})`,
                      boxShadow: `0 4px 20px ${mainColor}40, 0 0 40px ${mainColor}20`,
                    }
                  : undefined
              }
            >
              {tier.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
