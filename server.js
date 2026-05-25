const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// The mini web server to keep things awake
app.get('/', (req, res) => res.send('Bot is awake!'));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Web server running.'));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'Tecnosense.aternos.me', 
        port: 62972,
        username: 'AFK_Bot_Pro',
        version: false,
        auth: 'offline'
    });

    bot.on('login', () => console.log('Bot joined the server!'));
    
    // --- NEW ANTI-AFK MOVEMENT ---
    bot.on('spawn', () => {
        console.log('Bot is in the world! Starting movement.');
        
        // This timer runs every 30,000 milliseconds (30 seconds)
        setInterval(() => {
            // 1. Look in a random direction
            const randomYaw = Math.random() * Math.PI * 2;
            bot.look(randomYaw, 0, true);
            
            // 2. Press the jump key
            bot.setControlState('jump', true);
            
            // 3. Let go of the jump key after half a second
            setTimeout(() => {
                bot.setControlState('jump', false);
            }, 500);
            
        }, 30000); 
    });
    // -----------------------------
    
    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting in 10 seconds...');
        setTimeout(createBot, 10000);
    });
    
    bot.on('error', err => console.log('Error:', err));
}

createBot();
