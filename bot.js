///////////////
///BOT SETUP///
///////////////

//Discord API
const Discord = require("discord.js"); //Import the Discord API, discord.js.
const client = new Discord.Client(); //Reference the Discord Client.
var fs = require('fs'); //Reference the FS package, pre-installed with json.

//Bot Profile
var Status = 'spongebob 24/7 livestreams'; //What the bot is "doing".
var StatusType = 3; //Current status type = 3. (Watching). (Types: 1 = playing, 2 = streaming, 3 = watching.)
var ProfileState = 'dnd'; //The current profile state is Do Not Disturb.
var Token = 'NDQ5MjQ3Mzg0MTgzMjQyNzUy.Deh8Sg.HqZ9X8p8sp4611UdS8gE-52NceQ';

//Score System
var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8')); //Parse the user data using FS Json.

//Shop
var sales = JSON.parse(fs.readFileSync('Storage/sales.json', 'utf8')); //Parse the sales data using FS Json.
var ShopInUse = false;
var CurrentCustomer = '';

//Shop Prices
var StarbucksPrice = 7;
var SubwayPrice = 10;

//Fortune Teller
var fortunes = [
  "Yes!",
  "It is certain.",
  "Without a doubt",
  "You may rely on it.",
  "Seemingly, yes.",
  "Outlook good.",
  "Signs point to yes.",
  "Take a wild guess...",
  "Concentrate and ask again",
  "Do you think so?",
  "Can't tell you now.",
  "Don't count on it.",
  "No.",
  "My reply is no.",
  "My sources say no.",
  "Outlook bad...",
  "Very doubtful.",
  "Maybe",
  "hm...i don't know.",
  "You got me pondering.",
  "I don't think so.",
  "I don't think that's possible.",
  "no...",
  "Sorry, i don't believe so.",
  "That's not in the cards.",
  "Don't expect so.",
  "Please no",
  "Nope, Sorry.",
  "oof, no",
  "no ;-;",
  "I honestly think Yuka Simulator is the best game ever either way.",
  "Yesu Desu",
  "Of course!",
  "Yep!",
  "As sure as the earth is round.",
  "As sure as the earth is flat.",
  "Yepperino!",
  "YEEE",
  "yeeee boiiiiiiiii",
  "yeee gurrrrrrl",
  "You got it!",
];

//Flip a Coin
var CoinSides = [
  "Heads",
  "Tails",
  "Heads",
  "Tails",
  "Heads",
  "Tails",
  "Heads",
  "Tails",
  "Heads",
  "Tails",
  "Heads",
  "Tails",
  "Heads",
  "Tails",
];

//Roll a DICE
var DiceNumbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
];

//COMMANDS
const prefix = "/";
const version = "1.0.3"

//Apply the Settings
client.login(Token); //Log in on the bot client.

client.on('ready', () => { //These commands will run when the bot has logged in.
    console.log("Setting Profile...");
    client.user.setPresence({ game: { name: Status, type: StatusType } }); //Set the playing state to the defined settings.
    client.user.setStatus(ProfileState); //Set the status to the defined setting.
    console.log("bot.js is now ready and running.")
})

//////////////
///COMMANDS///
//////////////

