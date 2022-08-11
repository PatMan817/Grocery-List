import Image from "next/future/image";
import React from "react";

export default function GroceryListItem({
  item,
  index,
  itemList,
  setItemList,
}) {
  async function removeItem() {
    let newItemList = itemList.slice();
    newItemList.splice(index, 1);
    setItemList(newItemList);
    try {
      await fetch("api/removeListItem", {
        method: "DELETE",
        body: item.id,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div name={item.id} className="itemWrapper">
      <style jsx>{`
        .itemWrapper {
          background-color: whitesmoke;
          border-radius: 5%;
          padding: 0px 5px 5px 5px;
          margin: 5px;
          cursor: pointer;
        }
        .itemWrapper:hover {
          background-color: lightgray;
        }
        .itemInfo {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
      <p>{item.title}</p>
      <div className="itemInfo">
        <Image
          width={90}
          height={90}
          src={`https://spoonacular.com/productImages/${item.productId}-312x231.${item.imageType}`}
          alt="item-image"
        />
        <p>Quantity: {item.quantity}</p>
        <button onClick={removeItem}>×</button>
      </div>
    </div>
  );
}
