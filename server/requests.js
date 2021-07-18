"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = exports.getBuild = exports.postCommit = exports.getList = exports.delSettings = exports.postSettings = exports.getSettings = void 0;
const axios_1 = __importDefault(require("axios"));
const nodegit_1 = __importDefault(require("nodegit"));
// токен
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU2MDQzMDU0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik1hbnVzaGVua292IiwidXJuOmdpdGh1Yjp1cmwiOiJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL01hbnVzaGVua292IiwibmJmIjoxNjI0ODA4NDA1LCJleHAiOjE2Mjc0MDA0MDUsImlzcyI6IlNocmktSXNzdWVyLVRlc3QiLCJhdWQiOiJTaHJpLUF1ZGllbmNlLVRlc3QifQ.aS-OT176o1w7gV-GmOqHndWa40B34A5mD9zj95w0cbo";
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};
const getLogs = (buildId) => axios_1.default({
    method: "get",
    url: `https://shri.yandex/hw/api/build/log?buildId=${buildId}`,
    headers: headers,
});
exports.getLogs = getLogs;
const getBuild = (buildId) => axios_1.default({
    method: "get",
    url: `https://shri.yandex/hw/api/build/details?buildId=${buildId}`,
    headers: headers,
});
exports.getBuild = getBuild;
const getList = (offset = 0, limit = 25) => axios_1.default({
    method: "get",
    url: `https://shri.yandex/hw/api/build/list?offset=${offset}&limit=${limit}`,
    headers: headers,
});
exports.getList = getList;
const postCommit = ({ commitMessage, commitHash, branchName, authorName }) => axios_1.default({
    method: "post",
    url: "https://shri.yandex/hw/api/build/request",
    headers: headers,
    data: {
        commitMessage,
        commitHash,
        branchName,
        authorName
    },
});
exports.postCommit = postCommit;
const postSettings = (data) => {
    return axios_1.default({
        method: "post",
        url: "https://shri.yandex/hw/api/conf",
        headers: headers,
        data: {
            repoName: data.repoName,
            buildCommand: data.buildCommand,
            mainBranch: data.mainBranch,
            period: data.period,
        },
    }).then(nodegit_1.default.Clone(data.repoName, "./repo"));
};
exports.postSettings = postSettings;
const getSettings = () => axios_1.default({
    method: "get",
    url: "https://shri.yandex/hw/api/conf",
    headers: headers,
});
exports.getSettings = getSettings;
const delSettings = () => axios_1.default({
    method: "delete",
    url: "https://shri.yandex/hw/api/conf",
    headers: headers,
});
exports.delSettings = delSettings;
