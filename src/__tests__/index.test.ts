import { readdirSync } from 'fs'
import { resolve } from 'path'
import request from '../lib/request'
import uploadSourceMap from '../lib/uploadSourceMap'
import { clearUploads, closeTestServer, createTestServer, endpoint, uploads } from './helpers'

const apiKey = 'YOUR_API_KEY'
const appVersion = 'YOUR_APP_VERSION'
const filePath = resolve(__dirname, './fixtures/main.js.map')
const dirPath = resolve(__dirname, './fixtures')

describe('ohbug-ci', () => {
  beforeAll(() => {
    clearUploads()
    createTestServer()
  })
  afterAll(() => {
    closeTestServer()
  })
  afterEach(() => {
    clearUploads()
  })

  it('request: should works', async() => {
    await request({ endpoint, file: filePath })
    const files = readdirSync(uploads).length
    await expect(files).toBe(1)
  })

  it('request: endpoint is required', async() => {
    // @ts-expect-error test need
    await expect(request({ endpoint: null })).rejects.toThrowError(/No endpoint matches!/)
  })

  it('request: file is required', async() => {
    // @ts-expect-error test need
    await expect(request({ endpoint, file: null })).rejects.toThrow(/No ".map" file matches!/)
  })

  it('uploadSourceMap: should works with single file', async() => {
    await uploadSourceMap({ path: filePath, apiKey, appVersion, endpoint })
    const files = readdirSync(uploads).length
    return expect(files).toBe(1)
  })

  it('uploadSourceMap: should works with directory', async() => {
    await uploadSourceMap({ path: dirPath, apiKey, appVersion, endpoint })
    const files = readdirSync(uploads).length
    return expect(files).toBe(2)
  })
})
