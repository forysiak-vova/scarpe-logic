import { createServer } from 'node:http';
import scrapeLogic  from "./appScrapeLogic.js";
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  scrapeLogic(res);
});
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
