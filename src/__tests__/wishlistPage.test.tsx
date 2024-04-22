import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WishlistPage from "../pages/WishlistPage";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; 

describe("WishlistPage", () => {
  beforeEach(() => {
    render(
      //@ts-ignore
      <MemoryRouter>
        <WishlistPage />
      </MemoryRouter>
    );
  });

  it("renders the page title and section title correctly", () => {
    expect(screen.getByText("Watchlists")).toBeInTheDocument();
    expect(screen.getByText("My Watchlists")).toBeInTheDocument();
  });

  it("displays the correct number of rows in the table", () => {
    console.log(screen.getAllByRole("row").length);
    expect(screen.getAllByRole("row").length).toBe(1);
  });
});
