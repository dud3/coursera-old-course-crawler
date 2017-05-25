var express = require('express');
var fs = require('fs');
var request = require('request');
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');

var cheerio = require('cheerio');
var wget = require('wget-improved');

var app = express();

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var server = http.createServer(app);
var io = socketio.listen(server);

// Course Stuff

app.get('/scrape', function(req, res) {
  
  var list = ['machlearning-001', 'pgm-003'];
  var weeks = 20;
  
  var courseId = 'comparch';
  var courseName = '';
  var url = 'https://www.coursera.org/learn/' + courseId + '/home/week/1';
  
  console.log(url);
  
  var baseFolder = 'courses/';
  var courseFolder = '';
  var moduleFolder = '';

    request(url, function(error, response, html) {
  
      if(!error) {
        
        var $ = cheerio.load(html);
        
        // Base course folder
        
        console.log($.html());
        
        $('.rc-ItemHonorsWrapper a').filter(function() {
          
          var data = $(this);
          
          console.log(data);
          
        });
        
        return;
        
        for(i = 0; i < as.length; i++) {
          console.log(JSON.parse($(as[i]).attr('data-click-value')).href);
        }
        
        return;
  
        $('.course-is-locked-view-info').filter(function() {
          
          var data = $(this);
          
          courseName = data.children().first().text().trim().replace(' »', '');
          
          if(courseName.length > 0) {
            // Course name as a folder  
            courseFolder = baseFolder + courseName + '/';
          }
          
          if(!fs.existsSync(courseFolder)) {
            fs.mkdirSync(courseFolder);
          }
          
        })
        
        $('.course-item-list').filter(function() {
          
          var data = $(this);
          
          var courses = data.children();
          var tree = [];
          var branch = {};
          var folder = {};
          
          for(var i = 0; i < courses.length; i++) {
            
            var course = $(courses[i]);
          
            if(course.hasClass('course-item-list-header')) {
              folder = course.children().first().text().trim();
              branch[folder] = [];
              
              moduleFolder = courseFolder + folder;
              
              if(!fs.existsSync(moduleFolder)) {
                fs.mkdirSync(moduleFolder);
              }
            }
            
            if(course.hasClass('course-item-list-section-list')) {
                
              var files = course.children();
              
              for(var j = 0; j < files.length; j++) {
                  
                  var file = {};
                  file.name = $(files[j]).children().first().text().replace('\n', '').trim();
                  file.link = $(files[j]).children().last().children().last().attr('href');
                  
                  wget.download(file.link, moduleFolder + '/' + file.name + '.mp4', {});
                  
                  branch[folder].push(file);
    
              }
            
            }
          
          }
          
        });
          
      }
      
    });

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

exports = module.exports = app;