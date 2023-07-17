
async function select2ndSwap(page, swapSelector) { //sc-bb167634-2 gyEpxF

const divs = await page.$$(swapSelector);
if (divs.length >= 2) {
  const secondDiv = divs[1];
  await secondDiv.click();
  console.log('Clicked on the second div element.');
} else {
  console.log('Second div element not found.');
}


}
  module.exports = select2ndSwap;