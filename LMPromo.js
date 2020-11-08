/*
MAJOR thank you to Nekiplay for hosting the active codes on his server. Check out his Lords Mobile API!  https://github.com/Nekiplay
*/

//require request
const request = require('request');

//url to check for codes
const url = "https://lordsmobile.fandom.com/wiki/Promotion_Codes";
//needpermission from git owner still
const gitURL = "https://raw.githubusercontent.com/Nekiplay/LordsMobileAPI/master/ServerSide/WorkingPromoCodes.txt"

//require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

//import login token
const auth = require('./auth.json');

// this event will only trigger one time after logging in
// when the client is ready, run this code
client.once('ready', () => {
	console.log('Ready!');
});

function loadData() {
	return jQuery.get(gitURL);
}

client.on('message', message => {
		if(message.content.toLowerCase() == "!promo") {
			request(gitURL, function (error, response, codes) {
			console.log(response && response.statusCode); // Print the response status code if a response was received
			if(error || (response && response.statusCode) != "200")
				message.channel.send("Error reading codes. Please message #neverson42#1672 so I can fix it! Thanks.")
			else
				message.channel.send("Active codes:\n"+codes);
			});
		}
});

// login to Discord with your app's token
client.login(auth.token);
