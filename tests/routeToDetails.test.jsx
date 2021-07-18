import "@testing-library/jest-dom";

import { Router } from "react-router-dom";

import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import React from "react";
import AppUnrouted from "../src/AppUnrouted";

it("переход к настройкам по адресу /settings", () => {
  const history = createMemoryHistory({
    initialEntries: ["/build/123"],
    initialIndex: 0,
  });

  const application = (
    <Router history={history}>
      <AppUnrouted />
    </Router>
  );

  const { container } = render(application);

  // проверяет наличие эл-та с классом App__settings
  expect(container.querySelector(".App__details")).toBeTruthy();
});
