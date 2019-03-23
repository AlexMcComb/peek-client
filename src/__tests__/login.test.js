import React from "react";
import { shallow } from "enzyme";
import { LoginForm } from "../components/login-form";

describe("<LoginForm />", function() {
  it("Renders without crashing", function() {
    const handleSubmit = jest.fn();
    shallow(<LoginForm handleSubmit={handleSubmit} />);
  });
});
