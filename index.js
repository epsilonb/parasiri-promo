var express = require('express');
var http = require("http");
var https = require("https");
var htmlparser = require("htmlparser2");
var router = express.Router();

const app = express();

const port = 3000

app.get("/", (req, res) => {
    let options = {
        host: `herakleion.efhmeries.gr`,
        port: 443, 
        path: `/Pharmacist/Screen/Index/116`
    };

    https.get(options, result => {
        console.log("request entered");
        let data = "";

        result.on("data", chunk => {
            data += chunk;
        });

        result.on("end", () => {
            res.setHeader('Content-type','text/html')
            res.send(`<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,500;1,500&display=swap" rel="stylesheet">
                    <link href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" rel="stylesheet">
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,500;1,500&display=swap');

                        body {
                            font-family: 'Alegreya Sans', sans-serif;
                            font-size: 10px;
                            background-color: white;
                        }
                    
                        .container-fluid {
                            width: 100%;
                            margin: auto !important;
                        }

                        hr, p{
                            padding: 0;
                            margin: 0;
                        }
                        
                        #client-name {
                            font-size: 3rem;
                            color: crimson;
                            text-align: center;
                        }
                        
                        .test {
                            margin-top: 40px;
                        }
                        
                        .left, .right {
                            font-size: 1.4rem;
                            position: absolute;
                            font-weight: 700;
                            color: crimson;
                        }
                        
                        .left {
                            left: 10px;
                        }
                        
                        .right {
                            right: 10px;
                        }

                        h5 i {
                            padding-right: 20px !important;
                        }

                        h5 {
                            font-size: x-large;
                            height: 70px;
                            font-weight: 200;
                        }

                        h6 {
                            padding-top: 10px;
                        }

                        .card-footer {
                            padding: 20px 5px !important;
                            background-color: #28a745!important;
                        }

                        .card {
                            border: 1px solid #28a745;
                        }

                        .card-body {
                            height: 150px;
                        }

                        .bi-clock-history {
                            color: red;
                        }

                        .bi-clock {
                            color: limegreen;
                        }

                        .card-title {
                            display: flex;
                            justify-content: space-between!important;
                            align-content: center!important;
                        }

                        .col-sm-6 {
		                    padding: 10px;
                        }

                        .row {
                            display: flex;
                            flex-wrap: wrap;
                            align-content: unset;
                            margin-top: calc(var(--bs-gutter-y) * -1);
                            margin-right: calc(var(--bs-gutter-x)/ -2);
                            margin-left: calc(var(--bs-gutter-x)/ -2);
                        }
                        
                    </style>
                </head>
                <body>
                    <h1 id="client-name"><i>Φαρμακείο Παρασύρη Άννα</i></h1>
                    <hr>
                    <p class="left">ΓΕΩΡΓΙΟΥ ΠΑΠΑΝΔΡΕΟΥ 74</p>
                    <p class="right">ΤΗΛ 2810222587</p>
                    <div class="test">${data}</div>
                
                    
                </body>
            </html>`);
        })

    }).on('error', function(e) {
        res.send({message: e.message});
    });
});

app.listen(process.env.PORT || port, () => {
    console.log(`server started at http://localhost:${process.env.PORT || port}`);
})