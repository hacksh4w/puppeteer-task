const { selectOptionFromDropdown } = require('./selectChain')
const { selectToken } = require('./selectToken');
const { select2ndSwap } = require('./select2ndSwap');
const { checkDivExistence } = require('./divExists');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless : "new" ,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: ['--disable-web-security', '--ignore-certificate-errors'],
    });

    const page = await browser.newPage();

    await page.goto('http://swap.defillama.com/');

    await page.click('.css-ern9ru');
    await new Promise(resolve => setTimeout(resolve, 3000));

    await selectOptionFromDropdown(page, '.css-ern9ru', 'Arbitrum'); //Chain selection
    
    await page.$eval('.css-lv0ed5', (input) => {
      input.value = ''; // Clear the existing value
    }); 
    await page.type('.css-lv0ed5', '12');

    const buttonXPath1 = '/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button';
    const buttonXPath2 = '/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/button';
    const inputValue = '.chakra-modal__content-container .css-s1d1f4'; 
    await selectToken(page, buttonXPath1, inputValue, 'WBTC');
    await selectToken(page, buttonXPath2, inputValue, 'USDC'); 

    // Checking for swap option div
    const divSelector = '.sc-bb167634-2';
    const swapSelector = 'div.sc-d413ea6e-0';
    const divExists = await checkDivExistence(page, divSelector);
    if (divExists) {
      console.log('Swap exists');
      //time delay for all swapping options to be computed
      await new Promise(resolve => setTimeout(resolve, 3000));
      await page.screenshot({ path: 'swapappears.png' });
      //fn to choose 2nd swap option
      await select2ndSwap(page, swapSelector);
    } else {
      console.log('Swap dont exist maboi');
    }
  
    await page.screenshot({ path: 'theend.png' });
    // screen shot to verify if 2nd option is always chosen
    // await new Promise(resolve => setTimeout(resolve, 23000));
    // await page.screenshot({ path: 'justend.png' });
    // await browser.close();
    await new Promise(resolve => {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
  
      process.stdin.on('data', (key) => {
        if (key === ' ') {
          browser.close();
          process.exit(0);
        }
      });
    });
    await page.screenshot({ path: 'justend.png' });
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();