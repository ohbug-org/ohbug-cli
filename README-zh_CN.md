<div align="center">
  <h1>ohbug-cli</h1>
  <p>一键上传您的 sourceMap 文件到 Ohbug 或其他服务。 </p>

  [![build](https://img.shields.io/github/workflow/status/ohbug-org/ohbug-cli/Node.js%20CI/master?style=flat-square)](https://github.com/ohbug-org/ohbug-cli/actions?query=workflow%3A%22Node.js+CI%22)
  [![npm](https://img.shields.io/npm/v/@ohbug/cli.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/cli)
  [![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/cli?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/cli)
  [![codecov](https://img.shields.io/codecov/c/github/ohbug-org/ohbug-cli.svg?style=flat-square)](https://codecov.io/gh/ohbug-org/ohbug-cli)
  [![license](https://img.shields.io/github/license/ohbug-org/ohbug-cli?style=flat-square)](https://github.com/ohbug-org/ohbug-cli/blob/master/LICENSE)
  [![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
</div>

[English](./README.md) | 简体中文

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

按照提示选择并输入信息。 

![uploadSourceMap](./description.svg)

## Commands

### ohbug uploadSourceMap

#### 例子

```
ohbug uploadSourceMap YOUR_SOURCE_MAP_FILE_PATH \
  --api-key YOUR_API_KEY \
  --app-version YOUR_APP_VERSION \
  --app-type YOUR_APP_TYPE
```

#### 选项

`ohbug uploadSourceMap` 命令具有许多选项，您可以通过运行以下命令进行探索：
```
ohbug uploadSourceMap --help
```

```
Usage: ohbug uploadSourceMap [options] <path>

将 sourceMap 文件上传到服务器，您可以直接通过输入单个文件路径来上传文件。或输入文件夹路径，文件夹中的源地图文件将自动上传。 

Options:
  -k, --api-key <key>          您的项目 API key [必选]
  -v, --app-version <version>  您的应用的版本号 [必选]
  -t, --app-type <type>        您的应用类型 [可选的]
  -u, --url <url>              上传服务器的 URL [可选的] (默认为: "http://api.ohbug.io/v1/sourceMap/upload")
  -h, --help                   输出帮助信息
```