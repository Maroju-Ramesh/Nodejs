const http = require("http");
const url = require("url");
const vegPrices ={
    paneer:120,
    gobi:130,
    mushroom:125
}
const nonVegPrices = {
    chicken: 200,
    mutton: 300,
    fish:350
}
const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true);
    console.log(parsedURL);

    if (req.method === "GET") {
        if (parsedURL.pathname === "/menu") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Welcome to the menu", categories: ["veg", "nonveg"] }));
        } else if (parsedURL.pathname === "/menu/veg") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ items: ["gobi", "paneer", "mushroom"] }));
        } else if (parsedURL.pathname === "/menu/nonveg") {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ items: ["chicken", "mutton", "fish"] }));
        } else if (parsedURL.pathname.startsWith("/menu/veg/") || parsedURL.pathname.startsWith("/menu/nonveg/")) {
            const segments = parsedURL.pathname.split("/").filter(Boolean);
            const item = segments[segments.length - 1];
            let itemprice = vegPrices[item] || nonVegPrices[item]
            if (parsedURL.query.order) {
                const quantity = parseInt(parsedURL.query.quantity, 10) || 1;
                const price = itemprice * quantity; // Example pricing
                const gst = price * 0.18;
                const total = price + gst;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ item, quantity, price, gst, total, message: "Thank you for your order!" }));
            } else {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ message: "Missing order query to place an order" }));
            }
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Not Found" }));
        }
    } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Method Not Allowed" }));
    }
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
