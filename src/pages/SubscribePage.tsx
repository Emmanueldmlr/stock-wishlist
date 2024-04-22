import { AddIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotification from "../hooks/useNotification";
import { defaultStyles } from "../styles/DefaultStyles";
import { validateIsin } from "../utils/isinValidator";
import { getWatchList, saveWatchList } from "../utils/storageManager";

const Subscribe = () => {
  const [isin, setIsin] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = useNotification();
  const router = useNavigate();

  const addISINToWatchList = async () => {
    if (!isin) return notify("Please enter an ISIN", "error");
    try {
      setLoading(true);
      const watchList = getWatchList() || [];
      const validationResult = validateIsin(isin, watchList);
      if (!validationResult.isValid) {
        setLoading(false);
        return notify(validationResult.error, "error");
      }
      watchList.push(isin);
      saveWatchList(watchList);
      setIsin("");
      notify("ISIN added to watch list", "success");
      setLoading(false);
    } catch (e) {
      notify("An error occurred", "error");
      setLoading(false);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} py={12} bg="#000">
      <Stack
        boxShadow={"2xl"}
        bg={defaultStyles.colors.dark}
        rounded={"xl"}
        p={10}
        spacing={8}
        align={"center"}
        minW={{ base: "auto", md: "2xl" }}
        borderColor={defaultStyles.colors.info}
        borderWidth={1}
      >
        <Image src="../../../watchlist.png" w={24} h={24} alt="logo" />
        <Stack align={"center"} spacing={1}>
          <Heading textTransform={"uppercase"} fontSize={"2xl"} color={defaultStyles.colors.white}>
            WatchList
          </Heading>
          <Text fontSize={"md"} color={defaultStyles.colors.white}>
            Add a new ISIN to your watchlist
          </Text>
        </Stack>
        <Stack spacing={4} direction={{ base: "column", md: "row" }} w={"full"}>
          <Input
            type={"text"}
            placeholder="Enter ISIN (e.g., US0378331005)"
            color={defaultStyles.colors.white}
            bg={defaultStyles.colors.dark}
            rounded={"full"}
            _focus={{
              bg: defaultStyles.colors.dark,
              outline: "none",
            }}
            value={isin}
            onChange={(e) => setIsin(e.target.value)}
            borderColor={defaultStyles.colors.info}
            borderWidth={1}
          />
          <Button
            bg={defaultStyles.colors.white}
            rounded={"full"}
            color={"#000"}
            flex={"1 0 auto"}
            _hover={{ bg: defaultStyles.colors.white }}
            _focus={{ bg: defaultStyles.colors.white }}
            fontSize={"sm"}
            leftIcon={<Icon as={AddIcon} />}
            isLoading={loading}
            onClick={addISINToWatchList}
          >
            Add ISIN
          </Button>
        </Stack>
        <Button
          rightIcon={<Icon as={ArrowForwardIcon} w={6} h={6} color={defaultStyles.colors.white} />}
          color={defaultStyles.colors.white}
          variant="ghost"
          onClick={() => router("/wishlist")}
          _hover={{ bg: defaultStyles.colors.dark }}
        >
          View watchlist
        </Button>
      </Stack>
    </Flex>
  );
};

export default Subscribe;
