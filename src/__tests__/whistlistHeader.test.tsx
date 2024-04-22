import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WishlistHeader from "../components/WishlistHeader";
import "@testing-library/jest-dom";

describe("WishlistHeader", () => {
  const mockSetSearchTerm = jest.fn();
  const mockRouter = jest.fn();

  beforeEach(() => {
    render(
      <WishlistHeader
        streamListCount={3}
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        router={mockRouter}
        lastUpdated={new Date()}
      />
    );
  });

  it("displays the correct stream count", () => {
    expect(screen.getByText("3 Items")).toBeInTheDocument();
  });

  it("displays the last updated time", () => {
    expect(screen.getByText(/Last updated/i)).toBeInTheDocument();
  });

  it("updates the search term when a new term is entered", () => {
    const input = screen.getByPlaceholderText("Filter by ISIN...");
    const searchValue = "new term";
    fireEvent.change(input, { target: { value:searchValue } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith(searchValue.toUpperCase());
  });

  it("navigates to home when add watchlist button is clicked", () => {
    const addButton = screen.getByText("Add Watchlist");
    fireEvent.click(addButton);
    expect(mockRouter).toHaveBeenCalledWith("/");
  });
});
