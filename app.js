const express = require("express"),
  app = express(),
  puppeteer = require("puppeteer"),
  bodyParser = require("body-parser"),
  cors = require("cors");

app.use(cors());
app.use(bodyParser.text({ limit: "5mb" }));

app.post("/", async (request, response) => {
  const { body: SVGContent } = request;

  try {
    console.log(request);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      defaultViewport: {
        width: 1080,
        height: 1080,
        deviceScaleFactor: 2,
      },
    });

    const page = await browser.newPage();

    await page.setContent(SVGContent);

    const image = await page.screenshot({ fullPage: true });

    await browser.close();

    response.set("Content-Type", "image/png");
    response.status(200);
    response.send(image);
  } catch (error) {
    response.status(500);
    response.send(JSON.stringify(error));
  }
});

var listener = app.listen(3000, function () {
  console.log("Screenshotter is listening on port " + listener.address().port);
});

module.exports = app;
