# **<div align="center">Puppeteer Task by Mrinalini Nair Ani</div>**  
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"><img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">

## STATUS : WIP (To apply : SOLID Principles)

### Command to run script : `node index.js`

## Steps 
- [x] 1. Create a new project using Javascript/Typescript in NodeJS
- [x] 2. Integrate puppeteer library
- [x] 3. Use puppeteer to
- [x] a. Launch headful browser and go to `http://swap.defillama.com/`
- [x] b. Fill the form
  - [x] Enter "Arbitrum One" in the "chain" field
  - [x] Enter "12" in "You Sell" field
  - [x] Enter "WBTC" (Wrapped BTC) in the "select token" field on right hand side to "You Sell" field
  - [x] Enter "USDC" (USDC Coin) in the "select token" field in "You Buy" section
  - [x] Once you enter this data, a section will appear on right hand side called - "Select a route to perform a swap"
  - [x] Select the second option in this section
- [x] 4. Leave the browser window open. This is the end of the program.

## Assumptions
- "Arbitrum One" is the same as "Arbitrum". (Arbitrum One was removed as a chain option).
- The use of `setUserAgent` is allowed to bypass Cloudfare Bot Detection
- Code being run on Brave Browser with it's default search engine
     `await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.275 (Edition avast-2021-06-06)');` 
- Node `v18.12.1`
- Step 4 :- Browser Instance continues to run after form filling; terminates when Spacebar key is pressed. 

