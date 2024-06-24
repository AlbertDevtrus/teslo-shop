'use client';

import { getStockSlug } from '@/actions';
import { titleFont } from '@/config/fonts'
import { useEffect, useState } from 'react';

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    getStock();

  })

  const getStock = async () => {
    const stock = await getStockSlug({ slug }) ?? 0;
    setStock(stock);
    setIsLoading(false);
  }
  
  return (
    <>
      {
        isLoading ? 
          <h1 className={`${titleFont.className} antialiased font-bold text-xl animate-pulse bg-gray-200 rounded-md`}>
            &nbsp;
          </h1>
        :
          <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
            <span className="font-light">Stock: </span>
            {stock}
          </h1>
      }
    </>
  )
}
