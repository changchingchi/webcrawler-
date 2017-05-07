# webcrawler
## Background

This is a quick and dirty POC to demo how to use NodeJs to webcrawle a certain web page. In this particular case, I want to check the status of my application on USCIS and I am only doing this for experimental purpose. The code is provided as-is basis with no guarantee. 

## Steps

There are multiple ways you can start your application. One by running `node app.js`, another one is `npm start` in your command line tool.

The application will listen on port `3000` and will run one time only for webcrawling the webpage. If you want to set up schedule for the task. There are multiple ways you could do:

1. Find the Host and deploy on it, take advantage of `npm` package `forever`. This package will allow you forever run the application by `forever start node app.js`

2. Heroku and Heroku scheduler.(the way I implemented). The only reason I used this was because it is quick POC. 
For more information about how to set up the environment, please find the following references.   

## References
[Defining Node.js task for Heroku Scheduler](http://www.spacjer.com/blog/2014/02/10/defining-node-dot-js-task-for-heroku-scheduler/)

[Heroku Scheduler](https://elements.heroku.com/addons/scheduler)

other npm package

[nodemailer](https://www.npmjs.com/package/nodemailer) - Send e-mails from Node.js

[cheerio](https://www.npmjs.com/package/cheerio) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.

