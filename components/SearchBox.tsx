import React, { useState } from "react";
import { TextInput } from "react-native";

interface Props {
  searchQuery: string;
  setSearchQuery: any;
}
const SearchBox = (props: Props) => {
  return (
    <TextInput
      placeholder="search..."
      onChangeText={(t) => props.setSearchQuery(t.toLowerCase())}
      value={props.searchQuery}
    ></TextInput>
  );
};

export default SearchBox;
