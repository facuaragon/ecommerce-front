import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  const { query } = req;

  const topic = query.topic || query.type;
  console.log({ query }, { topic });
  try {
    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];
      let payment = await mercadopago.payment.findById(Number(paymentId));
      let paymentStatus = payment.body.status;
      const { order_id } = payment.body.metadata;
      console.log({ payment }, { paymentStatus });
      if (paymentStatus === "approved" && order_id) {
        await mongooseConnect();
        const orderUpdate = await Order.findByIdAndUpdate(
          { _id: order_id },
          { paid: true }
        );
        if (orderUpdate) {
          res.status(200).json({ order: order_id, paid: true });
        } else {
          res.status(400).json({ message: "order not paid" });
        }
      }
    } else {
      res.status(400).json({ message: "order not paid" });
    }
  } catch (error) {
    res.send(error);
  }
}
