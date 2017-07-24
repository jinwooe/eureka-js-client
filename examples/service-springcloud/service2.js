var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ------------------ METHODS --------------------------------------------------

app.all('/', function (req, res) {
  var port = server.address().port;
  var msg = 'Hello Service ' + port;
  res.status(200);
  res.end(msg);
})

// ------------------ Eureka Config --------------------------------------------

const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'nodejs-service',
    hostName: '127.0.0.1',
    ipAddr: '127.0.0.1',
    instanceId: '127.0.0.1:nodejs-service:6000',
    countryId: 1,
    statusPageUrl: 'http://127.0.0.1:6000',
    port: {
      '$': 6000,
      '@enabled': 'true'
    },
    vipAddress: 'nodejs-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    }
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  }
});
eureka.logger.level('debug');
eureka.start(function(error){
  console.log(error || 'complete');
  const instances = eureka.getInstancesByAppId('nodejs-service');
  console.log(instances);
});


// ------------------ Server Config --------------------------------------------
var server = app.listen(6000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
