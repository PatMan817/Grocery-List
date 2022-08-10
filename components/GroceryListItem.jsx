import Image from "next/future/image";
import React from "react";

export default function GroceryListItem({ item, index, itemList, setItemList }) {
  async function removeItem() {
    let newItemList = itemList.slice()
    newItemList.splice(index, 1);
    setItemList(newItemList)
    try {
      await fetch("api/removeListItem", {
        method: "DELETE",
        body: item.id
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div name={item.id}>
      <p>{item.title}</p>
      <Image
        width={90}
        height={90}
        src={`https://spoonacular.com/productImages/${item.productId}-312x231.${item.imageType}`}
        alt="item-image"
      />
      <button onClick={removeItem}>×</button>
    </div>
  );
}
