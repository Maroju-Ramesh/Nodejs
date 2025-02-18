const http = require("http")
const server =  http.createServer((req,res)=>{
    res.write("Every step of struggle brings a game of victory.....");
    res.write("Just like a Node.js server, patiently handling requests and delivering success!");
    res.end("")
});
server.listen("3101", ()=>{
    console.log("Server is running")
})
