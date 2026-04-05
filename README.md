# lang-diff

A command-line tool to compare language files and identify missing keys across different language files. Supports multiple formats including JSON, JSON5, JSONC, TOML, YAML, and YML.

## Features

- Compares multiple language files
- Identifies missing keys in each language file
- Provides coverage statistics
- Supports filtering specific files to ignore
- Optional extra summary output
- Pluggable parser system for different file formats

## Installation

This tool requires [Bun](https://bun.sh/) to run.

```bash
bunx @wxn0brp/ing@latest i lang-diff
```

or

```bash
bun add -g github:wxn0brP/lang-diff
```

or

```bash
ingr lang-diff
```

## Usage

```bash
# Compare all supported files in the current directory
lang-diff

# Compare files in a specific directory
lang-diff -l /path/to/your/lang/files

# Compare with extra summary output
lang-diff -e

# Use a specific parser (json, json5, jsonc, toml, yaml, yml)
lang-diff -p yaml

# Specify a custom file extension
lang-diff -x lang

# Ignore specific files during comparison
lang-diff en fr
```

### Command Line Options

- `-l, --langDir`: Path to the directory containing language files (default: current directory)
- `-e, --extraSummary`: Show extra summary with all keys sorted alphabetically
- `-p, --parser`: Parser to use for reading files (json, json5, jsonc, toml, yaml, yml, or path to custom parser) (default: json)
- `-x, --ext`: File extension to scan for (defaults to parser's extension)
- Positional arguments: Language files to ignore during comparison

## Custom Parsers

You can provide a custom parser by specifying a path to a TypeScript file that exports:
- `ext`: The default file extension for this parser
- `default`: A function that parses file content and returns an object

```bash
# loads ./my-custom-parser.ts
lang-diff -p my-custom-parser
```

## Example Output

```
💜 Missing keys in individual files:

en.json: All keys present!

es.json:
  Missing 2 keys:
  - welcome_message
  - goodbye_message

de.json:
  Missing 1 keys:
  - goodbye_message

💜 Summary:
Files: 3
Total unique keys: 5
Unique keys: 5

💜 Coverage:
en.json: 5/5 keys (100.0%)
es.json: 3/5 keys (60.0%)
de.json: 4/5 keys (80.0%)
```

## License

MIT
