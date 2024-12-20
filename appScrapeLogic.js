import { launch, executablePath as _executablePath } from "puppeteer";
import 'dotenv/config';
import chromium from '@sparticuz/chromium';
import puppeteerCore from 'puppeteer-core';

const scrapeLogic = async (res, id) => {
  // const browser = await launch({
    //args:['--use-gl=swiftshader','--no-sandbox'], 

    // executablePath:
    //   process.env.NODE_ENV === "production"
    //     ? process.env.PUPPETEER_EXECUTABLE_PATH
    //     : _executablePath(),
  // });
  const browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
  });
  try {
    const page = await browser.newPage();

    // Navigate the page to a URL.
    //await page.goto('http://localhost:3005/draw3D');
    //const url = 'http://localhost/render3D/'+process.argv[2];
    const url = 'https://www.carport-system.tsc-demo.pl/render3D/' + id;
    
    await page.goto(url);
    await page.waitForSelector('#imageBase64', {
        visible: true,
      });
    
      let element = await page.$('#imageBase64');
      let value = await page.evaluate(el => el.textContent, element)
    res.end(value);
  } catch (e) {
    console.error(e);
    res.end(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

export default scrapeLogic;
