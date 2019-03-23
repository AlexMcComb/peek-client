import React from "react";
import { shallow } from "enzyme";
import { RegistrationForm } from "../components/registration-form";

describe("<RegistrationForm />", function() {
  it("Renders without crashing", function() {
    const handleSubmit = jest.fn();
    shallow(<RegistrationForm handleSubmit={handleSubmit} />);
  });
});
