const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (socket) => {
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath: process.env.NODE_ENV === 'production'
            ? process.env.PUPPETEER_EXECUTABLE_PATH
            : puppeteer.executablePath(),
    });

    try {
        const page = await browser.newPage();
        // Example URL where QR code is located. Adjust this to your actual URL.
        await page.goto('http://localhost:3002');

        // Wait for the QR code element to be visible and get its value
        await page.waitForSelector('.qr-code-selector'); // Adjust the selector accordingly
        const qrCode = await page.$eval('.qr-code-selector', el => el.src); // Adjust to get the actual QR code

        console.log('QR Code:', qrCode);

        // Emit the QR code to the client
        socket.emit('qr', { qr: qrCode });

    } catch (e) {
        console.error(e);
        socket.emit('qr', { qr: `Something went wrong while running Puppeteer: ${e}` });
    } finally {
        await browser.close();
    }
};

module.exports = { scrapeLogic };
