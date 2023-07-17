const { selectOptionFromDropdown } = require('./selectChain')
const { selectToken } = require('./selectToken');

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
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.275 (Edition avast-2021-06-06)');
    await page.goto('http://swap.defillama.com/');

    await page.click('.css-ern9ru');
    await new Promise(resolve => setTimeout(resolve, 3000));

    await selectOptionFromDropdown(page, '.css-ern9ru', 'Arbitrum'); //Chain selection
    
    const buttonXPath1 = '/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/button';
    const buttonXPath2 = '/html/body/div[1]/div/div/div[2]/main/div[2]/div[1]/div[1]/div[2]/div[2]/div[1]/button';
    const inputValue = '.chakra-modal__content-container .css-s1d1f4'; // u need to use query selector nad console log bro
    //*[@id="chakra-modal-:r1j:"]/div[2]/input';
    //.chakra-input .css-s1d1f4';
    //const inputValue = '#chakra-modal-\:r1j\: > div:nth-child(2) > input';
    //const modalXPath = '/html/body/div[7]/div[3]/div';
    await selectToken(page, buttonXPath1, inputValue, 'WBTC');
    await selectToken(page, buttonXPath2, inputValue, 'USDC');
    await page.type(".css-79elbk",'12'); // being written to eth inte saanam, ithum xpath vekkendi avrum
    
    // cater to my usecase
    // await page.waitForNavigation();
    // await page.waitForSelector("#product");
    // await page.click("#product");

await page.screenshot({ path: 'after.png' });
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();