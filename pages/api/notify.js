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
      console.log({ payment }, { paymentStatus });
    }
  } catch (error) {
    res.send(error);
  }
}
