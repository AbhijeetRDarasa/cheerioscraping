require('dotenv').config();
const {scrapeData , scrapeData3 ,scrapeData2} = require('../service/siteScraper')
const { TEXT, XS} = require('../constants/constants')
const TelegramBot = require('node-telegram-bot-api');


console.log(process.env.TELEBOT_TOKEN)
const bot = new TelegramBot(process.env.TELEBOT_TOKEN, {polling: true});

bot.on('message', async (msg) => {
  console.log("you are here !!!")
  const chatId = msg.chat.id;
  const messageText = msg.text;
  let data = ''

  let parseObject = {parse_mode : "HTML"};

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
      data = 'Vui lòng chọn vùng bạn muốn xem kết quả';
          parseObject = {
          reply_markup: {
          inline_keyboard: [
            [{
              text: 'Miền Bắc',
              callback_data: "/xsmb",

            }],
            [{
              text: 'Miền Nam',
              callback_data: '/xsmn'
            }],
            [{
              text: 'Miền Trung',
              callback_data: '/xsmt'
            }],
            [{
              text: 'Huy',
              callback_data: '/huy'
            }]
          ],
        },
      } 
    }
    bot.sendMessage(chatId, data, parseObject )
});

bot.on("callback_query", async (callbackQuery) => {
  console.log("you are here call back !!!")

    const msg = callbackQuery.message;
    let text = callbackQuery.data
    console.log("text", text)
    let data = ''
    if(text === '/xsmt'){
        data = await scrapeData3();
    }
    if(text === '/xsmn'){
        data = await scrapeData2();
    }  
    if(text === '/xsmb'){
        data = await scrapeData();
    }
    if(text === '/huy'){
        data = "Tôi có thể giúp bạn điều gì khác?";
    }
    bot.sendMessage(msg.chat.id, data);
});