import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log(req.body.products);
    const {
      name,
      email,
      postalCode,
      streetAddress,
      country,
      city,
      cartProducts,
    } = req.body.products;
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
            title: productInfo.title,
            currency_id: "ARS",
            unit_price: productInfo.price,
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
      // console.log("ItemsMP", line_items);
      console.log("orderId: ", orderDoc._id.toString());

      const preference = {
        items: line_items,
        payer: {
          name: name,
          email: email,
          address: {
            country: country,
            city: city,
            street_name: streetAddress,
            zip_code: postalCode,
          },
        },
        metadata: { orderId: orderDoc._id.toString() },
        back_urls: {
          success: `${process.env.PUBLIC_URL}/cart`,
          failure: `${process.env.PUBLIC_URL}/cart`,
        },
        payment_methods: {
          excluded_payment_types: [
            {
              id: "ticket",
            },
            // {
            //   id: "credit_card",
            // },
          ],
          default_payment_method_id: "account_money",
        },
        auto_return: "approved",
        notification_url: `${process.env.PUBLIC_URL}/api/notify`,
      };
      const result = await mercadopago.preferences.create(preference);
      res.status(200).json({ url: result.body.init_point });
    } else {
      res.status(400).json({ message: "There are no items" });
    }
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
}
