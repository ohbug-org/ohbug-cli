import fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'
import glob from 'glob'
import request from './request'
import { DEFAULT_URL } from './constants'

const stat = promisify(fs.stat)

export interface UploadSourceMapCommand {
  /**
   * The target directory can be either the source map file directory or the source map folder directory
   */
  path: string
}
export interface UploadSourceMapOptions {
  /**
   * Your project API key
   */
  apiKey: string
  /**
   * The version number of your app
   */
  appVersion: string
  /**
   * The type of your app
   */
  appType?: string
  /**
   * The url of the upload server
   */
  url?: string
}
export interface UploadSourceMap
  extends UploadSourceMapCommand,
    UploadSourceMapOptions {}

async function uploadSourceMap({
  path,
  apiKey,
  appVersion,
  appType,
  url = DEFAULT_URL
}: UploadSourceMap) {
  const stats = await stat(path)
  if (stats.isFile()) {
    // Single file
    const file = resolve(path)
    await request({
      url,
      file,
      data: {
        apiKey,
        appVersion,
        appType
      }
    })
  } else if (stats.isDirectory()) {
    // Find all map files in the specified directory and upload them one by one.
    const list = glob.sync(resolve(path, `./**/*.{js.map,}`))
    for (const file of list) {
      await request({
        url,
        file,
        data: {
          apiKey,
          appVersion,
          appType
        }
      })
    }
  }
}

export default uploadSourceMap
