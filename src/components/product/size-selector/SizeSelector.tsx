import type { Size } from "@/interfaces/product.interface";
import clsx from "clsx";

interface Props {
  selectedSize?: Size,
  availableSizes: Size[],

  onSizeChange: ( size: Size ) => void
}

export default function SizeSelector({ availableSizes, selectedSize, onSizeChange }: Props) {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4"> Tallas disponibles </h3>
      <div className="flex">
        {
          availableSizes.map(size => (
            <button 
              key={size}
              onClick={() => onSizeChange(size)}
              className={
                clsx("mx-2 hover:underline text-lg", 
                  {
                    'underline': size === selectedSize
                  }
                )
              }
            >
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}
