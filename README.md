# lang-diff

A command-line tool to compare JSON language files and identify missing keys across different language files. Useful for ensuring your localization files have consistent key coverage.

## Features

- Compares multiple JSON language files
- Identifies missing keys in each language file
- Provides coverage statistics
- Supports filtering specific files to ignore
- Optional extra summary output

## Installation

This tool requires [Bun](https://bun.sh/) to run.

```bash
bun add -g github:wxn0brP/lang-diff
```
or
```bash
imgr lang-diff
```

## Usage

```bash
# Compare all JSON files in the current directory
lang-diff

# Compare JSON files in a specific directory
lang-diff -l /path/to/your/lang/files

# Compare with extra summary output
lang-diff -e

# Ignore specific files during comparison
lang-diff en fr
```

### Command Line Options

- `-l, --langDir`: Path to the directory containing language JSON files (default: current directory)
- `-e, --extraSummary`: Show extra summary with all keys sorted alphabetically
- Positional arguments: Language files to ignore during comparison

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