client.on('message', function(message) { //This command runs every time when a message is sent.

    //Message Info Variables
    var sender = message.author; //Defines the author of the message.
    var msg = message.content.toUpperCase(); //Takes the message, and makes it uppercase to make it easier to read.
    if(sender.id === '449247384183242752') return;
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");


    if(!userData[sender.id]) userData[sender.id] = { //Checks if the writer has a profile.
      MessagesSent: 0, //Create a profile, with MessagesSent on 0.
      Money: 50 //The amount of money the player has at the start.
    };

      userData[sender.id].MessagesSent++; //Increase the messages sent for that user.

    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => { //
       if(err) console.log(err); //If a error occurs, show it to the console.
    });

    switch (args[0].toUpperCase()) { //Check if the given command is in the list somewhere.

        /////////////////
        ///FUN COMMANDS//
        /////////////////

        case "8BALL":
          if(args[1]) {
            message.channel.send({embed: {
                    color: 0xf50107,
                    title: "The Magic :8ball: says:",
                    description: (fortunes[Math.floor(Math.random() * fortunes.length)]),
                    }});
          }
          else {
            message.channel.send("Oof, that's not how to 8 ball... Try: /8ball <question>");
          }
          break;

          case "DICE":
          message.reply("You roll a dice... The dice landed on side " + DiceNumbers[Math.floor(Math.random()) * DiceNumbers.length] + "!");
          break;

          case "COIN":
          message.reply("You flip a coin... " + CoinSides[Math.floor(Math.random()) * CoinSides.length] + "!");
          break;


        ///////////////////
        ///INFO COMMANDS///
        ///////////////////

        case "INFO":
            message.channel.send({embed: {
            color: 0xf50107,
            title: "blu's bot",
            description: "Version " + version
            }});
            break;

        case "STATS": //This part of the script will run if the message contains this message.
          message.reply("your stats: \nMessages Sent: **" + userData[sender.id].MessagesSent + "**\nMoney: **" + userData[sender.id].Money + "**"); //Reply to the user running the command with the following message.
          break;

        ///////////////////
        ///SHOP COMMANDS///
        ///////////////////

        case "SALES":
          message.channel.send("Sales:\nStarBucks Sales: **" + sales.StarbucksSales + "**\nSubway Sales: **" + sales.SubwaySales + "**");
          break;

        case "SHOP": //This part of the script will run if the message contains this message.
          if(ShopInUse == true) {
            return;
          }
          CurrentCustomer = sender.id; //Set the Current Customer to the ID of the sender, so we can't interrupt each other.
          ShopInUse = true; //Set the Shop In Use to true, so no one can use the shop anymore.
          message.reply("Welcome to the shop of the shops! How can i help you? :3\n\nType **'.starbucks'** to buy some supah hot StarBucks. :coffee:\n\nType **'.subway'** to buy some tasty Subway! :french_bread:");
          break;

        case "STARBUCKS": //This part of the script will run if the message contains this message.
          if((ShopInUse) && sender.id === CurrentCustomer) { //Check if the shop is in use, and if the current customer is the sender.
            if(userData[sender.id].Money >= StarbucksPrice) { //Okay, now we want to check if the sender has enough money.
                userData[sender.id].Money --- StarbucksPrice;
                sales.StarbucksSales += 1;
                fs.writeFile('Storage/sales.json', JSON.stringify(sales), (err) => { //
                   if(err) console.error(err); //If a error occurs, show it to the console.
                });
                ShopInUse = false;
                CurrentCustomer = "";
                message.reply("Here's your coffee! :coffee: Enjoy!\n*Your current balance is " + userData[sender.id].Money + ".*"); //If so, buy the product.
            }
            else {
              ShopInUse = false;
              CurrentCustomer = "";
              message.reply("Sorry, you don't have enough money to buy this product. You have " + userData[sender.id].Money + " Unicoins.");
            }
          }
          else if(ShopInUse && sender.id != CurrentCustomer) { //If someone is interupting,
            message.reply("Sorry, someone else is currently ordering Subway."); //Deny the order.
          }
          else {
            //Do nothing, retard
          }
          break;

          case "SUBWAY": //This part of the script will run if the message contains this message.
            if((ShopInUse) && sender.id === CurrentCustomer) { //Check if the shop is in use, and if the current customer is the sender.
              if(userData[sender.id].Money >= SubwayPrice) { //Okay, now we want to check if the sender has enough money.
                  userData[sender.id].Money --- SubwayPrice;
                  sales.SubwaySales += 1;
                  fs.writeFile('Storage/sales.json', JSON.stringify(sales), (err) => { //
                     if(err) console.error(err); //If a error occurs, show it to the console.
                  });
                  ShopInUse = false;
                  CurrentCustomer = "";
                  message.reply("Here's your Subway! :french_bread: Enjoy!\n*Your current balance is " + userData[sender.id].Money + ".*"); //If so, buy the product.
              }
              else {
                ShopInUse = false;
                CurrentCustomer = "";
                message.reply("Sorry, you don't have enough money to buy this product. You have " + userData[sender.id].Money + " Unicoins.");
              }
            }
            else if(ShopInUse && sender.id != CurrentCustomer) { //If someone is interupting,
              message.reply("Sorry, someone else is currently ordering Subway."); //Deny the order.
            }
            else {
              //Do nothing, retard
            }
            break;
      }
});
