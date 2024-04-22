import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TableRow from "../components/TableRow";
import "@testing-library/jest-dom";
import { Table, Tbody, Tr } from "@chakra-ui/react";


jest.mock("@chakra-ui/icons", () => ({
  DeleteIcon: ({ onClick }: {
    onClick: () => void;
  }) => <span onClick={onClick}>Delete</span>,
}));

describe("TableRow", () => {
  const mockUnsubscribe = jest.fn();
  const stock = {
    isin: "DE000BASF111",
    price: 88.4,
    percentChange: -0.5,
    percentChangeFlag: "DOWN",
    bid: 88.1,
    ask: 88.6,
  };

  beforeEach(() => {
    render(
      <Table>
        <Tbody>
          <TableRow stock={stock} index={0} unsubscribe={mockUnsubscribe} />
        </Tbody>
      </Table>
    );
  });

  it("renders table row with correct data", () => {
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("DE000BASF111")).toBeInTheDocument();
    expect(screen.getByText("€ 88.40")).toBeInTheDocument();
    expect(screen.getByText("-0.50%")).toBeInTheDocument();
    expect(screen.getByText("€ 88.10")).toBeInTheDocument();
    expect(screen.getByText("€ 88.60")).toBeInTheDocument();
  });

  it("calls unsubscribe when delete icon is clicked", () => {
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockUnsubscribe).toHaveBeenCalledWith("DE000BASF111");
  });
});
