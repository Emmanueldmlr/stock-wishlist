import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { defaultStyles } from "../styles/DefaultStyles";
import { TableHeader } from "../data/TableHeader";
import TableRow from "../components/TableRow";
import WishlistHeader from "../components/WishlistHeader";

const WishlistPage = () => {
  const { streams, unsubscribe, streamListCount, lastUpdated } = useSocket();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useNavigate();

   const filteredStocks = Object.values(streams).filter((stock) =>
     stock.isin.includes(searchTerm)
   );

  return (
    <Flex
      minH={"100vh"}
      p={{ base: 10, md: 20 }}
      bg={defaultStyles.colors.black}
    >
      <Stack color={defaultStyles.colors.white} width="full">
        <Text fontSize={22} my={4} fontWeight="bold">
          Watchlists
        </Text>
        <Divider borderColor={defaultStyles.colors.info} />
        <Text fontSize={22} mt={4} fontWeight="bold">
          My Watchlists
        </Text>
        <WishlistHeader
          streamListCount={streamListCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          router={router}
          lastUpdated={lastUpdated}
        />
        <Box my={8}>
          <TableContainer>
            <Table
              variant="simple"
              sx={{
                "th, td": {
                  borderColor: defaultStyles.colors.info,
                  textAlign: "center",
                  color: defaultStyles.colors.white,
                },
              }}
            >
              <Thead>
                <Tr>
                  {TableHeader.map((header, index) => (
                    <Th key={index}>{header}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {filteredStocks.map((stock, index) => (
                  <TableRow
                    key={index}
                    stock={stock}
                    unsubscribe={unsubscribe}
                    index={index}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Flex>
  );
};

export default WishlistPage;
