
const {scrapeData , scrapeData3 ,scrapeData2} = require('./siteScraper')
const { TEXT, XS} = require('./constants')
const TelegramBot = require('node-telegram-bot-api');
const token = "6451873393:AAGO9cdNgpbOB-_KfpbknOn0MRdYBsOnQgk"

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  let data = ''
  if(messageText === '/xsmt'){
      data = await scrapeData3();
  }
  if(messageText === '/xsmn'){
      data = await scrapeData2();
  }  
  if(messageText === '/xsmb'){
      data = await scrapeData();
  } 
  if(messageText === '/start'){
      data = TEXT;
  } 
  if(messageText === '/xs'){
      data = XS;
  } 
bot.sendMessage(chatId, data, {parse_mode : "HTML"});
});