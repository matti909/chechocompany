import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";
import { join } from "path";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

const MIGRATIONS = [
  "src/db/migrations/0000_heavy_vulture.sql",
  "src/db/migrations/0001_lonely_corsair.sql",
  "src/db/migrations/0002_mercadopago_fields.sql",
];

async function main() {
  for (const migrationFile of MIGRATIONS) {
    console.log(`\n--- ${migrationFile} ---`);

    const migrationSQL = readFileSync(join(process.cwd(), migrationFile), "utf-8");

    const statements = migrationSQL
      .split("--> statement-breakpoint")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const statement of statements) {
      console.log(`Executing: ${statement.slice(0, 70)}...`);
      try {
        await sql.query(statement);
      } catch (e: unknown) {
        const err = e as { code?: string };
        if (err.code === "42P07" || err.code === "42701" || err.code === "42710") {
          // 42P07 = relation already exists, 42701 = column already exists, 42710 = constraint already exists
          console.log("  → already exists, skipping.");
        } else {
          throw e;
        }
      }
    }
  }

  console.log("\nAll migrations complete!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
