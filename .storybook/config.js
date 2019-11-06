import React from "react";
import { configure, addDecorator } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import { Provider } from "mobx-react";
import store from "../src/store/index";

addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>);
addDecorator(story => <Provider store={store}>{story()}</Provider>);

function loadStories() {
  require("../src/stories");
}

configure(loadStories, module);
