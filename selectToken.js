const checkModalExistence = require('./checkModalExistence');

async function selectToken(page, buttonXPath, inputValue, optionValue) {
  try {
    await page.waitForXPath(buttonXPath);
    const buttonElement = await page.$x(buttonXPath);
    if (buttonElement.length > 0) {     //if components are being selected by nth child, dont use .length, if not use  .length to
      await buttonElement[0].click();
      console.log(`Clicked on the button.`);
      
      //Check if Select Token Modal opened up
      const modalSelector = '.chakra-modal__content-container';
      const modalExists = await checkModalExistence(page, modalSelector);
      //Select token steps to execute, if modal open
      if (modalExists) {
        console.log('Modal element exists.');
        // await page.screenshot({ path: 'imgchecks/modalvanne.png' });
        //wait for modal
        await page.waitForSelector(modalSelector,  { visible: true } );
        const modalElement = await page.$(modalSelector);
        if (modalElement) {
           //time delay to ensure input is ready
          page.waitForSelector('input', { timeout : '3000' } ); 
          const inputElement = await modalElement.$('input');
            if (inputElement) {

                await inputElement.focus();
                console.log(`Element focused.`);
                await inputElement.type(optionValue);
                console.log('Written');
               // await page.screenshot({ path: 'imgchecks/typemodal.png' });
             // await inputElement.press('Enter');  
                await page.screenshot({ path: 'imgchecks/entermodal.png' });
                // await page.screenshot({ path: 'imgchecks/typedinmodal.png' });
                const resultDiv = await modalElement.$('.sc-b49748d5-3');
                //await page.waitForSelector(resultDiv,  { visible: true } );
                await resultDiv.click(); 
                //await inputElement.click('Enter'); 
                // await page.screenshot({ path: 'imgchecks/keypressedinmodal.png' });
                console.log(`Selected "${optionValue}" from the dropdown.`);
                // await page.screenshot({ path: `imgchecks/${optionValue}.png` });
            } else {
                console.error(`Input element not found within the modal.`);
            }
          } else {
            console.error(`Modal element not found for selector: ${modalSelector}`);
          }
      } else {
        console.error(`Modal does not exist.`);
      } 
    } else {
        console.error(`Button element not found for XPath: ${buttonXPath}`);
      //throw new Error(`Button element not found for XPath: ${buttonXPath}`);
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = selectToken ;
