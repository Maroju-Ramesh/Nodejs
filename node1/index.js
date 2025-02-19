const http = require("http")
const url = require("url")
// const server =  http.createServer((req,res)=>{
//     res.write("Every step of struggle brings a game of victory.....");
//     res.write("Just like a Node.js server, patiently handling requests and delivering success!");
//     res.end("")

// });
// let obj = { name: "Ramesh", city: "kerala" };
const server = http.createServer((req, res) => {
    // console.log(req.method)
const parsedURL = url.parse(req.url,true);
// console.log(parsedURL.query.tickets)
const tickets =parsedURL.query.tickets;
console.log(parsedURL)
    if (req.method == "GET") {
        if (parsedURL.pathname == "/chaava") {
            res.writeHead(200, "ok", { "content-type": "application/json" });
            res.write(JSON.stringify({"movie name":"CHAAVA",screen: "two", tickets: tickets}));
            res.end();
        }
        else if(parsedURL.pathname=="/shershah"){
            res.writeHead(200, "hello node", { "content-type": "application/json" });
            // res.write(JSON.stringify(obj));
            res.write(JSON.stringify({"movie name":"Shershah",screen: "two"}));
            res.end()
        }else{
            res.writeHead(404, "not found", { "content-type": "application/json" });
            res.write(JSON.stringify({message: "Movie not showing now"}))
            res.end();
        }
    }
    else if(req.method=="POST"){
        res.end()
    }else if(req.method=="PUT"){
        res.end()
    }else if(req.method=="DELETE"){
        res.end()
    }else {
        res.end("invalid request")
    }
})
server.listen("3101", () => {
    console.log("Server is running")
})
