const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is awake!'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Web server running.'));

// --- CRASH PREVENTION SAFETY NET ---
// This stops the whole program from shutting down if a random lag spike happens
process.on('uncaughtException', (err) => console.log('Caught exception:', err));
process.on('unhandledRejection', (err) => console.log('Unhandled rejection:', err));
// -----------------------------------

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Tecnosense.aternos.me', 
        port: 62972,
        username: 'AFK_Bot_Pro',
        version: false,
        auth: 'offline'
    });

    bot.on('login', () => console.log('Bot joined the server!'));
    
    bot.on('spawn', () => {
        console.log('Bot is in the world! Starting movement.');
        setInterval(() => {
            const randomYaw = Math.random() * Math.PI * 2;
            bot.look(randomYaw, 0, true);
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000); 
    });
    
    // Auto-reconnect with a reason logged
    bot.on('end', (reason) => {
        console.log('Bot disconnected because:', reason);
        console.log('Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });
    
    bot.on('error', err => console.log('Bot Error:', err));
}

createBot();
