import React from "react";
import GroceryListItem from "./GroceryListItem";

export default function GroceryList({itemList, setItemList}) {
  let index = -1
  return (
    <>
      {itemList?.map((item) => {
        index++
        return (
          <GroceryListItem key={item.id} item={item} index={index} itemList={itemList} setItemList={setItemList}/>
        );
      })}
    </>
  );
}
