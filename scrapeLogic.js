const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args:['--use-gl=swiftshader','--no-sandbox'],

    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    // Navigate the page to a URL.
    //await page.goto('http://localhost:3005/draw3D');
    //const url = 'http://localhost/render3D/'+process.argv[2];
    const url = 'https://draw3d.aneta-karol.pl/render3D/1';
    
    await page.goto(url);
    await page.waitForSelector('#imageBase64', {
        visible: true,
      });
    
      let element = await page.$('#imageBase64');
      let value = await page.evaluate(el => el.textContent, element)
    console.log(value);
    res.send(value);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };