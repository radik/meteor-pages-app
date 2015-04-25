(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    this.Given(/^I am a new user$/, function () {
      // no callbacks! DDP has been promisified so you can just return it
      return this.ddp.callAsync('reset', []); // this.ddp is a connection to the mirror
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
      // WebdriverIO supports Promises/A+ out the box, so you can return that too
      this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
        setViewportSize({
          width: 1000,
          height: 500
        }).
        url(url.resolve(process.env.HOST, relativePath)). // process.env.HOST always points to the mirror
        call(callback);
    });

    this.Then(/^I should see "([^"]*)" on page$/, function (expectedTitle, callback) {
      // you can use chai-as-promised in step definitions also
      this.browser.
        waitForVisible('h1'). // WebdriverIO chain-able promise magic
        getText('h1', function(err, text){
          if(!err){
            if(text !== expectedTitle){
              throw new Meteor.Error(500, 'Error');
            }
          }else{
            throw err;
          }

        }).
        call(callback);
    });

    this.Then(/^I should see first employee$/, function(callback){
      this.browser.
        saveScreenshot('./screen.png').
        pause(20000).
        saveScreenshot('./screen_after_20_sec.png').
        getText('table tr:first-child td', function(err, text){
          if(!err){
            if(text !== 'Employee #0'){
              throw new Meteor.Error(500, 'Error');
            }
          }else{
            throw err;
          }

        }).
        call(callback);
    });

  };

})();
