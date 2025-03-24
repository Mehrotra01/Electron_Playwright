const { chromium } = require('playwright');

(async () => {
  const zipCode = process.argv[2];
  const effectiveDate = process.argv[3];
  const expirationDate = process.argv[4];
  const state = process.argv[5];
  const environment = process.argv[6];

  // Validation for required inputs
  if (!zipCode || !effectiveDate || !expirationDate || !state || !environment) {
    console.error('Error: All inputs (Zip Code, Effective Date, Expiration Date, State, Environment) are required.');
    process.exit(1);
  }

  // Validate Effective Date is not a future date
  const today = new Date();
  const effectiveDateObj = new Date(effectiveDate);
  if (effectiveDateObj > today) {
    console.error('Error: Effective Date cannot be a future date.');
    process.exit(1);
  }

  console.log(`Received Inputs:
  Zip Code: ${zipCode}
  Effective Date: ${effectiveDate}
  Expiration Date: ${expirationDate}
  State: ${state}
  Environment: ${environment}`);

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://example.com'); // Replace with actual URL
  console.log('Navigated to google.com');

  await page.screenshot({ path: 'screenshot.png' });
  console.log('Screenshot saved as screenshot.png');

  await browser.close();
})();
