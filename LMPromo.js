//require request
const request = require('request');
//require file strucure
const fs = require('fs');
//require jsdom
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//url to check for codes
const url = "https://www.mejoress.com/en/lords-mobile-codes/";

//require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

//import login token
const auth = require('./auth.json');

function scrape_codes(data) {
	var doc = new JSDOM(data);
	var scraped_codes = doc.window.document.getElementsByTagName("ul")[6].getElementsByTagName("strong");
	var edit_date = doc.window.document.getElementsByClassName("post-modified-info")[0].innerHTML;
	return scraped_codes[0].innerHTML+"\n"+scraped_codes[1].innerHTML+"\n"+scraped_codes[2].innerHTML+"\n"+edit_date;
}

// this event will only trigger one time after logging in
// when the client is ready, run this code
client.once('ready', () => {
	client.user.setActivity("Listening for !promo");
	console.log('Ready!');
});

client.on('message', message => {
	if(message.content.toLowerCase() == "!promo") {
		request(url, function (error, response, pg_source) {
			if(error || (response && response.statusCode) != "200")
				message.channel.send("Error reading codes. Please message #neverson42#1672 so I can fix it! Thanks.")
			else {
				codes = scrape_codes(pg_source);
				console.log(codes);
				message.channel.send("Active codes:\n"+codes);
			}
		});
	}
});

// login to Discord with your app's token
client.login(auth.token);