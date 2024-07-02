'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export const PayPalBtn = () => {

  const [{ isPending }] = usePayPalScriptReducer();

  if( isPending ) {
    return (
      <div className='animate-pulse mb-11'>
        <div className='h-10 bg-gray-300 rounded mb-3'></div>
        <div className='h-10 bg-gray-300 rounded'></div>
      </div>
    )
  }

  return (
    <PayPalButtons />
  )
}
