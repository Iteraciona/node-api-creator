#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const projectName = args[0] || "my-node-api";

const targetPath = path.join(process.cwd(), projectName);
const templatePath = path.join(__dirname, "../template");

console.log(targetPath);
console.log(templatePath);

if (fs.existsSync(targetPath)) {
    console.error(`❌ The folder "${projectName}" already exists!.`);
    process.exit(1);
}

fs.mkdirSync(targetPath);
fs.cpSync(templatePath, targetPath, { recursive: true });

const envSamplePath = path.join(targetPath, '.env.example');
const envPath = path.join(targetPath, '.env');

if (fs.existsSync(envSamplePath)) {
    fs.copyFileSync(envSamplePath, envPath);
    console.log(`✅ Created: .env from .env.example`);
} else {
    console.warn(`⚠️ Warning: .env.example not found in template.`);
}

console.log(`✅ Project "${projectName}" successfully created in ${targetPath}`);

console.log("📦 Installing dependencies...");
execSync("npm install", { stdio: "inherit", cwd: targetPath });
execSync("npm install", { stdio: "inherit", cwd: targetPath });

console.log("🚀 ¡Done! Run the following commands to start:");
console.log(`\n  cd ${projectName}`);
console.log("  npm start\n");
