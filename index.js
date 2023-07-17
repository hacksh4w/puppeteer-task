const { selectDropdownOption } = require('./selectChain')
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

    // Click the chain div to open dropdown
    await page.click('.css-ern9ru');
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Select Chain as Arbitrum
    await selectDropdownOption(page, '.css-ern9ru', 'Arbitrum'); 
    
    // Enter '12' as number of Tokens to Sell
    await page.$eval('.css-lv0ed5', (input) => {
      // Clear the existing value
      input.value = ''; 
    }); 
    // 12 inputed
    await page.type('.css-lv0ed5', '12');

    // Setting Button Xpaths and input selector for choosing Token Kind to swap
    const buttonXPath1 = '/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button';   // XPath of selling token
    const buttonXPath2 = '/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/button';   // XPath of buying token
    const inputValue = '.chakra-modal__content-container .css-s1d1f4'; 
    await selectToken(page, buttonXPath1, inputValue, 'WBTC'); // Sell Token
    await selectToken(page, buttonXPath2, inputValue, 'USDC'); // Buy Token

    // Checking for existence of div for the swap option
    const divSelector = '.sc-bb167634-2'; // Parent div
    const swapSelector = 'div.sc-d413ea6e-0'; // Selector of result divs
    const divExists = await checkDivExistence(page, divSelector);
    if (divExists) {
      console.log('Swap exists');
      //time delay for all swapping options to be computed
      await new Promise(resolve => setTimeout(resolve, 3000));
      // await page.screenshot({ path: 'imgchecks/swapappears.png' });
      //fn to choose 2nd swap option
      await select2ndSwap(page, swapSelector);
    } else {
      console.log('Swap dont exist maboi');
    }
  
    // await page.screenshot({ path: 'imgchecks/End.png' });
    // screen shot to verify if 2nd option is always chosen
    // await new Promise(resolve => setTimeout(resolve, 23000));
    // await page.screenshot({ path: 'imgchecks/justend.png' }); 
    // await browser.close();
    
    // RUn browser instance even after filling form; terminate on pressing 'Space bar' key
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
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();