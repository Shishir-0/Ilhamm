const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    // Check Configurator
    const page2 = await browser.newPage();
    page2.on('console', msg => console.log(`[Configurator ${msg.type().toUpperCase()}] ${msg.text()}`));
    page2.on('pageerror', error => console.log(`[Configurator Error] ${error.message}`));
    await page2.goto('http://localhost:5173/configurator.html', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    // Check Showroom
    const page3 = await browser.newPage();
    page3.on('console', msg => console.log(`[Showroom ${msg.type().toUpperCase()}] ${msg.text()}`));
    page3.on('pageerror', error => console.log(`[Showroom Error] ${error.message}`));
    await page3.goto('http://localhost:5173/showroom.html', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    await browser.close();
})();
