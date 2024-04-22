import { useToast } from "@chakra-ui/react";
import React from "react";

const useNotification = () => {
  const toast = useToast();
  const notify = (
    title: string,
    status: "success" | "error" | "warning" | "info" | undefined
  ) => {
    toast({
      title,
      status,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };
  return notify;
};

export default useNotification;
