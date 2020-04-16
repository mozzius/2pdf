const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

module.exports = async (url) => {
    const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
    });

    const page = await browser.newPage();
    await page.goto(url);
    const file = await page.title();
    await browser.close();
    return file;
}