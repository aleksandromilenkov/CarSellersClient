import React from "react";
import SearchForm from "../Components/Search/SearchForm";
import CarsSearchResults from "../Components/Cars/CarsSearchResults";

type Props = {};

const SearchPage = (props: Props) => {
  return (
    <div>
      <SearchForm />
      <CarsSearchResults/>
    </div>
  );
};

export default SearchPage;
