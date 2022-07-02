const nMailer = require('nodemailer');

let transporter = nMailer.createTransport({
	sendmail: true,
	newline: 'unix',
	path: '/usr/sbin/sendmail',
	/*secure: true,
	dkim: {
		domainName: 'test.com',
		keySelector: 'default', // The key you used in your DKIM TXT DNS Record
		privateKey: key, // Content of you private key
	}*/
});
console.log('JUSTE avant send mail');
const mailer = transporter.sendMail({
	to: 'devonthefloor@free.fr',
	from: '"Name" <contact@piecederecup.fr>', // Make sure you don't forget the < > brackets
	subject: 'Testing a mail with Nodemailer',
	text: 'Ho oui ça va être beau, j\'ai encore rien foutu!!', // Optional, but recommended
	html: '<h1>Test depuis node</h1><br /><p>Etes vous content de votre équipement?</p>', // Optional
})
console.log('juste apres SEND mail');

module.exports = mailer;