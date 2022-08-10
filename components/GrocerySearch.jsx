import React from 'react'

export default function GrocerySearch() {

  return (
    <form>
      <input required type="search" placeholder='Search for Products'/>
      <button type='submit'>Search</button>
    </form>
  )
}
