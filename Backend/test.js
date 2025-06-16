import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// For debugging: absolute path to .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("Looking for .env at:", path.join(__dirname, '.env'));

// Load .env
dotenv.config();

console.log("MONGODB_URI value is:", process.env.MONGODB_URI);
