import { Search2Icon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react'
import { defaultStyles } from '../styles/DefaultStyles';
const SearchBar = ({
    searchTerm,
    setSearchTerm
}: {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}) => {
  return (
    <InputGroup
      _focus={{
        bg: defaultStyles.colors.dark,
        outline: "none",
      }}
      borderColor={defaultStyles.colors.info}
    >
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.300" />
      </InputLeftElement>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        type="text"
        placeholder="Filter by ISIN..."
      />
    </InputGroup>
  );
}

export default SearchBar