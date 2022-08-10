import Image from "next/future/image";
import React, { useRef, useState } from "react";

export default function GrocerySearch() {
  const [searchResults, setSearchResults] = useState(null);
  const searchInputRef = useRef();

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const response = await (
        await fetch(`api/search?query=${searchInputRef.current.value}`)
      ).json();
      setSearchResults(response.products);
    } catch (error) {
      return console.error(error);
    }
  }

  function handleSelect(e) {
    console.log(e.target.getAttribute("name"));
    setSearchResults(null);
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          required
          type="search"
          placeholder="Search for Products"
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
      </form>
      {searchResults?.map((result) => (
        <div key={result.id} name={result.id} onClick={handleSelect}>
          <p name={result.id}>{result.title}</p>
          <Image
            name={result.id}
            width={90}
            height={90}
            src={`https://spoonacular.com/productImages/${result.id}-312x231.${result.imageType}`}
            alt="result-image"
          />
        </div>
      ))}
    </>
  );
}
