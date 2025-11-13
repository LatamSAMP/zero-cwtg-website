import { NextResponse } from "next/server";
import { db } from "@/app/database/connection";
import {
  matchs,
  match_teams,
  match_players,
  players,
} from "@/app/database/schemas";
import { desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Math.min(Number(url.searchParams.get("limit") || 5), 50);

    const recentMatches = await db
      .select()
      .from(matchs)
      .orderBy(desc(matchs.id))
      .limit(limit);

    const matchesWithDetails = await Promise.all(
      recentMatches.map(async (match) => {
        const teams = await db
          .select()
          .from(match_teams)
          .where(eq(match_teams.match_id, match.id));

        const matchPlayers = await db
          .select({
            id: match_players.id,
            match_id: match_players.match_id,
            player_id: match_players.player_id,
            team_id: match_players.team_id,
            kills: match_players.kills,
            deaths: match_players.deaths,
            damage: match_players.damage,
            injuries: match_players.injuries,
            team_damage: match_players.team_damage,
            team_kills: match_players.team_kills,
            player_name: players.name,
          })
          .from(match_players)
          .leftJoin(players, eq(match_players.player_id, players.id))
          .where(eq(match_players.match_id, match.id));

        return {
          ...match,
          teams,
          players: matchPlayers,
        };
      })
    );

    return NextResponse.json(matchesWithDetails);
  } catch (err) {
    console.error("Error fetching matches:", err);
    return NextResponse.json(
      { error: "internal_error", message: String(err) },
      { status: 500 }
    );
  }
}
