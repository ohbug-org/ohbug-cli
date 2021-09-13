import http, { IncomingMessage } from 'http'
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

const request = ({ url, file, data }: Request): Promise<IncomingMessage> =>
  new Promise((resolve, reject) => {
    if (!url) return reject(new Error(`${LOG_PREFIX} No url matches!`))
    if (!file) return reject(new Error(`${LOG_PREFIX} No ".map" file matches!`))

    const spinner = ora(`${chalk.cyan('Upload:')} ${chalk.underline(file)}`).start()

    const formData = new FormData()
    formData.append('file', createReadStream(file))
    if (data) {
      Object.keys(data).forEach((key) => {
        if (data[key]) formData.append(key, data[key])
      })
    }

    const parsedUrl = parseUrl(url)

    function handleSuccess(res: IncomingMessage) {
      spinner.succeed()
      resolve(res)
    }
    function handleError(error: Error) {
      spinner.fail()
      reject(error)
    }

    const task = http.request(
      {
        method: 'POST',
        hostname: parsedUrl.hostname,
        path: parsedUrl.path || '/',
        port: parsedUrl.port,
        headers: formData.getHeaders(),
        timeout: TIMEOUT,
      },
      (res) => {
        if (res.statusCode) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            return handleSuccess(res)
          }
          const err = new Error(
            `${LOG_PREFIX} HTTP status ${res.statusCode} received from uploadSourceMap API`
          )
          return handleError(err)
        }

        throw new Error(`${LOG_PREFIX} Invalid payload sent to upload API`)
      }
    )

    formData.pipe(task)

    task.on('error', handleError)
  })

export default request
