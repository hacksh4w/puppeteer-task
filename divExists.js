async function checkDivExistence(page, divSelector) {
        
    // Wait for the div to appear
    await page.waitForSelector(divSelector, { visible: true });
    // Check if the div element exists
    const divElement = await page.$(divSelector);
    const divExists = !!divElement;
    return divExists;
  }
  
  module.exports = { checkDivExistence };