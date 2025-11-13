interface Team {
  id: number;
  match_id: number;
  team_id: number;
  name: string;
  score: number;
  damage: number;
  injuries: number;
  color: string;
}

interface MatchPlayer {
  id: number;
  match_id: number;
  player_id: number;
  team_id: number;
  kills: number;
  deaths: number;
  damage: number;
  injuries: number;
  team_damage: number;
  team_kills: number;
  player_name: string | null;
}

interface Match {
  id: number;
  winner_id: number;
  loser_id: number;
  max_score: number;
  mode: string;
  status: string;
  map: string;
  mmr_change: number;
  is_cw: number;
  started_at: string;
  ended_at: string | null;
  teams: Team[];
  players: MatchPlayer[];
}

type Props = {
  matches: Match[];
};

export default function RecentMatches({ matches }: Props) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "In progress";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${day} ${month} • ${time}`;
  };

  const normalizeColor = (color: string) => {
    return color.startsWith("#") ? color : `#${color}`;
  };

  const getInitial = (name: string | null) => {
    if (!name || name.length === 0) return "?";
    const firstChar = name.charAt(0).toUpperCase();
    return /[A-Z]/i.test(firstChar) ? firstChar : "?";
  };

  return (
    <div
      id="matches"
      className="w-full max-w-7xl mx-auto mt-8 sm:mt-12 mb-12 px-2 sm:px-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4 sm:mb-6">
        Recent Matches
      </h2>

      <div className="space-y-2 sm:space-y-3">
        {(!matches || matches.length === 0) && (
          <div className="p-8 text-center text-gray-400 bg-gray-900/30 rounded-xl border border-gray-800/40">
            No recent matches.
          </div>
        )}

        {matches.map((match) => {
          const winnerTeam = match.teams.find(
            (t) => t.team_id === match.winner_id
          );
          const loserTeam = match.teams.find(
            (t) => t.team_id === match.loser_id
          );

          const winnerPlayers = match.players.filter(
            (p) => p.team_id === match.winner_id
          );
          const loserPlayers = match.players.filter(
            (p) => p.team_id === match.loser_id
          );

          if (match.players.length === 0) {
            return null;
          }

          return (
            <div
              key={match.id}
              className="bg-gray-900/50 border border-gray-800/60 rounded-lg overflow-hidden hover:border-gray-700/60 transition-colors duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-3 sm:px-4 py-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="shrink-0">
                    <div className="text-xs sm:text-sm font-semibold text-gray-100">
                      #{match.id}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-gray-500">
                      {formatDate(match.ended_at)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        match.mode === "Solo"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : match.mode === "Duo"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-green-500/20 text-green-400 border border-green-500/30"
                      }`}
                    >
                      {match.mode}
                    </span>

                    {match.is_cw === 1 && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase rounded border border-yellow-500/30">
                        CW
                      </span>
                    )}

                    <span className="px-2 py-0.5 bg-gray-800/60 text-gray-400 text-[10px] font-medium rounded border border-gray-700/40">
                      {match.map}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 overflow-x-auto">
                  {winnerPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-1.5 sm:gap-2 shrink-0"
                    >
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xs sm:text-sm font-bold"
                        style={{
                          backgroundColor: normalizeColor(
                            winnerTeam?.color || "00FF00"
                          ),
                        }}
                      >
                        {getInitial(player.player_name)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-100 truncate max-w-20 sm:max-w-none">
                          {player.player_name || "Unknown"}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-green-400 font-semibold">
                          +{match.mmr_change || 13}.3
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">
                          <span className="text-green-400">{player.kills}</span>
                          /<span className="text-red-400">{player.deaths}</span>
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-gray-500">
                          {player.damage.toLocaleString()} DMG
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-10 sm:h-12 w-px bg-gray-700/50 shrink-0" />

                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  {loserPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center gap-1.5 sm:gap-2 shrink-0"
                    >
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xs sm:text-sm font-bold"
                        style={{
                          backgroundColor: normalizeColor(
                            loserTeam?.color || "FF0000"
                          ),
                        }}
                      >
                        {getInitial(player.player_name)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-gray-100 truncate max-w-20 sm:max-w-none">
                          {player.player_name || "Unknown"}
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-red-400 font-semibold">
                          -{match.mmr_change || 10}.7
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-gray-500 mt-0.5">
                          <span className="text-green-400">{player.kills}</span>
                          /<span className="text-red-400">{player.deaths}</span>
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-gray-500">
                          {player.damage.toLocaleString()} DMG
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
