const express = require('express');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3005;

// Create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'JasonPriskoLugia@gmail.com',
        pass: 'klnp tbgt mmrw yzjl'
    }
});

app.get('/', async (_, res) => {
    try {
        // Read the HTML file and compile it with Handlebars
        const source = fs.readFileSync('preview.html', 'utf-8');
        const template = handlebars.compile(source);

        // Define the replacements object with username and text
        const replacements = {
            username: 'Nikolas', // Replace this with the actual username dynamically
            text: 'We hope this email finds you well! At [Your Company Name], we are always striving to bring you the best products and services. We have some exciting updates and exclusive offers that we can’t wait to share with you.',
            text2: '1. New Product Launches: We are thrilled to introduce our latest products, designed with you in mind. Check out our new arrivals and find your next favorite item.  2. Exclusive Summer Sale: Enjoy up to 50% off on selected items during our Summer Sale. This is a limited-time offer, so don’t miss out on these fantastic deals.',
            text3: 'Special Offer Just for You: As a token of our appreciation, we’re giving you an exclusive discount. Use the code THANKYOU20 at checkout to get 20% off your next purchase. This offer is valid until [Expiration Date]. Thank you for being a valued member of the [Your Company Name] community. We look forward to continuing to serve you.'
        };


        // Render the template with the replacements
        const htmlToSend = template(replacements);

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'JPriskomatis@gmail.com',
            to: 'JasonPriskoLugia@gmail.com',
            subject: 'Hello',
            text: 'Test text',
            html: htmlToSend
        });

        console.log("Message sent: %s", info.messageId);
        res.send('Email sent');
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).send('Error sending email');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
