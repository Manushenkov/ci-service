"use strict";
// node v14.17.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requests_js_1 = require("./requests.js");
const log_js_1 = require("./log.js");
const app = express_1.default();
// const PORT = process.env.PORT ?? 3000
const PORT = 3001;
let branchName;
app.listen(PORT, () => {
    console.log("started");
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT');
    next();
});
app.get("/builds", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    requests_js_1.getList(req.query.offset, req.query.limit).then((r) => {
        res.send(r.data);
    });
});
app.get("/builds/:buildId", (req, res) => {
    console.log("getting buld");
    res.setHeader("Access-Control-Allow-Origin", "*");
    requests_js_1.getBuild(req.params.buildId).then((r) => {
        console.log(r.data);
        res.send(r.data);
    });
});
app.get("/builds/:buildId/logs", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    requests_js_1.getLogs(req.params.buildId).then((r) => {
        console.log(r.data);
        res.send(r.data);
    });
});
app.get("/buildsPost/:hash", (req, res) => {
    console.log("добавление сборки в очередь../");
    if (branchName === undefined) {
        //если в памяти нет branch запрашиваем его с бэкенда
        requests_js_1.getSettings()
            .then((response) => {
            branchName = response.data.data.mainBranch;
        })
            .then(() => {
            log_js_1.getCommitByHash(req.params.hash)
                .then((commit) => requests_js_1.postCommit({
                commitMessage: commit.message(),
                commitHash: commit.sha(),
                branchName,
                authorName: commit.author().name()
            }).then((r) => res.send(r.data.data)));
        });
    }
    else {
        log_js_1.getCommitByHash(req.params.hash)
            .then((commit) => requests_js_1.postCommit({
            commitMessage: commit.message(),
            commitHash: commit.sha(),
            branchName,
            authorName: commit.author().name()
        }).then((r) => res.send(r.data.data)));
    }
});
app.get("/settingsPost", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    branchName = req.query.mainBranch;
    console.log(req.query);
    requests_js_1.postSettings(req.query).then(() => {
        res.send("settings are sent");
    });
});
app.get("/settingsGet", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    requests_js_1.getSettings().then((response) => {
        res.send(response.data.data);
    });
});
app.get("/settingsDel", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    requests_js_1.delSettings().then(() => {
        res.send('DELETED');
    });
});
