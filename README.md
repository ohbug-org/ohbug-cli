<div align="center">
  <h1>ohbug-cli</h1>
  <p>A Node.js module to programmatically upload your sourceMap files to Ohbug or other service.</p>

  [![build](https://img.shields.io/github/workflow/status/ohbug-org/ohbug-cli/Node.js%20CI/master?style=flat-square)](https://github.com/ohbug-org/ohbug-cli/actions?query=workflow%3A%22Node.js+CI%22)
  [![npm](https://img.shields.io/npm/v/@ohbug/cli.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/cli)
  [![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/cli?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/cli)
  [![codecov](https://img.shields.io/codecov/c/github/ohbug-org/ohbug-cli.svg?style=flat-square)](https://codecov.io/gh/ohbug-org/ohbug-cli)
  [![license](https://img.shields.io/github/license/ohbug-org/ohbug-cli?style=flat-square)](https://github.com/ohbug-org/ohbug-cli/blob/master/LICENSE)
  [![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
</div>

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
  -u, --url <url>              The url of the upload server [optional] (default: "http://ohbug.io/api/v1/sourceMap/upload")
  -h, --help                   output usage information
```