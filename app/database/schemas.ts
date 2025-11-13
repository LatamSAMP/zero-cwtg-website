import { mysqlTable, int, varchar, datetime } from "drizzle-orm/mysql-core";

export const players = mysqlTable("players", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  won_duels: int("won_duels").default(0),
  lost_duels: int("lost_duels").default(0),
  solo_mmr: int("solo_mmr").default(500),
  solo_streak: int("solo_streak").default(0),
  solo_won_matches: int("solo_won_matches").default(0),
  solo_lost_matches: int("solo_lost_matches").default(0),
  duo_mmr: int("duo_mmr").default(500),
  duo_streak: int("duo_streak").default(0),
  duo_won_matches: int("duo_won_matches").default(0),
  duo_lost_matches: int("duo_lost_matches").default(0),
  team_mmr: int("team_mmr").default(500),
  team_streak: int("team_streak").default(0),
  team_won_matches: int("team_won_matches").default(0),
  team_lost_matches: int("team_lost_matches").default(0),
});

export const matchs = mysqlTable("matchs", {
  id: int("id").primaryKey().autoincrement(),
  winner_id: int("winner_id").notNull(),
  loser_id: int("loser_id").notNull(),
  max_score: int("max_score").notNull(),
  mode: varchar("mode", { length: 16 }).notNull(),
  status: varchar("status", { length: 16 }).notNull().default("in_progress"),
  map: varchar("map", { length: 64 }).notNull(),
  mmr_change: int("mmr_change").notNull().default(0),
  is_cw: int("is_cw").notNull().default(0),
  started_at: datetime("started_at").notNull(),
  ended_at: datetime("ended_at"),
});

export const match_players = mysqlTable("match_players", {
  id: int("id").primaryKey().autoincrement(),
  match_id: int("match_id").notNull(),
  player_id: int("player_id").notNull(),
  team_id: int("team_id").notNull(),
  kills: int("kills").notNull().default(0),
  deaths: int("deaths").notNull().default(0),
  damage: int("damage").notNull().default(0),
  injuries: int("injuries").notNull().default(0),
  team_damage: int("team_damage").notNull().default(0),
  team_kills: int("team_kills").notNull().default(0),
});

export const match_teams = mysqlTable("match_teams", {
  id: int("id").primaryKey().autoincrement(),
  match_id: int("match_id").notNull(),
  team_id: int("team_id").notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  score: int("score").notNull().default(0),
  damage: int("damage").notNull().default(0),
  injuries: int("injuries").notNull().default(0),
  color: varchar("color", { length: 16 }).notNull(),
});
