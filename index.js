import { createServer } from 'node:http';
import scrapeLogic  from "./appScrapeLogic.js";
import url from 'url';
const port = 3000;
const server = createServer((req, res) => {
  let nr = url.parse(req.url, true).query['renderId'];
  nr = Number(nr);
  console.log(nr);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if(nr>0){
    scrapeLogic(res, 1);
  }else{
    res.end(`Wrong id`);
  }
});
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
