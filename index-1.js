const express = require('express');

const puppetter = require('puppeteer');
const app = express();

const fs = require('fs');

const port = 3000;

let date = new Date();
let offset;
let hours;
let minutes;
let seconds;
let time = ``;
let fileName = ``;
let oldFileName = ``;
let Day;
let Month;
let image = "";

const makeFileName = (req, res, next) => {
    
    offset = date.getTimezoneOffset()/60;
    hours = offset < 0? date.getUTCHours() - offset : date.getUTCHours() + offset;
    minutes = date.getUTCMinutes();
    seconds = date.getUTCSeconds();
    time = `${hours}:${minutes}:${seconds}`;
    day = date.getUTCDate();
    month = date.getUTCMonth() + 1;

    for(let i = 0; i < 24; i++) {
        if(hours == i) {
            fileName = `${day}-${month}-${hours}`;
            oldFileName = `${day}-${month}-${hours - 1}`;
        }
    }
    next();
    
}

const screenshotPage = async (req, res, next) => {

    let filePath = __dirname + `/img${fileName}.png`;
    let oldFilePath = __dirname + `/img${oldFileName}.png`;

    if(fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
    }

    if(!fs.existsSync(filePath)){
        const browser = await puppetter.launch({ args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process'
          ] });
        try{ 
            const page = await browser.newPage();
            await page.setViewport({ width: 1920, height: 1080 });
            await page.goto(' https://herakleion.efhmeries.gr/Pharmacist/Screen/Index/116');
            // await page.screenshot({path: __dirname + `/img${fileName}.png`});

            image = await page.screenshot();
        }catch(e) {
            console.log(e);
        }  
        await browser.close();      
        console.log(`The file created at ${fileName}.`);
    } else {
        console.log(`The file for ${fileName} already exists.`);
    }
    
    next();  
}

app.use(makeFileName);

app.use(screenshotPage);

app.get('/', (req, res) => {
    // console.log(`image budder, ${image}`);
    let img = Buffer.from(image, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
      });
      res.end(img); 

    // let filePath = __dirname + `/img${fileName}.png`;
    // if(fs.existsSync(filePath)) {
    //     console.log(`The file img${fileName}.png was send.`);
    //     res.sendFile(filePath);
    // }else {
    //     res.sendStatus(404);
    // }
})

app.listen(process.env.PORT || port, () => {
    console.log(`server started at http://localhost:${process.env.PORT || port}`);
})