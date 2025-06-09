import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("Initializing database connection...");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },

  // Pool configuration
  max: 20, // Maximum number of connections in the pool
  min: 4, // Minimum number of connections in the pool
  idleTimeoutMillis: 30000, // How long a connection can be idle before being removed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Successfully connected to the database");
  release();
});

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

// Log when a client is acquired from the pool
pool.on("acquire", (client) => {
  console.log("Client acquired from pool");
});

// Log when a client is released back to the pool
pool.on("release", (client) => {
  console.log("Client released back to pool");
});

console.log("Database configuration completed");

export default pool;
