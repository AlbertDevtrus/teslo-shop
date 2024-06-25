'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;

  onQuantityChange: ( quantity: number ) => void;
}

export default function QuantitySelector({ quantity, onQuantityChange }: Props) {

  const onValueChange = (value: number) => {
    if(quantity + value < 1) return;

    onQuantityChange(quantity + value);
  }

  return (
    <div className="flex">
      <button onClick={() => onValueChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 rounded mx-3 px-5 py-2 bg-gray-200 text-center flex items-center justify-center">{ quantity }</span>
      <button onClick={() => onValueChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
