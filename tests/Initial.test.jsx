import { it, expect } from "@jest/globals";
import History from "../src/History";
import Header from "../src/Header";

import React from "react";
import { render } from "@testing-library/react";

it("opens modal when the 'Run build' button is clicked", () => {
  const buttons = [
    {
      src: "",
      text: "Run build",
      cb: () => setIsVisible(true),
    },
  ];

  let isVisible = false;
  let setIsVisible = (val) => {
    isVisible = val;
  };

  const modalTest = (
    <>
      <Header buttons={buttons} />
      <History isVisible={isVisible} setIsVisible={setIsVisible} />
    </>
  );

  const { container } = render(modalTest);

  container.querySelector(".header__button").click(); // симуляция клика на кнопку, открывающую попап
  expect(isVisible).toBe(true);
});
