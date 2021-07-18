import axios, { AxiosPromise } from "axios";

import git from "nodegit";
import { IBuildDetails, IPostData, IPostResponse, ISettings } from "../src/interfaces";

// токен
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjU2MDQzMDU0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ik1hbnVzaGVua292IiwidXJuOmdpdGh1Yjp1cmwiOiJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL01hbnVzaGVua292IiwibmJmIjoxNjI0ODA4NDA1LCJleHAiOjE2Mjc0MDA0MDUsImlzcyI6IlNocmktSXNzdWVyLVRlc3QiLCJhdWQiOiJTaHJpLUF1ZGllbmNlLVRlc3QifQ.aS-OT176o1w7gV-GmOqHndWa40B34A5mD9zj95w0cbo";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};

const getLogs = (buildId: string): AxiosPromise<string> =>
  axios({
    method: "get",
    url: `https://shri.yandex/hw/api/build/log?buildId=${buildId}`,
    headers: headers,
  });

const getBuild = (buildId: string): AxiosPromise<IBuildDetails> =>
  axios({
    method: "get",
    url: `https://shri.yandex/hw/api/build/details?buildId=${buildId}`,
    headers: headers,
  });

const getList = (offset = 0, limit = 25): AxiosPromise<{ data: IBuildDetails[] }> =>
  axios({
    method: "get",
    url: `https://shri.yandex/hw/api/build/list?offset=${offset}&limit=${limit}`,
    headers: headers,
  });
  
const postCommit = ({commitMessage, commitHash, branchName, authorName}: IPostData): Promise<{data: IPostResponse}> => axios({
  method: "post",
  url: "https://shri.yandex/hw/api/build/request",
  headers: headers,
  data: {
    commitMessage,
    commitHash,
    branchName,
    authorName
  },
})

const postSettings = (data: ISettings["data"]): AxiosPromise<void> => {
  return axios({
    method: "post",
    url: "https://shri.yandex/hw/api/conf",
    headers: headers,
    data: {
      repoName: data.repoName,
      buildCommand: data.buildCommand,
      mainBranch: data.mainBranch,
      period: data.period,
    },
  }).then(git.Clone(data.repoName, "./repo"));
};

const getSettings = (): AxiosPromise<ISettings> =>
  axios({
    method: "get",
    url: "https://shri.yandex/hw/api/conf",
    headers: headers,
  });

const delSettings = (): AxiosPromise<void> =>
  axios({
    method: "delete",
    url: "https://shri.yandex/hw/api/conf",
    headers: headers,
  })

export {
  getSettings,
  postSettings,
  delSettings,
  getList,
  postCommit,
  getBuild,
  getLogs,
};
