// REPOSITORIO https://github.com/Accusoft/hello-barcode-xpress-for-nodejs

const barcodeXpress = require('barcode-js');

async function main() {
  // Search for all types of barcodes in an image file. 
  // For the full list of options for this function, 
  // see the API reference at https://help.accusoft.com/BarcodeXpress/latest/BxNodeJs/webframe.html#module-barcode-js.html
  // Test File test-barcodes.bmp
  const results = await barcodeXpress.analyze('mate.jpg', {
    type: barcodeXpress.BarcodeType.ALL
  });

  console.log('Results:');
  console.log(results[0].value);
}

main();
