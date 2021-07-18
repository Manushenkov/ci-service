"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommitByHash = void 0;
const nodegit_1 = __importDefault(require("nodegit"));
const getCommitByHash = (hash) => {
    return nodegit_1.default.Repository.open('repo')
        .then((r) => r.getCommit(hash));
};
exports.getCommitByHash = getCommitByHash;
