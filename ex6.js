var http = require("http").createServer(handler);
var io = require("socket.io").listen(http);
var fs = require("fs");
var firmata = require("firmata");

console.log("Starting the code");

var board = new firmata.Board("/dev/ttyACM0", function(){ // ACM Abstract Control Model for serial communication with Arduino (could be USB)
    console.log("Connecting to Arduino");
    console.log("Activation of Pin 8");
    board.pinMode(8, board.MODES.OUTPUT);
    console.log("Activation of Pin 13");
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
});

function handler(req, res) {
fs.readFile(__dirname + "/ex6.html",
function (err, data) {
    if (err) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        return res.end("Error loading html page.");
    }
    res.writeHead(200);
    res.end(data);
})

}

http.listen(8080);

io.sockets.on("connection", function(socket) {
    console.log("Socket id: " + socket.id);
    socket.on("commandToArduino", function(commandNo){
        console.log("received");
        if (commandNo == "1") {
            board.digitalWrite(13, board.HIGH);
        }
        if (commandNo == "0") {
            board.digitalWrite(13, board.LOW);
        }
        if (commandNo == "3") {
            board.digitalWrite(8, board.HIGH);
        }
        if (commandNo == "2") {
            board.digitalWrite(8, board.LOW);
        }
    });
});
