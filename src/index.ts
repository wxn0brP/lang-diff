#!/usr/bin/env bun

import * as fs from "fs";
import { parseArgs } from "node:util";

interface LanguageFiles {
    [fileName: string]: Record<string, any>;
}

const { values, positionals: ignore } = parseArgs({
    options: {
        langDir: { type: "string", short: "l", default: "." },
        extraSummary: { type: "boolean", short: "e", default: false },
    },
    allowPositionals: true,
});

const config = {
    langDir: values.langDir,
    extraSummary: values.extraSummary
}

if (!config.langDir.endsWith("/")) config.langDir += "/";

// -- SETUP --
if (!fs.existsSync(config.langDir)) {
    console.error(`The directory "${config.langDir}" does not exist!`);
    process.exit(1);
}

const files = fs
    .readdirSync(config.langDir)
    .filter(file => file.endsWith(".json"))
    .filter(file => {
        if (ignore.includes(file)) return false;
        if (ignore.includes(file.replace(".json", ""))) return false;
        return true;
    });

if (files.length === 0) {
    console.error(`No .json files found in the directory "${config.langDir}"`);
    process.exit(1);
}

const languageData: LanguageFiles = {};
const allKeys = new Set<string>();

// -- READ FILES --
for (const file of files) {
    const filePath = `${config.langDir}/${file}`;
    try {
        const content = await JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<string, any>;
        languageData[file] = content;

        Object.keys(content).forEach(key => allKeys.add(key));
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
    }
}

if (Object.keys(languageData).length === 0) {
    console.error("No JSON files were successfully read");
    process.exit(1);
}

if (config.extraSummary) {
    console.log("\n💜 Extra Summary:");
    console.log("All keys:", "\n- " + Array.from(allKeys).sort().join("\n- "));
}

console.log("💜 Missing keys in individual files:");

const sortedKeys = Array.from(allKeys).sort();

// -- CHECK FOR MISSING KEYS --
for (const [fileName, data] of Object.entries(languageData)) {
    const fileKeys = new Set(Object.keys(data));
    const missingKeys = sortedKeys.filter(key => !fileKeys.has(key));

    if (missingKeys.length > 0) {
        console.log(`\n${fileName}:`);
        console.log(`  Missing ${missingKeys.length} keys:`);
        missingKeys.forEach(key => console.log(`  - ${key}`));
    } else {
        console.log(`\n${fileName}: All keys present!`);
    }
}

// -- SUMMARY --
console.log("\n💜 Summary:");
console.log(`Files: ${Object.keys(languageData).length}`);
console.log(`Total unique keys: ${allKeys.size}`);
console.log(`Unique keys: ${allKeys.size}`);

console.log("\n💜 Coverage:");
for (const [fileName, data] of Object.entries(languageData)) {
    const coverage = (Object.keys(data).length / allKeys.size * 100).toFixed(1);
    console.log(`${fileName}: ${Object.keys(data).length}/${allKeys.size} keys (${coverage}%)`);
}
