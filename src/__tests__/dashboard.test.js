import React from "react";
import { shallow } from "enzyme";

import Dashboard from "../components/dashboard";

describe("<Dashboard />", () => {
  it("Renders without crashing", () => {
    shallow(<Dashboard />);
  });

  it("Renders the add button initially", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.hasClass("sidebar")).toEqual(true);
  });
});
