import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
  }
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;
  let productsIds;
  let uniqueIds;
  let productsInfo;
  let line_items = [];
  if (cartProducts.length > 0) {
    await mongooseConnect();
    productsIds = cartProducts;
    uniqueIds = [...new Set(productsIds)];
    productsInfo = await Product.find({ _id: uniqueIds });
    for (const productId of uniqueIds) {
      const productInfo = productsInfo.find(
        (product) => product._id.toString() === productId
      );
      const quantity =
        productsIds.filter((id) => id === productId)?.length || 0;
      if (quantity > 0 && productInfo) {
        line_items.push({
          quantity,
          price_data: {
            currency: "USD",
            product_data: { name: productInfo.title },
            unit_amount: quantity * productInfo.price * 100,
          },
        });
      }
    }
    const orderDoc = await Order.create({
      line_items,
      name,
      city,
      email,
      postalCode,
      streetAddress,
      country,
      paid: false,
    });

    //! STRIPE
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      customer_email: email,
      success_url: process.env.PUBLIC_URL + "/cart?success=1",
      cancel_url: process.env.PUBLIC_URL + "/cart?cancelled=1",
      metadata: { orderId: orderDoc._id.toString() },
    });
    res.json({ url: session.url });
  }
}
