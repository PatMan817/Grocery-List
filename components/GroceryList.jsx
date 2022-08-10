import Image from "next/future/image";
import React from "react";

export default function GroceryList({ itemList }) {
  return (
    <>
      {itemList?.map((item) => {
        return (
        <div key={item.id} name={item.id}>
          <p>{item.title}</p>
          <Image
            width={90}
            height={90}
            src={`https://spoonacular.com/productImages/${item.id}-312x231.${item.imageType}`}
            alt="item-image"
          />
        </div>
        );
      })}
    </>
  );
}
