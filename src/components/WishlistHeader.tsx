import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { defaultStyles } from "../styles/DefaultStyles";
import SearchBar from "./SearchBar";
import { format } from "date-fns";

const WishlistHeader = ({
  streamListCount,
  searchTerm,
  setSearchTerm,
  router,
  lastUpdated,
}: {
  streamListCount: number;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  router: (path: string) => void;
  lastUpdated: Date | null;
}) => {
  return (
    <Stack
      justifyContent="space-between"
      direction={{ base: "column", md: "row" }}
      gap={4}
    >
      <Box color={defaultStyles.colors.info}>
        <Text fontSize="sm">{streamListCount} Items</Text>
        {lastUpdated && (
          <Text fontSize="sm">Last updated {format(lastUpdated, "PPpp")}</Text>
        )}
      </Box>
      <Stack gap={6} direction={{ base: "column", md: "row" }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button
          onClick={() => router("/")}
          leftIcon={<AddIcon />}
          bg={defaultStyles.colors.white}
          size="sm"
          minW={40}
        >
          Add Watchlist
        </Button>
      </Stack>
    </Stack>
  );
};

export default WishlistHeader;
