import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, it, beforeEach } from "vitest";
import Form from "./Form";

/**
 * @vitest-environment jsdom
 */

beforeEach(() => {
  render(<Form />);
});

it.only("no errors to start", async () => {
  expect(screen.queryByRole("alert")).toBeNull();
});

it("display errors when required fields missing", async () => {
  fireEvent.submit(screen.getByRole("button"));

  expect(await screen.findAllByRole("alert")).toHaveLength(3);
});
