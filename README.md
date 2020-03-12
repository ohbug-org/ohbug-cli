# ohbug-cli

A Node.js module to programmatically upload your sourceMap files to Ohbug or other service.

English | [简体中文](./README-zh_CN.md)

## Installation

```
npm install @ohbug/cli -g
```
or
```
yarn global add @ohbug/cli
```

## Quick Overview

```
ohbug
```

Follow the prompts to select and enter information.

![uploadSourceMap](./description.svg)

## Commands

### ohbug uploadSourceMap

#### example

```
ohbug uploadSourceMap YOUR_SOURCE_MAP_FILE_PATH \
  --api-key YOUR_API_KEY \
  --app-version YOUR_APP_VERSION \
  --app-type YOUR_APP_TYPE
```

#### options

The `ohbug uploadSourceMap` command has a number of options and you can explore them all by running:
```
ohbug uploadSourceMap --help
```

```
Usage: ohbug uploadSourceMap [options] <path>

Upload the source map file to the server, you can upload the file by passing in the file path. Or enter the folder path, the source map files in the folder will be uploaded automatically.

Options:
  -k, --api-key <key>          Your project API key [required]
  -v, --app-version <version>  The version number of your app [required]
  -t, --app-type <type>        The type of your app [optional]
  -u, --url <url>              The url of the upload server [optional] (default: "http://api.ohbug.io/v1/sourceMap/upload")
  -h, --help                   output usage information
```