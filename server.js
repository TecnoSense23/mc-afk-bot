const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. This mini web server keeps the free hosting awake
app.get('/', (req, res) => res.send('Bot is awake!'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Web server running.'));

// 2. This creates the Minecraft bot
function createBot() {
    const bot = mineflayer.createBot({
        host: 'Tecnosense.aternos.me', 
        port: 62972,            // Leave as 25565 unless your server provides a specific port
        username: 'AFK_Bot_Pro',
        version: false,         // Auto-detects your server's Minecraft version
        auth: 'offline'         // Essential so it doesn't ask for a Microsoft login
    });

    bot.on('login', () => console.log('Bot joined the server!'));
    
    // If the server kicks the bot or restarts, it will try again in 10 seconds
    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });
    
    bot.on('error', err => console.log('Error:', err));
}

createBot();
