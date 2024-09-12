import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import db, { sqlite } from "./index.server";

async function main() {
    try {
        migrate(db, { migrationsFolder: './migrations' })
        sqlite.close();
    } catch (error: any) {
        console.error('error migrate => ', error.message);
    }
}

main();