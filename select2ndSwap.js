async function select2ndSwap(page, divSelector) { //sc-bb167634-2 gyEpxF
    //choosing 2nd swap option
if (divs.length >= 2) {
  const secondDiv = divs[1];
  await secondDiv.click();
  console.log('Clicked on the second div element.');
  } else {
  console.log('Second div element not found.');
  }
}

module.exports = { select2ndSwap };