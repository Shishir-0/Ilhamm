const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => {
        console.log(`[Browser Console ${msg.type().toUpperCase()}] ${msg.text()}`);
    });

    page.on('pageerror', error => {
        console.log(`[Browser PageError] ${error.message}`);
    });

    console.log("Navigating to http://localhost:5173/");
    try {
        await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2', timeout: 10000 });
    } catch (e) {
        console.error("Navigation error: ", e.message);
    }
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
})();
