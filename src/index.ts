#!/usr/bin/env bun

import * as fs from "fs";

const ignore = process.argv.slice(2);

interface LanguageFiles {
    [fileName: string]: Record<string, any>;
}

const langDir = "./lang";
if (!fs.existsSync(langDir)) {
    console.error("The directory ./lang does not exist!");
    process.exit(1);
}

const files = fs
    .readdirSync(langDir)
    .filter(file => file.endsWith(".json"))
    .filter(file =>
        !ignore.includes(file) && !ignore.includes(file.replace(".json", "")
        ));

if (files.length === 0) {
    console.error("No .json files found in the directory ./lang");
    process.exit(1);
}

console.log(`Found files: ${files.join(", ")}`);

const languageData: LanguageFiles = {};
const allKeys = new Set<string>();

for (const file of files) {
    const filePath = `${langDir}/${file}`;
    try {
        const content = await JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<string, any>;
        languageData[file] = content;

        Object.keys(content).forEach(key => allKeys.add(key));

        console.log(`Read ${file}: ${Object.keys(content).length} keys`);
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
    }
}

if (Object.keys(languageData).length === 0) {
    console.error("No JSON files were successfully read");
    process.exit(1);
}

console.log(`\nTotal unique keys: ${allKeys.size}`);
console.log("All keys:", Array.from(allKeys).sort().join(", "));

console.log("\nMissing keys in individual files:");

const sortedKeys = Array.from(allKeys).sort();

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

console.log("\nSummary:");
console.log(`Files: ${Object.keys(languageData).length}`);
console.log(`Unique keys: ${allKeys.size}`);

for (const [fileName, data] of Object.entries(languageData)) {
    const coverage = (Object.keys(data).length / allKeys.size * 100).toFixed(1);
    console.log(`${fileName}: ${Object.keys(data).length}/${allKeys.size} keys (${coverage}%)`);
}
