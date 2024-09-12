import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: './drizzle/schema.server.ts',
    out: './drizzle/migrations',
    dialect: "sqlite",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
})