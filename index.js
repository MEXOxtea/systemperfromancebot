const TelegramBot = require('node-telegram-bot-api');
const os = require('os');

// Replace with your Telegram bot token
const token = '7541625467:AAF6eiXRCK97Csj_n44-YRWXHtSmm9W7JpQ';

// Create a bot that uses 'polling' to fetch new updates
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

// Listen for any kind of message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Perform the performance test
    const result = performanceTest();

    // Send the result back to the user
    bot.sendMessage(chatId, result);
});
