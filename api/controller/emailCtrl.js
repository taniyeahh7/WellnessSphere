const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

// Function to send emails
const sendMail = asyncHandler(async (data, req, res) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: process.env.MAIL_ID,
			pass: process.env.MAIL_PASSWORD,
		},
	});
	async function main() {
		// Send mail with defined transport object
		let info = await transporter.sendMail({
			from: '"Hey 👻" <abc@gmail.com>', // sender address
			to: data.to, // list of receivers
			subject: data.subject, // Subject line
			text: data.text, // plain text body
			html: data.htm, // html body
		});
		console.log("Message sent: %s", info.messageId);
	}
	// Call the main function to send the email
	await main();
});

module.exports = sendMail;
