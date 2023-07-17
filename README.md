# **<div align="center">Puppeteer Task by Mrinalini Nair Ani</div>**  

## STATUS : WIP
Site : http://swap.defillama.com/

## Steps 
- [x] 1. Create a new project using Javascript/Typescript in NodeJS
- [x] 2. Integrate puppeteer library
- [x] 3. Use puppeteer to
a. Launch headful browser and go t o swap.defillama.com
b. Fill the form
  - [x] Enter "Arbitrum One" in the "chain" field
  - [x] Enter "12" in "You Sell" field
  - [x] Enter "WBTC" (Wrapped BTC) in the "select token" field on right hand side to "You Sell" field
  - [x] Enter "USDC" (USDC Coin) in the "select token" field in "You Buy" section
  - [ ] Once you enter this data, a section will appear on right hand side called - "Select a route to perform a swap"
  - [ ] Select the second option in this section
- [ ] 4. Leave the browser window open. This is the end of the program.

## Assumptions
- "Arbitrum One" is the same as "Arbitrum". (Arbitrum One was removed as a chain option).
- The use of `setUserAgent` is allowed to bypass Cloudfare Bot Detection
- Code being run on Brave Browser with it's default search engine
     `await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.275 (Edition avast-2021-06-06)');` 
- Node `v18.12.1`

