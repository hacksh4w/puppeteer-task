const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-web-security', '--ignore-certificate-errors']
  }); // Launches a headless Chrome browser
  const page = await browser.newPage();

  // Set user agent to replicate Brave on Windows 11
  // Cloudfare easily detects automation/bots used via Puppteer
  // Simulating the browser behaviour for that website helps bypass this problem
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.275 (Edition avast-2021-06-06)');
  
  await page.goto('http://swap.defillama.com/');
  await new Promise(resolve => setTimeout(resolve, 3000));
  await page.screenshot({ path : 'screenshot.png'})


  await browser.close();

} )();