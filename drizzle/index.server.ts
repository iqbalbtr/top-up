import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.server"

export const sqlite = new Database(useRuntimeConfig().databaseUrl);
const db = drizzle(sqlite, { logger: false, schema });

export default db