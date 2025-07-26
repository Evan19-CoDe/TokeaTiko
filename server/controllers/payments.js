// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Mpesa = require('mpesa-node').Mpesa;
const Order = require('../models/Order');

const mpesa = new Mpesa({
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  environment: 'sandbox' // or 'production'
});

// @desc    Process Stripe payment
// @route   POST /api/payments/stripe
// @access  Private
// exports.processStripePayment = async (req, res) => {
//   const { amount, token, orderId } = req.body;

//   try {
//     const charge = await stripe.charges.create({
//       amount: Math.round(amount * 100), // Convert to cents
//       currency: 'usd',
//       source: token,
//       description: `Payment for order ${orderId}`
//     });

//     await Order.findByIdAndUpdate(orderId, {
//       paymentStatus: 'paid',
//       paymentMethod: 'stripe',
//       paymentId: charge.id
//     });

//     res.json({ success: true, charge });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// @desc    Process M-Pesa payment
// @route   POST /api/payments/mpesa
// @access  Private
exports.processMpesaPayment = async (req, res) => {
  const { phone, amount, orderId } = req.body;

  try {
    const response = await mpesa.lipaNaMpesaOnline({
      BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_BUSINESS_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: `TICKET-${orderId}`,
      passKey: process.env.MPESA_PASSKEY,
      TransactionType: 'CustomerPayBillOnline',
      TransactionDesc: 'Event Ticket Purchase'
    });

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'pending',
      paymentMethod: 'mpesa',
      paymentRequest: response
    });

    res.json({ success: true, response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};