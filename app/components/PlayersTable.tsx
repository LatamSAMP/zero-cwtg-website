interface PlayerType {
  id: number;
  name: string;
  won_duels: number;
  lost_duels: number;
  solo_mmr: number;
  solo_streak: number;
  solo_won_matches: number;
  solo_lost_matches: number;
  duo_mmr: number;
  duo_streak: number;
  duo_won_matches: number;
  duo_lost_matches: number;
  team_mmr: number;
  team_streak: number;
  team_won_matches: number;
  team_lost_matches: number;
}

type Props = {
  players: PlayerType[];
  field: keyof PlayerType;
};

export default function PlayersTable({ players, field }: Props) {
  const getInitial = (name: string) => {
    if (!name || name.length === 0) return "?";
    const firstChar = name.charAt(0).toUpperCase();
    return /[A-Z]/i.test(firstChar) ? firstChar : "?";
  };

  return (
    <div id="tables" className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="hidden md:block bg-gray-900/50 border border-gray-800/60 rounded-t-xl">
        <div className="grid grid-cols-[60px_1fr_100px_100px_100px_100px_120px_100px] gap-4 px-6 py-4 text-sm font-semibold text-gray-400">
          <div className="text-center">#</div>
          <div>Player</div>
          <div className="text-center">MMR</div>
          <div className="text-center">Matches</div>
          <div className="text-center">Wins</div>
          <div className="text-center">Losses</div>
          <div className="text-center">Winrate</div>
          <div className="text-center">Streak</div>
        </div>
      </div>

      <div className="bg-gray-900/30 border border-gray-800/40 md:border-x md:border-b md:rounded-b-xl rounded-xl md:rounded-t-none">
        {(!players || players.length === 0) && (
          <div className="p-8 text-center text-gray-400">No players found.</div>
        )}

        {players.map((player, index) => {
          const value = player[field as keyof PlayerType];
          const mmr = typeof value === "number" ? value : 0;

          let wins = 0;
          let losses = 0;
          let streak = 0;

          if (field === "solo_mmr") {
            wins = player.solo_won_matches;
            losses = player.solo_lost_matches;
            streak = player.solo_streak;
          } else if (field === "duo_mmr") {
            wins = player.duo_won_matches;
            losses = player.duo_lost_matches;
            streak = player.duo_streak;
          } else if (field === "team_mmr") {
            wins = player.team_won_matches;
            losses = player.team_lost_matches;
            streak = player.team_streak;
          }

          const totalGames = wins + losses;
          const winrate =
            totalGames > 0 ? ((wins / totalGames) * 100).toFixed(1) : "0.0";
          const streakSign = streak > 0 ? "+" : "";

          return (
            <div key={player.id}>
              <div className="hidden md:grid grid-cols-[60px_1fr_100px_100px_100px_100px_120px_100px] gap-4 px-6 py-4 border-b border-gray-800/40 last:border-b-0 hover:bg-gray-800/20 transition-colors duration-150">
                <div className="flex items-center justify-center">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-bold">
                    {index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gray-700/50 shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                    {getInitial(player.name)}
                  </div>
                  <a
                    href={`/profile/${player.id}`}
                    className="text-sm font-medium text-gray-100 hover:text-indigo-300 transition-colors duration-200 truncate"
                  >
                    {player.name}
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-100">
                    {mmr}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-300">{totalGames}</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-300">{wins}</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-sm text-gray-300">{losses}</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-semibold">
                    {winrate}%
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span
                    className={`text-sm font-semibold ${
                      streak > 0
                        ? "text-green-400"
                        : streak < 0
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {streakSign}
                    {streak}
                  </span>
                </div>
              </div>

              <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-800/40 last:border-b-0 hover:bg-gray-800/20 transition-colors duration-150">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-bold shrink-0">
                  {index + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-700/50 shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                  {getInitial(player.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-100 truncate mb-1">
                    {player.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-semibold text-gray-100">{mmr}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-green-400">{winrate}%</span>
                    <span className="text-gray-600">•</span>
                    <span
                      className={
                        streak > 0
                          ? "text-green-400"
                          : streak < 0
                          ? "text-red-400"
                          : "text-gray-700"
                      }
                    >
                      {streakSign}
                      {streak}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
