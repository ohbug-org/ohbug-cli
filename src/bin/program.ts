import commander, { Command } from 'commander'
import chalk from 'chalk'
import { DEFAULT_URL } from '../lib/constants'
import { _import, _getOptions } from '../lib/utils'
import { UploadSourceMapOptions } from '../lib/uploadSourceMap'

function _program() {
  const program = new commander.Command()

  program
    .command(`uploadSourceMap <path>`)
    .description(
      `Upload the source map file to the server, you can upload the file by passing in the file path. Or enter the folder path, the source map files in the folder will be uploaded automatically.`
    )
    .requiredOption(`-k, --api-key <key>`, `Your project API key`)
    .requiredOption(
      `-v, --app-version <version>`,
      `The version number of your app`
    )
    .option(`-t, --app-type <type>`, `The type of your app`)
    .option(`-u, --url <url>`, `The url of the upload server`, DEFAULT_URL)
    .action((path: string, cmd: Command) => {
      const options = {
        path,
        ..._getOptions<UploadSourceMapOptions>(cmd)
      }
      _import('../lib/uploadSourceMap')(options)
    })

  // output help information on unknown commands
  program.arguments('<command>').action(cmd => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

  program.version(require('../../package.json').version)

  program.parse(process.argv)
}

export default _program
