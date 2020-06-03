//Dependencies:
//yarn add express cors twilio

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

//twilio requirements -- Texting API
const accountSid = 'AC1f56a3ffe3dfafc84f69ff2413193eaf';
const authToken = '1aefd9bd8b5aab9822ba2b44c283ef0e';
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server
app.get('/', (req, res) => {
	res.send('Welcome to the Express Server');
});

//Twilio
app.get('/send-text', (req, res) => {
	//Welcome Message
	res.send('Hello to the Twilio Server');

	//_GET Variables
	const { recipient, textmessage } = req.query;

	//Send Text
	client.messages
		.create({
			body: textmessage,
			to: '+47' + recipient, // Text this number
			from: '+12055515383', // From a valid Twilio number
		})
		.then((message) => console.log(message.body));
});

app.listen(4000, () => console.log('Running on Port 4000'));
