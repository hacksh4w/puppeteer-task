async function selectDropdownOption(page, dropdownClass, optionValue) {
    const parentDiv = await page.$(dropdownClass);
    if (parentDiv) {
      const inputElement = await parentDiv.$('input');
      if (inputElement) {
        await inputElement.focus();
        await inputElement.type(optionValue);
        await inputElement.press('Enter');
        console.log(`Selected "${optionValue}" from the dropdown.`);
        // await page.screenshot(`path : imgchecks/Arbitrum.png`);
      } else {
        console.error('Input field not found within the parent div.');
      }
    } else {
      console.error(`Parent div with class ${dropdownClass} not found.`);
    }
  }  

  module.exports = selectDropdownOption;