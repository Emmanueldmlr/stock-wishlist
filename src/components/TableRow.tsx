import { DeleteIcon } from "@chakra-ui/icons";
import { Tag, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { WatchlistType } from "../types/WatchlistType";
import { formatNumber } from "../utils/numberHandler";

const TableRow = ({
  stock,
  index,
  unsubscribe,
}: {
  stock: WatchlistType;
  index: number;
  unsubscribe: (isin: string) => void;
}) => {
  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>{stock.isin}</Td>
      <Td>€ {formatNumber(stock.price)}</Td>
      <Td>
        <Tag
          size="md"
          key={stock.isin}
          variant="solid"
          colorScheme={
            stock.percentChangeFlag === "UP"
              ? "green"
              : stock.percentChangeFlag === "DOWN"
              ? "red"
              : "orange"
          }
        >
          {formatNumber(stock.percentChange)}%
        </Tag>
      </Td>
      <Td>€ {formatNumber(stock.bid)}</Td>
      <Td>€ {formatNumber(stock.ask)}</Td>
      <Td>
        <DeleteIcon cursor="pointer" onClick={() => unsubscribe(stock.isin)} />
      </Td>
    </Tr>
  );
};

export default TableRow;
