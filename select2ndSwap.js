// async function select2ndSwap(page, divSelector) {
//     // Wait for the second RouteWrapper element to load within the div
//     await page.waitForSelector(`${divSelector} .RouteWrapper:nth-child(2)`, { visible: true });
  
//     // Get the second RouteWrapper element
//     const routeWrapperElement = await page.$(`${divSelector} .RouteWrapper:nth-child(2)`);
//     const routeWrapperExists = !!routeWrapperElement;
  
//     if (routeWrapperExists) {
//       console.log('Selected the second RouteWrapper element.');
//       // Perform actions with the second RouteWrapper element
//     } else {
//       console.log('The second RouteWrapper element is not available.');
//     }
//   }
  
//   module.exports = { select2ndSwap };
async function select2ndSwap(page, divSelector) { //sc-bb167634-2 gyEpxF
    // Wait for the second RouteWrapper element to load within the div 
    //await page.waitForSelector(`${divSelector}:nth-child(1)`, { visible: true });
    //await page.waitForSelector(`${divSelector} .RouteWrapper`, { visible: true });
  
    // Click on the second RouteWrapper element
    //await page.click(`${divSelector} .RouteWrapper`);
{/*await page.$eval(`${divSelector} > .RouteWrapper`, element => element.click());
    
  // Click on the second div element
  await page.$eval(`${divSelector} > div.sc-d413ea6e-0`, div => div.click());

console.log('Clicked on the second RouteWrapper element.'); */}
const divs = await page.$$(`div.sc-d413ea6e-0`);
if (divs.length >= 2) {
  const secondDiv = divs[1];
  await secondDiv.click();
  console.log('Clicked on the second div element.');
} else {
  console.log('Second div element not found.');
}


}
  module.exports = { select2ndSwap };