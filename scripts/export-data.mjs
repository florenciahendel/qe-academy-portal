import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { users } from "../frontend/src/data/users.js";
import { courses } from "../frontend/src/data/courses.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const backendDataDir = path.join(rootDir, "backend", "data");

mkdirSync(backendDataDir, {
  recursive: true,
});

writeFileSync(
  path.join(backendDataDir, "users.json"),
  JSON.stringify(users, null, 2),
  "utf-8"
);

writeFileSync(
  path.join(backendDataDir, "courses.json"),
  JSON.stringify(courses, null, 2),
  "utf-8"
);

console.log(`Exported ${users.length} users.`);
console.log(`Exported ${courses.length} courses.`);
console.log("Backend JSON data files created successfully.");