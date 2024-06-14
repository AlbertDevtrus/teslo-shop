'use client';

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export default function QuantitySelector({ quantity }: Props) {

  const [count, setCount] = useState(quantity);

  const onQuantityChange = (value: number) => {
    if(count + value < 1) return;

    setCount(count + value);
  }

  return (
    <div className="flex">
      <button onClick={() => onQuantityChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 rounded mx-3 px-5 py-2 bg-gray-200 text-center flex items-center justify-center">{ count }</span>
      <button onClick={() => onQuantityChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
