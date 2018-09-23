//express initialized "app" to be a function handle that can supply to an http server
var app = require("express")();
//http server that is being fed "app" and utilizing express
var http = require("http").Server(app);
// adding socket.io to the application passing into the socket.io INSTANCE our http object (HTTP server)
var io = require("socket.io")(http);

// "/" is a route handler that will be called when the website hits home directory
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("A user has joined the chat!");
  io.emit('message', "User has joined");
  socket.on('message', function(msg) {
    console.log("Message: " + msg);
    io.emit('message', msg);
  });
  socket.on("disconnect", function() {
    console.log("A user has left the chat");
    io.emit('message', "A user has left the chat")
  });
});

//we use the http Object to listen on port 3000
http.listen(3000, function() {
  console.log("listening on *:3000");
});
