const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// 1. Web server to keep Render awake
app.get('/', (req, res) => res.send('Bot is awake!'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Web server running.'));

// 2. Crash Prevention Safety Net
process.on('uncaughtException', (err) => console.log('Caught exception:', err));
process.on('unhandledRejection', (err) => console.log('Unhandled rejection:', err));

// 3. The Minecraft Bot
function createBot() {
    const bot = mineflayer.createBot({
        host: 'batray.aternos.host:62972', 
        port: 62972,
        username: 'AFK_Bot_Pro',
        auth: 'offline',
        
        // ---> CHANGE THIS TO YOUR EXACT MINECRAFT VERSION <---
        // Keep the quote marks around the numbers!
        version: '1.20.4' 
    });

    bot.on('login', () => console.log('✅ Bot successfully joined the server!'));
    
    // Anti-AFK Movement
    bot.on('spawn', () => {
        console.log('Bot is in the world! Starting random movement.');
        setInterval(() => {
            const randomYaw = Math.random() * Math.PI * 2;
            bot.look(randomYaw, 0, true);
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000); 
    });
    
    // Auto-Reconnect
    bot.on('end', (reason) => {
        console.log('Bot disconnected because:', reason);
        console.log('Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });
    
    bot.on('error', err => console.log('Bot Error:', err));
}

createBot();
