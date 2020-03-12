import http from 'http'
import { PathLike, createReadStream } from 'fs'
import { parse as parseUrl } from 'url'
import FormData from 'form-data'
import ora from 'ora'
import chalk from 'chalk'
import { TIMEOUT, LOG_PREFIX } from './constants'

export interface Request {
  /**
   * The url of the upload server
   */
  url: string
  /**
   * The path of the source map file (local)
   */
  file: PathLike
  /**
   * The other parameters
   */
  data?: any
}

const request = ({ url, file, data }: Request) => {
  if (!url) throw new Error(`${LOG_PREFIX} No url matches!`)
  if (!file) throw new Error(`${LOG_PREFIX} No ".map" file matches!`)

  const spinner = ora(
    `${chalk.cyan('Upload:')} ${chalk.underline(file)}`
  ).start()

  const formData = new FormData()
  formData.append('file', createReadStream(file))
  Object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })

  const parsedUrl = parseUrl(url)

  const request = http.request(
    {
      method: 'POST',
      hostname: parsedUrl.hostname,
      path: parsedUrl.path || '/',
      port: parsedUrl.port,
      headers: formData.getHeaders(),
      timeout: TIMEOUT
    },
    res => {
      if (res.statusCode) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          return handleSuccess()
        } else {
          const err = new Error(
            `${LOG_PREFIX} HTTP status ${
              res.statusCode
            } received from uploadSourceMap API`
          )
          return handleError(err)
        }
      }

      throw new Error(`${LOG_PREFIX} Invalid payload sent to upload API`)
    }
  )

  formData.pipe(request)

  request.on('error', handleError)

  function handleSuccess() {
    spinner.succeed()
  }
  function handleError(error: Error) {
    spinner.fail()
    console.error(error)
    process.exit(1)
  }
}

export default request
