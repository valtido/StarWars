import React from "react";
import { mount } from "enzyme";
import { App } from "./App";

describe("App", () => {
  it("renders", () => {
    mount(<App />);
  });

  it("initially displays header and input", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("h1")).toHaveLength(1);
    expect(wrapper.find("input[name='search']")).toHaveLength(1);
    expect(wrapper.find("input[type='submit']")).toHaveLength(1);
  });

  it("Search by name", () => {
    const wrapper = mount(<App />);
    wrapper.find("input[type='text']").getDOMNode().value = "Luke Skywalker";
    wrapper.find("input[type='submit]").last().simulate("click");
    expect(wrapper.find("table")).toHaveLength(1);
    expect(wrapper.find("table thead th td").last().text()).toEqual("Luke");
  });
});
