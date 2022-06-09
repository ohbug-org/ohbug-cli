import path from 'path'
import type { Server } from 'http'
import express from 'express'
import type { Express } from 'express'
import multer from 'multer'
import rimraf from 'rimraf'

const upload = multer({ dest: path.resolve(__dirname, './uploads/') })

export const uploads = path.resolve(__dirname, './uploads')
const port = 10086
export const endpoint = `http://localhost:${port}/upload`

let server: Server | null
let app: Express | null
export const createTestServer = (): Promise<void> =>
  new Promise((resolve) => {
    app = express()

    app.post('/upload', upload.single('file'), (_, res) => {
      res.end('good')
    })

    const server2 = app.listen(
      port,
      () => {
        server = server2
        resolve()
      },
    )
  })

export const closeTestServer = () =>
  new Promise((resolve) => {
    server?.close(resolve)
    server = null
    app = null
  })

export const clearUploads = () => {
  rimraf(`${uploads}/*`, () => {})
}
