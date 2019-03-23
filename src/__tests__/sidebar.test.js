import React from "react";
import { shallow } from "enzyme";
import { Sidebar } from "../components/Sidebar";

describe("<Sidebar />", function() {
  it("Renders without crashing", function() {
    shallow(<Sidebar />);
  });
});
