var request = require("request");
var cheerio = require("cheerio");
var nodemailer = require('nodemailer');
var bunyan = require('bunyan');
// content of index.js
const http = require('http')
var schedule = require('node-schedule');
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '',
    pass: ''
  },
  logger: bunyan.createLogger({
    name: 'nodemailer'
  }),
  debug: true // include SMTP traffic in the logs
}, {
    // sender info
    headers: {
      // 'X-Laziness-level': 1000 // just an example header, no need to use this
    }
  });


var options = {
  url: "https://egov.uscis.gov/casestatus/mycasestatus.do",
  method: "POST",
  headers: {
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Referer': 'https://egov.uscis.gov/casestatus/mycasestatus.do',
    'Connection': 'keep-alive'
  },
  body: 'changeLocale=' +
  '&completedActionsCurrentPage=0' +
  '&upcomingActionsCurrentPage=0' +
  '&appReceiptNum=' +
  '&caseStatusSearchBtn=CHECK+STATUS'
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body);
    cheerioController(body);
  }
}

//here we use node-schedule to send us email every x intervals. 
// var j = schedule.scheduleJob('*/6 * * * *', function () {
//   console.log('cron job triggered');
//   request(options, callback);
// });


request(options, callback);

function cheerioController(body) {
  $ = cheerio.load(body);
  // console.log($("body > div.main-content-sec.pb40 > form > div > div.container > div > div > div.col-lg-12.appointment-sec.center > div.rows.text-center > p")[0].children[0].data);
  var uscisStatus = $("body > div.main-content-sec.pb40 > form > div > div.container > div > div > div.col-lg-12.appointment-sec.center > div.rows.text-center > p")[0].children[0].data;
  var uscisTitle = $("body > div.main-content-sec.pb40 > form > div > div.container > div > div > div.col-lg-12.appointment-sec.center > div.rows.text-center")[0].children[1].children[0].data;

  if (uscisStatus.startsWith('On April 11, 2017, we received your Form I-539')) {
    console.log("same status On April 11, 2017, we received your Form I-539...")
    var message = {

      // Comma separated list of recipients
      to: 'Changching chi <chi.changching@gmail.com>',

      // Subject of the message
      subject: 'USCIS updates- NOTHING UPDATED 😑', //

      // plaintext body
      text: uscisTitle + '\n\n' + uscisStatus
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return callback(error);
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
      return callback(null, info.response);
      transporter.close();
    })
  } else {
    console.log("some progress here..");

    var message = {

      // Comma separated list of recipients
      to: 'Changching chi <chi.changching@gmail.com>',

      // Subject of the message
      subject: 'USCIS updates- NEW RELEASE 🔥', //

      // plaintext body
      text: uscisTitle + '\n\n' + uscisStatus
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return callback(error);
      }
      console.log('Message sent successfully!');
      console.log('Server responded with "%s"', info.response);
      return callback(null, info.response);
      transporter.close();
    })
  }

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
