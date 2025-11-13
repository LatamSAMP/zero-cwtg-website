import { headers } from "next/headers";
import TierTabs from "./TierTabs";
import PlayersTable from "./PlayersTable";
import RecentMatches from "./RecentMatches";

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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  mainColor: string;
};

const tiers = [
  { id: "1v1", name: "1v1" },
  { id: "2v2", name: "2v2" },
  { id: "3v3", name: "3v3" },
];

async function fetchPlayers(apiUrl: string): Promise<PlayerType[]> {
  "use cache";
  const res = await fetch(apiUrl);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

async function fetchMatches(matchesUrl: string): Promise<Match[]> {
  "use cache";
  const res = await fetch(matchesUrl);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function PageContent({ searchParams, mainColor }: Props) {
  const params = await searchParams;
  const tier = (typeof params.tier === "string" ? params.tier : "1v1").trim();

  const tierToFieldMap: Record<string, keyof PlayerType> = {
    "1v1": "solo_mmr",
    "2v2": "duo_mmr",
    "3v3": "team_mmr",
  };

  const field = tierToFieldMap[tier] ?? "solo_mmr";

  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  const apiUrl = `${baseUrl}/api/players?t=${encodeURIComponent(
    field
  )}&limit=6`;

  const players = await fetchPlayers(apiUrl);

  const matchesUrl = `${baseUrl}/api/matches?limit=6`;
  const matches = await fetchMatches(matchesUrl);

  return (
    <>
      <TierTabs tiers={tiers} mainColor={mainColor} currentTier={tier} />
      <PlayersTable players={players} field={field} />
      <RecentMatches matches={matches} />
    </>
  );
}
