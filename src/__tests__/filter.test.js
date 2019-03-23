import React from "react";
import { shallow } from "enzyme";

import Filter from "../components/filter";

it("Renders without crashing", () => {
  shallow(<Filter />);
});
