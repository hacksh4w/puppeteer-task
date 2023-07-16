const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: ['--disable-web-security', '--ignore-certificate-errors'],
    }); // Launches a headless Chrome browser

    const page = await browser.newPage();

    // Set user agent to replicate Brave on Windows 11
    // Cloudflare easily detects automation/bots used via Puppeteer
    // Simulating the browser behavior for that website helps bypass this problem
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.275 (Edition avast-2021-06-06)');

    await page.goto('http://swap.defillama.com/');
    await page.click('.css-ern9ru')
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: 'Chain dropdown.png' });
    const chainValue = 'Arbitrum';  //Arbitrum One no longer exists  && add error handling if not found
    const sellValue = 10;
    const sellToken = WBTC;
    const buyToken = USDC; //wait for right side element
        // Find the parent div that contains the desired option text
    const parentDiv = await page.$('.css-ern9ru');
    if (parentDiv) {
      // Find the input element within the parent div
      const inputElement = await parentDiv.$('input');

      if (inputElement) {
        // Focus the input element
        await inputElement.focus();
        // Type the option value & Press Enter key to select the option
        await inputElement.type(chainValue);
        await inputElement.press('Enter');

        console.log(`Selected "${chainValue}" from the dropdown.`);
        await page.screenshot({ path: 'Arbitrum.png' });
      } else {
        console.error('Input field not found within the parent div.');
      }
    } else {
      console.error('Parent div with class css-ern9ru not found.');
    }

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
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();


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