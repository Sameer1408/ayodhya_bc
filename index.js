const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 4000;

// Twilio credentials (replace with your own values)
const accountSid = 'AC009df215df394c2795026d805d3d4177';
const authToken = '7aeebce7f62857c844f3309b84c00f41';
const twilioPhoneNumber = '+16592177887';

const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

// CORS middleware to allow requests from any origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// API endpoint to send OTP
app.post('/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(phoneNumber,"phonenumber");
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via Twilio SMS
    // await client.messages.create({
    //   body: `Your OTP is: ${otp}`,
    //   from: twilioPhoneNumber,
    //   to: '+91'+phoneNumber
    // });

    res.status(200).json({ success: true, message: 'OTP sent successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});