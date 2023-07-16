async function checkModalExistence(page, modalSelector) {
    const modalExists = await page.$eval(modalSelector, modal => modal !== null);
    return modalExists;
  }
  
  module.exports = checkModalExistence;