import midtrans from "midtrans-client";
import { NextRequest, NextResponse } from "next/server";

const snap = new midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
});

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, price } = await req.json();

  try {
    const parameter = {
      transaction_details: {
        order_id: crypto.randomUUID(),
        gross_amount: price,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      success: true,
      transaction_token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.log(error);
    NextResponse.json({
      success: false,
      error: "Failed to create payment",
    });
  }
}
