const http = require("http");
const url = require("url");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = url.parse(req.url).pathname;

  if (method === "GET" && path === "/") {
    // відправляємо html-сторінку з формою
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <html>
        <head>
          <title>Cut row on 2 half</title>
        </head>
        <body>
          <h1>Input text for work</h1>
          <form method="POST" action="/process">
            <input type="text" name="text" placeholder="Input">
            <button type="submit">Start</button>
          </form>
        </body>
      </html>
    `);
    res.end();
  } else if (method === "POST" && path === "/process") {
    // отримуємо дані з форми і обробляємо рядок
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = qs.parse(body);
      const text = data.text;
      const halfLength = Math.floor(text.length / 2);
      const firstHalf = text.slice(0, halfLength);
      const secondHalf = text.slice(halfLength);
      // відправляємо нову сторінку з результатом обробки
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`
        <html>
          <head>
            <title>Result</title>
          </head>
          <body>
            <h1>Result of work </h1>
            <p>Input row: ${text}</p>
            <p>First half: ${firstHalf}</p>
            <p>Second half: ${secondHalf}</p>
          </body>
        </html>
      `);
      res.end();
    });
  } else {
    // якщо запит не відповідає вимогам, повертаємо помилку
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Сервер запущено");
});
