const Discord = require("discord.js");
const fs = require('fs');
const client = new Discord.Client({partials: ["MESSAGE","CHANNEL","REACTION"]});

//const scheduledSellsCH = '786260743678066751';  //465903936130383872
//const augenCoin = '1️⃣'; //:augencoins:
//const backUp = '2️⃣'; //:backup:
//const logCH = '786260743678066751'; //786288772069064714

const scheduledSellsCH = '465903936130383872';  //instant sells -> 591839071429722133
const augenCoin = 'augencoins'; //
const backUp = 'backup'; //
const logCH = '786288772069064714'; //

client.once('ready', ()=>{
    console.log("Signups are being tracked");
})

client.on("messageReactionRemove", async (reaction, user) => {
    try {
        await onRemovedReaction(reaction,user);
    }
    catch(ex) {
        logException("Unable to parse removed reaction", ex);
    }
});

client.on("messageReactionAdd", async (reaction, user) => {
    try {
        await onAddedReaction(reaction,user);
    }
    catch(ex) {
        logException("Unable to parse added reaction", ex);
    }
});

function logException(message,exception) {
    let exceptionText = exception;
    if((typeof exception === "object") && (exception !== null)) {
        exceptionText = JSON.stringify(exception);
    }

    console.log(message + ": " + exceptionText);
}

async function onAddedReaction(reaction,user) {
    let emoji = reaction.emoji.name;
    let author = reaction.message.author;
    let reactor = user.username;

    if(reaction.message.content.startsWith('@everyone')){
        if(reaction.message.channel.id = scheduledSellsCH){
            if(reaction.emoji.name === augenCoin){
                client.channels.cache.get(logCH).send(`:augencoins: **${reactor}** signed up for =>|${((reaction.message.content)+" ").slice(9,-1)}`);
            }
            if(emoji === backUp){
                client.channels.cache.get(logCH).send(`:backup: **${reactor}** called backup on =>| ${((reaction.message.content)+" ").slice(9,-1)}`);
            }
        }
    }
    
}

async function onRemovedReaction(reaction,user) {
    let emoji = reaction.emoji.name;
    let author = reaction.message.author;
    let reactor = user.username;

    if(reaction.message.content.startsWith('@everyone')){
        if(reaction.message.channel.id = scheduledSellsCH){
            if(reaction.emoji.name === augenCoin){
                client.channels.cache.get(logCH).send(`${reactor} signed out of =>| ${((reaction.message.content)+" ").slice(9,-1)}`);
            }
            if(emoji === backUp){
                client.channels.cache.get(logCH).send(`${reactor} no longer backups =>| ${((reaction.message.content)+" ").slice(9,-1)}`);
            }
        }
    }
    
}
client.login('Nzg2MjU1OTI5MTA4MjAxNDky.X9Dv5Q.5Bre48ZZyIuAfB5CxAB0bJ1sAkI');