const puppeteer = require('puppeteer');
require('dotenv').config();

// .env file constants
const USER_GENERATED_ID = process.env.USER_GENERATED_ID;
const USER_DOB = process.env.USER_DOB;
const SECOND_PERSON_NAME = process.env.SECOND_PERSON_NAME;
const SECOND_PERSON_DOCUMENT_NUMBER = process.env.SECOND_PERSON_DOCUMENT_NUMBER;
const SECOND_PERSON_DOB = process.env.SECOND_PERSON_DOB;

const wait = async (milliseconds) => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    'https://agendamentosonline.mne.gov.pt/AgendamentosOnline/app/scheduleAppointmentForm.jsf',
    { waitUntil: 'load' }
  );

  setTimeout(async () => {
    try {
      await page.click('#j_idt316');
    } catch {
      console.log('No cookie pop up detected.');
    }
  }, 500);

  await page.focus('#scheduleForm\\:tabViewId\\:ccnum');
  await page.keyboard.type(USER_GENERATED_ID);

  await page.focus('#scheduleForm\\:tabViewId\\:dataNascimento_input');
  await page.keyboard.type(USER_DOB);

  await wait(2000);

  await page.waitForSelector('#scheduleForm\\:tabViewId\\:searchIcon > span');
  await page.evaluate((e) => e, '#scheduleForm\\:tabViewId\\:searchIcon > span');
  await page.click('#scheduleForm\\:tabViewId\\:searchIcon > span');

  await wait(2000);

  // select Tel Aviv embassy
  await page.waitForSelector('#scheduleForm\\:postcons_label');
  await page.evaluate((e) => e, '#scheduleForm\\:postcons_label');
  await page.click('#scheduleForm\\:postcons_label');
  await page.click('#scheduleForm\\:postcons_panel > div > ul > li:nth-child(2)');

  await wait(1000);

  // select category (ID card)
  await page.waitForSelector('#scheduleForm\\:categato_label');
  await page.evaluate((e) => e, '#scheduleForm\\:categato_label');
  await page.click('#scheduleForm\\:categato_label');
  await page.click('#scheduleForm\\:categato_panel > div > ul > li:nth-child(3)');

  await wait(1000);

  await page.waitForSelector('#scheduleForm\\:comboBoxSN_label');
  await page.evaluate((e) => e, '#scheduleForm\\:comboBoxSN_label');
  await page.click('#scheduleForm\\:comboBoxSN_label');
  await page.click('#scheduleForm\\:comboBoxSN_panel > div > ul > li:nth-child(2)');

  await wait(1000);

  await page.waitForSelector('#scheduleForm\\:numAtosIguais_label');
  await page.evaluate((e) => e, '#scheduleForm\\:numAtosIguais_label');
  await page.click('#scheduleForm\\:numAtosIguais_label');
  await page.click('#scheduleForm\\:numAtosIguais_panel > div > ul > li:nth-child(2)');

  await wait(1000);

  await page.waitForSelector('#scheduleForm\\:name2');
  await page.evaluate((e) => e, '#scheduleForm\\:name2');
  await page.focus('#scheduleForm\\:name2');
  await page.keyboard.type(SECOND_PERSON_NAME);

  await page.focus('#scheduleForm\\:numDoc2');
  await page.keyboard.type(SECOND_PERSON_DOCUMENT_NUMBER);

  await page.focus('#scheduleForm\\:birthdate2_input');
  await page.keyboard.type(SECOND_PERSON_DOB);

  await page.click('#scheduleForm\\:bAddAto');

  await wait(5000);

  await page.waitForSelector('#scheduleForm\\:dataTableListaAtos\\:0\\:selCond > span');
  await page.evaluate((e) => e, '#scheduleForm\\:dataTableListaAtos\\:0\\:selCond > span');
  await page.click('#scheduleForm\\:dataTableListaAtos\\:0\\:selCond > span');

  await wait(100);

  await page.waitForSelector('#scheduleForm\\:dataTableListaAtos\\:0\\:bCal');
  await page.click('#scheduleForm\\:dataTableListaAtos\\:0\\:bCal');
})();
