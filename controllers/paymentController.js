const Razorpay = require("razorpay");
const cart = require("../models/cart");
const ticket = require("../models/ticket");
const path = require("path");
const { generateQrCode } = require("../utils/generateQrCode");
const { emailController } = require("./emailController");
const QRCode = require("easyqrcodejs-nodejs");
const fs = require("fs");
const getRazorpayKey = (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY });
};

const createOrder = async (req, res) => {
  const { amount, cartItems } = req.body;
  let isDate = true;
  cartItems.some((item) => {
    if (!item.date) {
      isDate = false;
      return;
    }
  });
  if (!isDate) {
    res.status(500).send("Date Not Found");
    return;
  }
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const options = {
      amount: amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const payOrder = async (req, res) => {
  try {
    const {
      amount,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      cartItems,
    } = req.body;
    //
    try {
      const result = await Promise.all(
        cartItems.map(async (item) => {
          // console.log(item, "before");
          let imagePath = item.monumentId.img;
          item.monumentId = item.monumentId._id;
          // console.log(item, "after");
          delete item._id;
          const newTicket = await ticket.create(item);
          // const qr = await generateQrCode(
          //   `https://qr-monument.vercel.app/getTicketDetails/${newTicket._id}`,
          //   path.join("qr_images", imagePath)
          // );
          //
          const background = fs.readFileSync(path.join(__dirname,"../","qr_images", imagePath));
          var options = {
            text: `https://qr-monument.vercel.app/getTicketDetails/${newTicket._id}`,
            width: 360,
            height: 360,
            dotScale: 0.4,
            backgroundImage: background,
            backgroundImageAlpha: 1,
            autoColor: true,
            correctLevel: QRCode.CorrectLevel.H,
            colorDark: "#000000",
            colorLight: "#ffffff",
            dotScaleTiming_H: 0.1,
            dotScaleTiming_V: 0.1,
            quality: 1,
          };
          var qrcode = new QRCode(options);
          qrcode.saveImage({
            path: "./SIH221.JPG", // save path
          });
          qrcode.toDataURL().then(async (data) => {
            const temp = await ticket.updateMany(
              { _id: newTicket._id },
              { qr: data}
            );
            await cart.findOneAndDelete({ userId: item.userId });
            const bookedTicket = await ticket
              .findById(newTicket._id)
              .populate("monumentId")
              .populate("userId");
            emailController(bookedTicket);
          });
        })
          //
      );
      //
      res.send({
        msg: "Payment was successfull",
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { getRazorpayKey, createOrder, payOrder };
