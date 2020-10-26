// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const strftime = require("strftime");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/",  (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp/:date_string",(req,res) => {
  let date = new Date();

  if(/^\d*$/.test(req.params.date_string)){
    date.setTime(req.params.date_string);
  }else {
    date = new Date(req.params.date_string);
  }

  if(!date.getTime()){
    res.json({"error" : "Invalid Date" })
  }else {
    res.json({
      unix: date.getTime(),
      utc: strftime('%B %d, %Y', date)
    });
  }
});



// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
