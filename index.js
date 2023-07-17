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
    const inputValue = '.chakra-modal__content-container .css-s1d1f4'; // u need to use query selector nad console log bro
    //*[@id="chakra-modal-:r1j:"]/div[2]/input';
    //.chakra-input .css-s1d1f4';
    //const inputValue = '#chakra-modal-\:r1j\: > div:nth-child(2) > input';
    //const modalXPath = '/html/body/div[7]/div[3]/div';
    await selectToken(page, buttonXPath1, inputValue, 'WBTC');
    await selectToken(page, buttonXPath2, inputValue, 'USDC'); //it's clicking on USDC.e not USDC (search and compare vendi varum)
   
    
    // cater to my usecase
    // const navigationPromise = page.waitForNavigation();  //best practice
    // await page.waitForSelector("#product");
    // await page.click("#product");
    //await new Promise(resolve => setTimeout(resolve, 3000));
    const divSelector = '.sc-bb167634-2';
    const divExists = await checkDivExistence(page, divSelector);
    if (divExists) {
      console.log('Swap exists');
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.screenshot({ path: 'swapappears.png' });
      try { await select2ndSwap(page, divSelector);
      } catch(err) {
        console.log("2ndswap issue", err);
      }
    } else {
      console.log('Swap dont exist maboi');
    }
   
    await page.screenshot({ path: 'theend.png' });
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();