// node v14.17.0

import express from "express";
import { ISettings } from "../src/interfaces";

import {
  getSettings,
  postSettings,
  delSettings,
  getList,
  postCommit,
  getBuild,
  getLogs,
} from "./requests.js";
import { getCommitByHash } from "./log.js";

const app = express();
// const PORT = process.env.PORT ?? 3000
const PORT = 3001;

let branchName: string;

app.listen(PORT, () => {
  console.log("started");
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');

  next();
});

app.get("/builds", (req: { query: { offset: number, limit: number } }, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  getList(req.query.offset, req.query.limit).then((r) => {
    res.send(r.data);
  });
});

app.get("/builds/:buildId", (req: { params: { buildId: string } }, res) => {
  console.log("getting buld");
  res.setHeader("Access-Control-Allow-Origin", "*");

  getBuild(req.params.buildId).then((r) => {
    console.log(r.data);
    res.send(r.data);
  });
});

app.get("/builds/:buildId/logs", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  getLogs(req.params.buildId).then((r: { data: string }) => {
    console.log(r.data);
    res.send(r.data);
  });
});

app.get("/buildsPost/:hash", (req, res) => {
  console.log("добавление сборки в очередь../");
  if (branchName === undefined) {
    //если в памяти нет branch запрашиваем его с бэкенда
    getSettings()
      .then((response) => {
        branchName = response.data.data.mainBranch;
      })
      .then(() => {
        getCommitByHash(req.params.hash)
          .then((commit) =>
            postCommit({
              commitMessage: commit.message(),
              commitHash: commit.sha(),
              branchName,
              authorName: commit.author().name()
            }
            ).then((r) => res.send(r.data.data))
          )
      });
  } else {
    getCommitByHash(req.params.hash)
      .then((commit) =>
        postCommit({
          commitMessage: commit.message(),
          commitHash: commit.sha(),
          branchName,
          authorName: commit.author().name()
        }
        ).then((r) => res.send(r.data.data))
      )
  }
});

app.get("/settingsPost", (req: { query: ISettings["data"] }, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  branchName = req.query.mainBranch;
  console.log(req.query)
  postSettings(req.query).then(() => {
    res.send("settings are sent");
  });
});

app.get("/settingsGet", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  getSettings().then((response: { data: ISettings }) => {
    res.send(response.data.data);
  });
});

app.get("/settingsDel", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  delSettings().then(() => {
    res.send('DELETED');
  });
});
