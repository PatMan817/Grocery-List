import Image from "next/future/image";
import React, { useRef, useState } from "react";

export default function GrocerySearch() {
  const [searchResults, setSearchResults] = useState(null);
  const searchInputRef = useRef();

  async function handleSearch(e) {
    e.preventDefault();
    try {
      let response = await fetch(
        `api/search?query=${searchInputRef.current.value}`
      );
      response = await response.json();
      setSearchResults(response.products);
    } catch (error) {
      return console.error(error);
    }
  }

  async function handleSelect(e) {
    const clickedItem = e.target.getAttribute("name");
    const imagetype = e.target.getAttribute("imagetype");
    let response = await fetch(`api/addToDB`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        clickedItem: clickedItem,
        imagetype: imagetype
      }),
    });
    //setSearchResults(null);
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
        <div key={result.id} name={result.id} imagetype={result.imageType} onClick={handleSelect}>
          <p name={result.id} imagetype={result.imageType}>{result.title}</p>
          <Image
            imagetype={result.imageType}
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
