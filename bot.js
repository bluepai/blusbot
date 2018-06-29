///////////////
///BOT SETUP///
///////////////

//Discord API
const Discord = require("discord.js"); //Import the Discord API, discord.js.
const client = new Discord.Client(); //Reference the Discord Client.
var fs = require('fs'); //Reference the FS package, pre-installed with json.
const prefix = "/";
const version = "1.2.0"

//Bot Profile
var Status = 'blu go insane'; //What the bot is "doing".
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
  "Of course!",
  "Yep!",
  "As sure as the earth is round.",
  "As sure as the earth is flat.",
  "Yepperino!",
  "You got it!",
  "Can't tell you now.",
  "Don't count on it.",
  "No.",
  "My reply is no.",
  "Outlook bad...",
  "Very doubtful.",
  "Maybe",
  "hm...i don't know.",
  "I don't think so.",
  "I don't think that's possible.",
  "no...",
  "Sorry, i don't believe so.",
  "That's not in the cards.",
  "Don't expect so.",
  "Nope, Sorry.",
  "no ;-;",
];

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

        case "CHANGELOG":
        message.channel.send({embed: {
                color: 0x00BCFF,
                author: {
                  name: "Change Log",
                  icon_url: client.user.avatarURL
                },
                title: "Changes in " + version,
                fields: [{
                    name: "New Features",
                    value: "Added a Changelog Command."
                  },
                  {
                    name: "Bug Fixes",
                    value: "No Bug Fixes."
                  },
                  {
                    name: "Improvements",
                    value: "Made the Embed Messages nicer to the eyes."
                  },
              ],
              timestamp: new Date(),
              footer: {
                icon_url: "https://cdn.discordapp.com/avatars/427214101589131264/5b95b5b151127cee95416d9827258337.png",
                text: "Made by bluepai#9307"
              }
            }});
        break;

        case "HELP":
        message.channel.send({embed: {
                color: 0x00BCFF,
                title: "List of Commands",
                description: "These are the commands. What else do you expect this to say?!",
                fields: [{
                    name: "Main Commands",
                    value: "`/profile` Show your profile stats."
                  },
                  {
                    name: "Fun Commands",
                    value: "`/shop` Go to your local supermarket and buy stuff you'll never use\n`/8ball` ask the magic :8ball: a question.\n`/rate` Ask me to rate your stuff because why not"
                  },
                  {
                    name: "Misc Commands",
                    value: "`/info` Shows bot info.\n`/help` Shows a list of commands.\n`/changelog` Show the changes of the latest update."
                  },
              ],
              footer: {
                icon_url: "https://cdn.discordapp.com/avatars/427214101589131264/5b95b5b151127cee95416d9827258337.png",
                text: "Made by bluepai#9307"
              }
            }});
        break;

        /////////////////
        ///FUN COMMANDS//
        /////////////////

        case "RATE":
          if(args[1]) {
            message.channel.send({embed: {
                    color: 0x00BCFF,
                    title: "Hm...",
                    description: "I rate it a " + (Math.floor(Math.random() * 10)) + "/10!",
                    }});
          }
          else {
            message.channel.send("I dont have anything to rate for you. Try '/rate me'!");
          }
          break;

        case "8BALL":
          if(args[1]) {
            message.channel.send({embed: {
                    color: 0x00BCFF,
                    title: "The Magic :8ball: says:",
                    description: (fortunes[Math.floor(Math.random() * fortunes.length)]),
                    }});
          }
          else {
            message.channel.send("I dont have any questions to answer for you. Try '/8ball Do you like me?'!");
          }
          break;

        ///////////////////
        ///INFO COMMANDS///
        ///////////////////

        case "INFO":
            message.channel.send({embed: {
            color: 0x00BCFF,
            title: "blu's bot",
            fields: [{
                  name: "Version",
                  value: version,
                }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: "https://cdn.discordapp.com/avatars/427214101589131264/5b95b5b151127cee95416d9827258337.png",
              text: "Made by bluepai#9307"
            }
            }});
            break;

        case "PROFILE": //This part of the script will run if the message contains this message.
          message.channel.send({embed: {
                  color: 0x00BCFF,
                  author: {
                    name: sender.username + "'s Profile",
                    icon_url: sender.avatarURL
                  },
                  description: "Messages Sent: **" + userData[sender.id].MessagesSent + "**\nMoney: **" + userData[sender.id].Money + "**",
                  }});
          break;

        ///////////////////
        ///SHOP COMMANDS///
        ///////////////////

        case "SALES":
          message.channel.send({embed: {
                  color: 0x00BCFF,
                  author: {
                    name: "The Shop of the Shops Sales",
                    icon_url: client.user.avatarURL
                  },
                  description: "StarBucks Sales: **" + sales.StarbucksSales + "**\nSubway Sales: **" + sales.SubwaySales + "**",
                  }});
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

            default:
            message.reply("Invalid command. Try '/help' for a list of commands.");
            break;
      }
});
