import { resolve } from "path";
import { Server } from "http";
import express from "express";
import type { Express } from "express";
import multer from "multer";
import rimraf from "rimraf";
const upload = multer({ dest: resolve(__dirname, "./uploads/") });

export const uploads = resolve(__dirname, "./uploads");
const port = 10086;
export const url = `http://localhost:${port}/upload`;

let server: Server | null, app: Express | null;
export const createTestServer = (): Promise<void> =>
  new Promise((resolve, reject) => {
    app = express();

    app.post("/upload", upload.single("file"), (_: any, res: any) => {
      res.end("good");
    });

    const args = [
      port,
      (err: Error) => {
        if (err) return reject(err);
        server = _server;
        resolve();
      },
    ];

    const _server = app.listen.apply(app, args);
  });

export const closeTestServer = () =>
  new Promise((resolve) => {
    server &&
      server.close(() => {
        resolve();
      });
    server = null;
    app = null;
  });

export const clearUploads = () => {
  rimraf(`${uploads}/*`, () => {});
};
