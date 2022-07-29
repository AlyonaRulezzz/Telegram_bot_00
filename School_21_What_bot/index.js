const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5529886412:AAFt6V2h9jZtrPJcM7vI-uDurXu9vk1ldhg'

const bot = new TelegramApi(token, {polling: true})

const chats = {}

const startGame = async (chatId) => {
        await bot.sendMessage(chatId, 'Я загадаю цифру от 0 до 9, а ты угадай её!)');
        const randomNumber = Math.floor(Math.random() * 10)
        chats[chatId] = randomNumber;
        await bot.sendMessage(chatId, 'Отгадывай ;)', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Угадай цифру'}
     ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const user_name = msg.from.first_name;
        if (text === '/start') {
            console.log('Start');
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/306/6e2/3066e228-42a5-31a3-8507-cf303d3e7afe/1.webp');
            return bot.sendMessage(chatId, 'Добро пожаловать, ' + user_name + '!');
        }
        if (text === '/info') {
            await bot.sendSticker(chatId,'https://tlgrm.ru/_/stickers/306/6e2/3066e228-42a5-31a3-8507-cf303d3e7afe/2.webp');
            return bot.sendMessage(chatId, 'Тебя зовут ' + user_name + ')');
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/306/6e2/3066e228-42a5-31a3-8507-cf303d3e7afe/5.webp');
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй ещё раз...');
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data != chats[chatId]) {
            console.log(data + ' ' + chats[chatId])
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/306/6e2/3066e228-42a5-31a3-8507-cf303d3e7afe/12.webp')
            return bot.sendMessage(chatId, 'К сожалению, ты не угадал, это была цифра ' + chats[chatId], againOptions)
            
        } else {
            console.log('зашёл')
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/306/6e2/3066e228-42a5-31a3-8507-cf303d3e7afe/256/6.webp')
            return bot.sendMessage(chatId, 'Поздравляю, ты отгадал цифру!)', againOptions)
        }
    })
}

start()


//  Как добавить гифку???
    // bot.sendMessage(chatId, 'Ты написал мне ' + text);
    // bot.send_document(chatId, 'https://i.gifer.com/fxVE.gif');
    // bot.send_video(message.chat.id, 'https://i.gifer.com/fxVE.gif', None, 'Text');