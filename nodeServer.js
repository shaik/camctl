var SerialPort = require('serialport');
var fetch = require('node-fetch');

const config = {
    dataUrl: 'https://io.adafruit.com/api/v2/shaik/feeds/camctl/data/last',
    arduinoPort: '/dev/cu.usbmodem14111',
    baudRate: 9600,
    verbose: true
}
var port;
var hPos = 90,
    vPos = 75;

initPort(config.arduinoPort, config.baudRate);
setInterval(fetchDataFromWeb, 1500);

function initPort(prt, baud) {
    port = new SerialPort(prt, baud, {
        baudRate: baud
    }, function(err) {
        if (err) {
            return console.log('Error initializing port: ', err.message);
        }
    });
}

function writeToPort() {
    var msg = hPos.toString() + '&' + vPos.toString();
    port.write(msg, function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        if (config.verbose) {
            console.log('message ' + msg + ' written')
        }
    });
}


function fetchDataFromWeb() {
    var h, v;
    fetch(config.dataUrl)
        .then(response => {
            response.json().then(json => {
                var raw = json.value;
                [h, v] = raw.split('d');
                hPos = h;
                vPos = v;
                writeToPort();
            });
        })
        .catch(error => {
            console.log(error);
        });
}
