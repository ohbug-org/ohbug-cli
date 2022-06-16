import fs from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'
import fg from 'fast-glob'
import request from './request'
import { DEFAULT_ENDPOINT, LOG_PREFIX } from './constants'

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
  endpoint?: string
}
export interface UploadSourceMap extends UploadSourceMapCommand, UploadSourceMapOptions {}

async function uploadSourceMap({
  path,
  apiKey,
  appVersion,
  appType,
  endpoint = DEFAULT_ENDPOINT,
}: UploadSourceMap) {
  const stats = await stat(path)
  if (stats.isFile()) {
    // Single file
    const file = resolve(path)
    try {
      return await request({
        endpoint,
        file,
        data: {
          apiKey,
          appVersion,
          appType,
        },
      })
    }
    catch (error) {
      throw new Error(`${LOG_PREFIX} Uploading file ${file} failed!\n${error}`)
    }
  }
  else if (stats.isDirectory()) {
    // Find all map files in the specified directory and upload them one by one.
    const list = fg.sync(resolve(path, './**/*.{js.map,}'))
    if (list.length) {
      try {
        return await Promise.all(list.map(file =>
          request({
            endpoint,
            file,
            data: {
              apiKey,
              appVersion,
              appType,
            },
          })))
      }
      catch (error) {
        throw new Error(`${LOG_PREFIX} Uploading file ${list.join(',')} failed!\n${error}
      `)
      }
    }
    else {
      throw new Error(`${LOG_PREFIX} No matching source map files!`)
    }
  }
  return null
}

export default uploadSourceMap
