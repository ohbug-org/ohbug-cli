import { readdirSync } from "fs";
import { resolve } from "path";
import { createTestServer, closeTestServer, url, uploads, clearUploads } from "./helpers";
import request from "../lib/request";
import uploadSourceMap from "../lib/uploadSourceMap";

const apiKey = "YOUR_API_KEY";
const appVersion = "YOUR_APP_VERSION";
const filePath = resolve(__dirname, "./fixtures/main.js.map");
const dirPath = resolve(__dirname, "./fixtures");

describe("ohbug-ci", () => {
  beforeAll(() => {
    clearUploads();
    createTestServer();
  });
  afterAll(() => {
    closeTestServer();
  });
  afterEach(() => {
    clearUploads();
  });

  it("request: should works", async () => {
    await request({ url, file: filePath });
    const files = readdirSync(uploads).length;
    await expect(files).toBe(1);
  });

  it("request: url is required", async () => {
    await expect(
      // @ts-ignore
      request({ url: null })
    ).rejects.toThrowError(/No url matches!/);
  });

  it("request: file is required", async () => {
    await expect(
      // @ts-ignore
      request({ url, file: null })
    ).rejects.toThrow(/No ".map" file matches!/);
  });

  it("uploadSourceMap: should works with single file", async () => {
    await uploadSourceMap({ path: filePath, apiKey, appVersion, url });
    const files = readdirSync(uploads).length;
    return expect(files).toBe(1);
  });

  it("uploadSourceMap: should works with directory", async () => {
    await uploadSourceMap({ path: dirPath, apiKey, appVersion, url });
    const files = readdirSync(uploads).length;
    return expect(files).toBe(2);
  });
});
