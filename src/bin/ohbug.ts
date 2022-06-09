#!/usr/bin/env node

import { resolve } from 'path'
import { accessSync, readFileSync } from 'fs'
import chalk from 'chalk'
import type { PromptObject } from 'prompts'
import prompts from 'prompts'
import { DEFAULT_ENDPOINT } from '../lib/constants'
import uploadSourceMap from '../lib/uploadSourceMap'

type keys = 'path' | 'apiKey'| 'appVersion'| 'appType'| 'endpoint'
async function switchCommand(command: string) {
  if (command === 'uploadSourceMap') {
    const questions: PromptObject<keys>[] = [
      {
        type: 'text',
        name: 'path',
        message: 'Your source map file path',
        validate(value) {
          if (!value) return false

          const path = resolve(process.cwd(), value)
          let isAccess: boolean
          try {
            accessSync(path)
            isAccess = true
          }
          catch {
            isAccess = false
          }
          return isAccess
        },
        format(value) {
          const path = resolve(process.cwd(), value)
          return path
        },
      },
      {
        type: 'text',
        name: 'apiKey',
        message: 'Your project API key (apiKey)',
        validate(value) {
          if (!value) return false
          return true
        },
      },
      {
        type: 'text',
        name: 'appVersion',
        message: 'The version number of your app (appVersion)',
        validate(value) {
          if (!value) return false
          return true
        },
      },
      {
        type: 'text',
        name: 'appType',
        message: 'The type of your app (appType)',
      },
      {
        type: 'text',
        name: 'endpoint',
        message: 'The url of the upload server (endpoint)',
        initial: DEFAULT_ENDPOINT,
      },
    ]
    const answers = await prompts<keys>(questions)
    if (Object.keys(answers).length === questions.length)
      uploadSourceMap(answers)
  }
  return null
}

async function prompt() {
  const pkg = readFileSync(resolve(__dirname, '../../package.json'), { encoding: 'utf-8' })
  // eslint-disable-next-line no-console
  console.log(chalk.bold.green(`Ohbug CLI v${JSON.parse(pkg).version}`))

  const { command } = await prompts({
    type: 'select',
    name: 'command',
    message: 'Which command do you want to execute?',
    choices: [
      {
        title: 'uploadSourceMap',
        description: 'Upload the source map file to the server',
        value: 'uploadSourceMap',
      },
    ],
  })

  await switchCommand(command)
}

prompt()
