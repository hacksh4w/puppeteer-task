const checkModalExistence = require('./checkModalExistence');

async function clickButtonByXPath(page, buttonXPath, inputValue, optionValue) {
  try {
    await page.waitForXPath(buttonXPath);
    const buttonElement = await page.$x(buttonXPath);
    if (buttonElement.length > 0) {     //if components are being selected by nth child, dont use .length, if not use  .length to
      await buttonElement[0].click();
      console.log(`Clicked on the button.`);
      await page.screenshot({ path: 'button.png' });

      const modalSelector = '.chakra-modal__content-container';
      const modalExists = await checkModalExistence(page, modalSelector);

      if (modalExists) {
        console.log('Modal element exists.');
        await page.screenshot({ path: 'modalvanne.png' });
        await page.waitForSelector(modalSelector,  { visible: true } );
        const modalElement = await page.$(modalSelector);
        if (modalElement) {
          //  await page.waitForNavigation();
          page.waitForSelector('input', { timeout : '3000' } ); 
          const inputElement = await modalElement.$('input');
            if (inputElement) {
                await inputElement.focus();
                console.log(`Element focused.`);
                await inputElement.type(optionValue);
                await page.screenshot({ path: 'typemodal.png' });
                console.log('Written');
                await inputElement.press('Enter');  // its not clicking the first result =>sc-b49748d5-3 cjxQGj
                await page.screenshot({ path: 'entermodal.png' });
                console.log(`Selected "${optionValue}" from the dropdown.`);
                await page.screenshot({ path: `${optionValue}.png` });
            } else {
                console.error(`Input element not found within the modal.`);
            }
            } else {
            console.error(`Modal element not found for selector: ${modalSelector}`);
            }
      } else {
        console.error(`Modal element does not exist.`);
      } 
    } else {
        console.error(`Button element not found for XPath: ${buttonXPath}`);
      //throw new Error(`Button element not found for XPath: ${buttonXPath}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

module.exports = { clickButtonByXPath };
