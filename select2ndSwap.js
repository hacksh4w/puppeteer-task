{/* we need modal check fn first */}
//this is not a modal, soo saanam undo ennu check cheyyanam, idk the word
async function select2ndSwap(page) {
    
    const modalSelector = '.sc-bb167634-2';
    const modalExists = await checkModalExistence(page, modalSelector);
    if(modalExists) {

    } else {
        console.log("Modal doesn't exist")
    }
  }
  
  module.exports = select2ndSwap;