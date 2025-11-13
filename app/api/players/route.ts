import { NextResponse } from "next/server";
import { db } from "@/app/database/connection";
import { players } from "@/app/database/schemas";
import { desc } from "drizzle-orm";
import { MySqlColumn } from "drizzle-orm/mysql-core";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const target = (url.searchParams.get("t") || "solo_mmr").trim();
    const limit = Math.min(Number(url.searchParams.get("limit") || 100), 1000);

    const allowedFieldsMap: Record<string, MySqlColumn> = {
      id: players.id,
      solo_mmr: players.solo_mmr,
      duo_mmr: players.duo_mmr,
      team_mmr: players.team_mmr,
      won_duels: players.won_duels,
      lost_duels: players.lost_duels,
    };

    const selectedField = allowedFieldsMap[target] || players.solo_mmr;

    const rows = await db
      .select()
      .from(players)
      .orderBy(desc(selectedField))
      .limit(limit);

    return NextResponse.json(rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
