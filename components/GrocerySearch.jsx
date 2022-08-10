import Image from "next/future/image";
import React, { useRef, useState } from "react";

export default function GrocerySearch({getItems}) {
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
    const index = e.target.getAttribute("name")
    const clickedItem = searchResults[index].id;
    const imagetype = searchResults[index].imageType;
    const title = searchResults[index].title
    let response = await fetch(`api/addToDB`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        clickedItem: clickedItem.toString(),
        imagetype: imagetype,
        title: title
      }),
    });
    setSearchResults(null);
    getItems()
  }
  let index = -1;
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
      {searchResults?.map((result) => {
        index++
        return (
          <div
            key={result.id}
            name={index}
            onClick={handleSelect}
          >
            <p name={index}>
              {result.title}
            </p>
            <Image
              name={index}
              width={90}
              height={90}
              src={`https://spoonacular.com/productImages/${result.id}-312x231.${result.imageType}`}
              alt="result-image"
            />
          </div>
        );
      })}
    </>
  );
}
