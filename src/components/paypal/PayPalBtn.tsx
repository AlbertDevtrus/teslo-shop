'use client';

import { paypalCheckPayment, setTransactionId } from '@/actions';
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

interface Props {
  orderID: string;
  amount: number;
}

export const PayPalBtn = ({ amount, orderID }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100

  if( isPending ) {
    return (
      <div className='animate-pulse mb-11'>
        <div className='h-10 bg-gray-300 rounded mb-3'></div>
        <div className='h-10 bg-gray-300 rounded'></div>
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    
    const transactionID = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderID,
          amount: {
            value: roundedAmount.toString(),
            currency_code: 'USD'
          }
        }
      ]
    })

    const { ok, msg } = await setTransactionId(orderID, transactionID);

    if(!ok) {
      throw new Error(msg);
    }

    return transactionID;
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
    console.log('onApprove')

    const details = await actions.order?.capture();
    if( !details ) return;

    await paypalCheckPayment(details.id!);
  }

  return (
    <div className='relative z-0'>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={ onApprove }
      />
    </div>
  )
}
