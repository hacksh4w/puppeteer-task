const { selectOptionFromDropdown } = require('./selectChainOption')
const { clickButtonByXPath } = require('./clickButtonByXpath');

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
    //const modalXPath = '/html/body/div[7]/div[3]/div';
    //await selectBOptionFromDropdown(page,'.css-1k491an', 'WBTC'); // Sell Token Selection
    //vendannu thonunnu    await page.type("#usernameSignIn", process.env.EXPLARA_EMAIL);
    //await selectBOptionFromDropdown(page,'.css-' , 'WBTC'); // Buy Token Selection
    await clickButtonByXPath(page, buttonXPath1, inputValue, 'WTBC');
    await clickButtonByXPath(page, buttonXPath2, inputValue, 'USDC');
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


    // Repeating process => make this oop & SOLID 
    // Find the option in chain dropdown by its value attribute
 //   const inputSelector = 'input#react-select-2-input';
   // const chainValue = 'Arbitrum One';

    // Click on the input field to focus it
 //   await page.click(inputSelector);
    // Type the option value into the input field
 //   await page.type(inputSelector, chainValue);
    // Wait for the dropdown options to appear
 //   await page.waitForSelector('css-ern9ru', { timeout : 5000 });
    // Click on the first option that matches the value
   // await page.click('css-ern9ru');

 //   console.log(`Selected "${chainValue}" from the dropdown.`);


//  put this write after .gotopage
// Code to deal with cloudfare captchaa
//  page.on('response', async (response) => {
//   const status = response.status();
//   if (status >= 400) {
//     const errorText = await response.text();
//     if (errorText.includes('Attention Required! | Cloudflare')) {
//       // Handle Cloudflare captcha  > Dk what ti put here tho
//       console.log('Cloudflare captcha encountered. Please solve it manually.');
//       // Perform necessary actions to solve the captcha
//     }
//   }
// });