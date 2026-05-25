const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is awake!'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Web server running.'));

process.on('uncaughtException', (err) => console.log('Caught exception:', err));
process.on('unhandledRejection', (err) => console.log('Unhandled rejection:', err));

function createBot() {
    const bot = mineflayer.createBot({
        // Make sure this host and port match the CURRENT DynIP on Aternos!
        host: 'batray.aternos.host', 
        port: 62972,
        username: 'AFK_Bot_Pro',
        auth: 'offline',
        
        // The magic fix for your specific server
        version: '1.12.1' 
    });

    bot.on('login', () => console.log('✅ Bot successfully joined the server!'));
    
    bot.on('spawn', () => {
        console.log('Bot is in the world! Starting random movement.');
        setInterval(() => {
            const randomYaw = Math.random() * Math.PI * 2;
            bot.look(randomYaw, 0, true);
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000); 
    });
    
    bot.on('end', (reason) => {
        console.log('Bot disconnected because:', reason);
        console.log('Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });
    
    bot.on('error', err => console.log('Bot Error:', err));
}

createBot();
