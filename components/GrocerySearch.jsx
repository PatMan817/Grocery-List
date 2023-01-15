import Image from 'next/future/image';
import React, { useRef, useState } from 'react';

export default function GrocerySearch({ getItems }) {
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
    const index = e.target.getAttribute('name');
    const clickedItem = searchResults[index].id;
    const imagetype = searchResults[index].imageType;
    const title = searchResults[index].title;
    const quantity = prompt('How many?');
    if (quantity) {
      let response = await fetch(`api/addToDB`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          clickedItem: clickedItem.toString(),
          imagetype: imagetype,
          title: title,
          quantity: quantity,
        }),
      });
      setSearchResults(null);
      getItems();
    }
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
      {searchResults && (
        <div className="searchResults">
          <style jsx>{`
            .searchResults {
              background-color: mediumseagreen;
              position: absolute;
              text-align: center;
              border-radius: 3%;
              z-index: 2;
            }
            .searchItem {
              display: flex;
              flex-direction: column;
              align-items: center;
              background-color: white;
              padding-bottom: 5px;
              margin: 10px;
              border-radius: 2%;
              cursor: pointer;
            }
            .searchItem:hover {
              background-color: lightgray;
            }
            button {
              position: absolute;
              right: 5%;
              top: 1%;
            }
          `}</style>

          <button
            onClick={() => {
              setSearchResults(null);
            }}
          >
            Cancel
          </button>
          <h1>
            <u>Results</u>
          </h1>
          {searchResults?.map((result, index) => (
              <div
                key={result.id}
                name={index}
                onClick={handleSelect}
                className="searchItem"
              >
                <p name={index}>{result.title}</p>
                <Image
                  name={index}
                  width={90}
                  height={90}
                  src={`https://spoonacular.com/productImages/${result.id}-312x231.${result.imageType}`}
                  alt="result-image"
                />
              </div>
            ))
          }
        </div>
      )}
    </>
  );
}
