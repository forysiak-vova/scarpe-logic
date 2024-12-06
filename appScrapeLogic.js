import { launch, executablePath as _executablePath } from "puppeteer";
import 'dotenv/config'

const scrapeLogic = async (res) => {
  const browser = await launch({
    //args:['--use-gl=swiftshader','--no-sandbox'], 

    // executablePath:
    //   process.env.NODE_ENV === "production"
    //     ? process.env.PUPPETEER_EXECUTABLE_PATH
    //     : _executablePath(),
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
    res.end(value);
  } catch (e) {
    console.error(e);
    res.end(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

export default scrapeLogic;
