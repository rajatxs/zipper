# Zipper 🗃

Basic file archiving utility.

## Requirements

- [Node.js 18](https://nodejs.org/en/download)

## Installation

Install **Zipper** globally on your system.

```shell
npm i -g @rxpm/zipper
```

## Usage

Generate a ZIP archive with default options.

```shell
zipper
```

Exclude specific files or directories by using the `--exclude` or `-e` flag.

```shell
zipper --exclude node_modules build .env
```

Customize the output file name by using the `--outfile` or `-o` flag.

```shell
zipper --outfile node-app.zip
```

For more information or inquiries, please contact the project owner: Rajat (rajatxt@proton.me)
