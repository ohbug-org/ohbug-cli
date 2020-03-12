import chalk from 'chalk'
import prompts, { PromptObject } from 'prompts'
import { resolve } from 'path'
import { accessSync } from 'fs'
import { DEFAULT_URL } from '../lib/constants'
import { _import } from '../lib/utils'

async function _prompts() {
  console.log(
    chalk.bold.green(`Ohbug CLI v${require('../../package.json').version}`)
  )

  const { command } = await prompts({
    type: `select`,
    name: `command`,
    message: `Which command do you want to execute?`,
    choices: [
      {
        title: `uploadSourceMap`,
        description: `Upload the source map file to the server`,
        value: `uploadSourceMap`
      }
    ]
  })

  await switchCommand(command)
}

async function switchCommand(command: string) {
  switch (command) {
    case `uploadSourceMap`:
      const questions: PromptObject[] = [
        {
          type: `text`,
          name: `path`,
          message: `Your source map file path`,
          validate(value) {
            if (!value) return false

            const path = resolve(process.cwd(), value)
            let isAccess: boolean
            try {
              accessSync(path)
              isAccess = true
            } catch {
              isAccess = false
            }
            return isAccess
          },
          format(value) {
            const path = resolve(process.cwd(), value)
            return path
          }
        },
        {
          type: `text`,
          name: `apiKey`,
          message: `Your project API key (apiKey)`,
          validate(value) {
            if (!value) return false
            return true
          }
        },
        {
          type: `text`,
          name: `appVersion`,
          message: `The version number of your app (appVersion)`,
          validate(value) {
            if (!value) return false
            return true
          }
        },
        {
          type: `text`,
          name: `appType`,
          message: `The type of your app (appType)`
        },
        {
          type: `text`,
          name: `url`,
          message: `The url of the upload server (url)`,
          initial: DEFAULT_URL
        }
      ]
      return await prompts(questions, {
        onSubmit(_, __, answers) {
          if (Object.keys(answers).length === questions.length) {
            _import('../lib/uploadSourceMap')(answers)
          }
        }
      })
  }
}

export default _prompts
