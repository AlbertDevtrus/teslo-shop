'use server';

import { PayPalOrderStatusResponse } from "@/interfaces/paypal.interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async ( transactionID: string ) => {

  const authToken = await getPayPalBearerToken();

  if(!authToken) {
    return {
      ok: false,
      msg: 'No se pudo obtener el token de verificacion'
    }
  }

  const response = await verifyPayPalPayment(transactionID, authToken)

  if(!response) {
    return {
      ok: false,
      msg: 'Error al verificar el pago'
    }
  }

  const { status, purchase_units } = response;

  const { invoice_id: orderID } = purchase_units[0];

  if(status !== 'COMPLETED') {
    return {
      ok: false,
      msg: 'Aun no se ha pagado en PayPal'
    }
  }

  try {
    console.log({status, purchase_units});

    await prisma.order.update({
      where: { id: orderID },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    revalidatePath(`/orders/${orderID}`)

    return {
      ok: true,
      msg: 'Pago realizado correctamente'
    }

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      msg: '500 - El pago no se pudo realizar'
    }
  }


    // const {  } = purchase_units[0];

}

async function getPayPalBearerToken(): Promise<string|null> {

  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const OAUTH_URL = process.env.PAYPAL_OAUTH_URL ?? '';
  
  
  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  }

  try {
    
    const response = await fetch(OAUTH_URL, requestOptions).then(r => r.json());

    return response.access_token;

  } catch (error) {
    console.log(error);
    
    return null;
  }

}

async function verifyPayPalPayment(transactionID: string, bearerToken: string): Promise<PayPalOrderStatusResponse|null> {
  
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionID}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  }

  try {
    const response = await fetch(paypalOrderUrl, requestOptions).then(r => r.json());

    return response;
  } catch (error) {
    console.log(error);
    
    return null;
  }
}