const checkModalExistence = require('./checkModalExistence');

async function clickButtonByXPath(page, buttonXPath, inputXPath, optionValue) {
  try {
    await page.waitForXPath(buttonXPath);
    const buttonElement = await page.$x(buttonXPath);
    if (buttonElement.length > 0) {
      await buttonElement[0].click();
      console.log(`Clicked on the button.`);
      await page.screenshot({ path: 'button.png' });

      const modalSelector = '.chakra-modal__content-container';
      const modalExists = await checkModalExistence(page, modalSelector);

      if (modalExists) {
        console.log('Modal element exists.');
        await page.screenshot({ path: 'modalvanne.png' });
        await page.waitForSelector(modalSelector);
        const modalElement = await page.$(modalSelector);
        if (modalElement) {
          const inputElement = await modalElement.$x(inputXPath);
          if (inputElement.length > 0) {
            await page.screenshot({ path: 'openmodal.png' });
            await inputElement[0].focus();
            console.log(`Element focused.`);
            await inputElement[0].type(optionValue);
            await page.screenshot({ path: 'typemodal.png' });
            console.log('Written');
            await inputElement[0].press('Enter');
            await page.screenshot({ path: 'entermodal.png' });
            console.log(`Selected "${optionValue}" from the dropdown.`);
            await page.screenshot({ path: `${optionValue}.png` });
          } else {
            throw new Error(`Input element not found for XPath: ${inputXPath}`);
          }
        } else {
          throw new Error(`Modal element not found for selector: ${modalSelector}`);
        }
      } else {
        console.error(`Modal element does not exist.`);
      }
    } else {
      throw new Error(`Button element not found for XPath: ${buttonXPath}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

module.exports = { clickButtonByXPath };
