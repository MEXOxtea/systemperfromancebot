const fs = require('fs');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

// Replace with your Telegram bot token
const token = '7541625467:AAF6eiXRCK97Csj_n44-YRWXHtSmm9W7JpQ';
const bot = new TelegramBot(token, { polling: true });

// Function to perform a simple performance test
const performanceTest = () => {
    const start = process.hrtime.bigint();
    
    // Example performance test: calculate primes
    const calculatePrimes = (limit) => {
        let primes = [];
        for (let i = 2; i <= limit; i++) {
            let isPrime = true;
            for (let j = 2; j < i; j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) primes.push(i);
        }
        return primes;
    };

    // Run the test
    const primes = calculatePrimes(10000);
    const end = process.hrtime.bigint();
    const duration = (end - start) / 1000000n; // convert to milliseconds

    return `Performance Test Completed!\nPrimes Calculated: ${primes.length}\nTime Taken: ${duration} ms\nCPU Cores: ${os.cpus().length}\nFree Memory: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB\nTotal Memory: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`;
};

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const update = req.body;

            if (update.message && update.message.chat && update.message.chat.id) {
                const chatId = update.message.chat.id;
                const result = performanceTest();

                // Send the result back to the user
                await bot.sendMessage(chatId, result);
                res.status(200).send('OK');
            } else {
                res.status(400).send('Invalid message format');
            }
        } catch (error) {
            console.error('Error processing webhook:', error);
            res.status(500).send('Internal Server Error');
        }
    } else if (req.method === 'GET') {
        try {
            // Serve the simple webpage
            const filePath = path.join(__dirname, '../index.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error loading page:', err);
                    res.status(500).send('Error loading page');
                } else {
                    res.status(200).send(data);
                }
            });
        } catch (error) {
            console.error('Error serving webpage:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(404).send('Not Found');
    }
};

bot.onText(/\/admin (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const address = match[1]; // Extract the name from the command
    const userId = msg.from.id.toString();
    // Log the name to the console
    bot.sendMessage(chatId, `Hello`)
});

console.log('bot started');
