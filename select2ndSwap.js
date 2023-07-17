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
    await page.waitForSelector(`${divSelector} .RouteWrapper`, { visible: true });
  
    // Click on the second RouteWrapper element
    await page.click(`${divSelector} .RouteWrapper`);
  
    console.log('Clicked on the second RouteWrapper element.');

}
  module.exports = { select2ndSwap };