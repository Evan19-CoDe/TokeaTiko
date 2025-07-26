const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const paymentController = require('../controllers/payments');
const auth = require('../middleware/auth');

// @route   POST /api/payments/stripe
// @desc    Process Stripe payment
// @access  Private
// router.post(
//   '/stripe',
//   [
//     auth,
//     [
//       check('amount', 'Amount is required').isNumeric(),
//       check('token', 'Token is required').not().isEmpty(),
//       check('orderId', 'Order ID is required').not().isEmpty()
//     ]
//   ],
//   paymentController.processStripePayment
// );

// @route   POST /api/payments/mpesa
// @desc    Process M-Pesa payment
// @access  Private
router.post(
  '/mpesa',
  [
    auth,
    [
      check('phone', 'Phone number is required').not().isEmpty(),
      check('amount', 'Amount is required').isNumeric(),
      check('orderId', 'Order ID is required').not().isEmpty()
    ]
  ],
  paymentController.processMpesaPayment
);

// @route   GET /api/payments/callback
// @desc    M-Pesa payment callback
// @access  Public
router.get('/callback', paymentController.mpesaCallback);

module.exports = router;