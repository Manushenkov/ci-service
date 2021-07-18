import { it, expect } from "@jest/globals";
import processDate from "../src/processDate";
import HistoryBlock from "../src/HistoryBlock";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";

it("приведение даты к нужному формату", function () {
  const result = processDate({ start: "2021-06-29T00:51:25.798" });

  expect(result).toBe("29 июн, 00:51");
});

it("проверка правильности отображения данных в HistoryBlock", () => {
  const mockData = {
    hash: "hash",
    title: "title",
    authorName: "author",
    branchName: "branchName",
    buildNumber: 1,
    commitHash: "commitHash",
    commitMessage: "Initial commit\n",
    configurationId: "configurationId",
    duration: 1,
    id: "id",
    start: "2021-06-29T01:40:45.686",
    status: "Success",
  };

  const application = <HistoryBlock data={mockData} />;

  const { container } = render(application);

  expect(container.querySelector(".title__id").innerHTML).toEqual(mockData.id);
  expect(container.querySelector(".title__title").innerHTML).toEqual(mockData.title);
  expect(container.querySelector(".info__branch").innerHTML).toEqual(mockData.branchName);
  expect(container.querySelector(".info__hash").innerHTML).toEqual(mockData.hash);
  expect(container.querySelector(".info__name").innerHTML).toEqual(mockData.authorName);
});
