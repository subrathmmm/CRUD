import pg from "pg";
import env from "dotenv";
env.config();

const requiredEnvVars = [
  "PG_USER",
  "PG_HOST",
  "PG_DATABASE",
  "PG_PASSWORD",
  "PG_PORT",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.log(`missing required env variable: ${varName}`);
    process.exit(1);
  }
});

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log("✅ Connected with the database"))
  .catch((err) => {
    console.log("❌ Couldn't connect with database", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.log("❌ Database error:", err);
  process.exit(1);
});

// initialize role type + table (so your code does not break)
async function initializeTables() {
  try {
    // create ENUM
    await db.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_type') THEN
          CREATE TYPE role_type AS ENUM ('Manager', 'Developer', 'HR', 'Sales', 'Intern');
        END IF;
      END
      $$;
    `);
    console.log("✅ role_type created or already exists");

    // create TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS employee_details (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        age SMALLINT NOT NULL CHECK(age > 17),
        role role_type NOT NULL DEFAULT 'Intern',
        salary DECIMAL(8,2) NOT NULL
      );
    `);
    console.log("✅ employee_details created or already exists");
  } catch (error) {
    console.log("❌ Error initializing tables: ", error);
    process.exit(1);
  }
}

initializeTables();

export const query = (text, params) => db.query(text, params);



