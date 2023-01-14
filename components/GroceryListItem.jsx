import Image from "next/future/image";
import React, { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function GroceryListItem({
  item,
  index,
  itemList,
  setItemList,
}) {
  const [expanded, setExpanded] = useState(false);
  const [itemInfo, setItemInfo] = useState(null);
  const [parent] = useAutoAnimate(/* optional config */)

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

  async function handleExpand(e) {
    if (e.target.tagName === 'BUTTON') {
      return
    }
    if (!itemInfo) {
      try {
        let data = await fetch(`api/getItemInfo?productId=${item.productId}`);
        data = await data.json();
        setItemInfo(data);
      } catch (error) {
        console.error(error);
      }
    }
    setExpanded(!expanded);
  }

  async function handleQuantityChange(e) {
    let newItemList = itemList.slice();
    newItemList[index].quantity += (e.target.getAttribute("name") === 'increment' ?  1 : -1);
    setItemList(newItemList);
    try {
      await fetch(`api/changeQuantity`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          direction: e.target.getAttribute("name"),
          productId: item.productId
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div ref={parent} onClick={handleExpand} name={item.id} className="itemWrapper">
      <style jsx>{`
        p {
          align-items: center;
        }
        .itemWrapper {
          background-color: lightgreen;
          border-radius: 2%;
          padding: 0px 5px 5px 5px;
          margin: 5px;
          cursor: pointer;
          border: 2px solid black;
          width: 90%;
        }
        .itemWrapper:hover {
          background-color: lightgray;
        }
        .itemInfo {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .extraInfo {
          background-color: whitesmoke
        }
        .imageWrapper {
          display: flex;
          border: 2px solid black;
        }
        .extraInfo {
          display: flex;
          padding: 0px 5px;
        }
        button {
          height: 25px;
          border-radius: 50%;
          aspect-ratio: 1/1;
          cursor: pointer;
        }
      `}</style>
      <p>{item.title}</p>
      <div className="itemInfo">
        <div className="imageWrapper">

        <Image
          width={90}
          height={90}
          src={`https://spoonacular.com/productImages/${item.productId}-312x231.${item.imageType}`}
          alt="item-image"
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button name="decrement" onClick={handleQuantityChange}>-</button>
          <p style={{ margin: "0px 5px" }}>Quantity: {item.quantity}</p>
          <button name="increment" onClick={handleQuantityChange}>+</button>
        </div>
        <button onClick={removeItem}>×</button>
      </div>
      {expanded && (
        <div className="extraInfo">
          <div>
            <p>Aisle:</p>
            <p>{itemInfo?.aisle}</p>
          </div>
          <div style={{ marginLeft: "15px" }}>
            <p style={{ marginBottom: "0px" }}>Nutrition Facts:</p>
            <div style={{ display: "flex" }}>
              {itemInfo?.nutrition.nutrients.map((item) => {
                return (
                  <div key={item.productId} style={{ margin: "0px 5px" }}>
                    <p>{item.name}</p>
                    <p>
                      {item.amount}
                      {item.unit}
                    </p>
                    <p>{item.percentOfDailyNeeds}% of daily need</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
