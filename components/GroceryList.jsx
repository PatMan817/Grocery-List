import React from "react";
import GroceryListItem from "./GroceryListItem";

export default function GroceryList({itemList, setItemList}) {
  return (
    <>
      {itemList?.map((item, index) => (
          <GroceryListItem key={item.id} item={item} index={index} itemList={itemList} setItemList={setItemList}/>
        ))
      }
    </>
  );
}
