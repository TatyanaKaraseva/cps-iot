var http = require("http");
var firmata = require("firmata");

console.log("Starting the code");

var board = new firmata.Board("/dev/ttyACM0", function(){ // ACM Abstract Control Model for serial communication with Arduino (could be USB)
    console.log("Connecting to Arduino");
    console.log("Activation of Pin 8");
    board.pinMode(8, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
    console.log("Activation of Pin 13");
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
});

http.createServer(function(req, res) {
    var parts = req.url.split("/"),
    operator = parseInt(parts[1],10);
console.log(operator);    
    if (operator == 0) {
   console.log("Putting led to OFF");
   board.digitalWrite(13, board.LOW);
}
if (operator == 1) {
   console.log("Putting led ON");
   board.digitalWrite(13, board.HIGH);
}
if (operator == 2) {
   console.log("Putting led OFF");
   board.digitalWrite(8, board.LOW);
}
if (operator == 3) {
   console.log("Putting led ON");
   board.digitalWrite(8, board.HIGH);
}

    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("For test write into browser e.g. 123.1.2.3:8080/1");
    res.end("The value of the operator is: " + operator);
    
    
}).listen(8080, "172.16.22.127");

