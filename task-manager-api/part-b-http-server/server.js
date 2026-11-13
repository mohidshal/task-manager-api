// PART B - Server using ONLY the core http module (no Express)
// Run: node part-b-http-server/server.js
// Open: http://localhost:3000

const http = require("http");

const PORT = 3000;

// Our "database" is just an array
let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Learn Express", completed: false },
];
let nextId = 3;

// Small helper so we don't repeat code every time
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(method + " " + url); // log every request

  // ROUTE 1: GET /  -> welcome message
  if (url === "/" && method === "GET") {
    sendJson(res, 200, { message: "Welcome to Task Manager (core http server)" });
  }

  // ROUTE 2: GET /tasks  -> return all tasks
  else if (url === "/tasks" && method === "GET") {
    sendJson(res, 200, tasks);
  }

  // ROUTE 3: POST /tasks  -> add a new task
  else if (url === "/tasks" && method === "POST") {
    let body = "";

    // Body comes in small pieces (chunks), so we collect them
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // 'end' event = all pieces received
    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.title) {
          return sendJson(res, 400, { error: "title is required" });
        }

        const newTask = { id: nextId++, title: data.title, completed: false };
        tasks.push(newTask);
        sendJson(res, 201, newTask);
      } catch (error) {
        // JSON.parse crashes if body is not valid JSON
        sendJson(res, 400, { error: "Invalid JSON" });
      }
    });
  }

  // ROUTE 4: GET /about  -> extra route
  else if (url === "/about" && method === "GET") {
    sendJson(res, 200, { app: "Task Manager", version: "1.0.0" });
  }
    // ROUTE 5: GET /tasks/1  -> get one task by id
  else if (url.startsWith("/tasks/") && method === "GET") {
    const id = Number(url.split("/")[2]);
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return sendJson(res, 404, { error: "Task not found" });
    }

    sendJson(res, 200, task);
  }

  // Anything else -> 404
  else {
    sendJson(res, 404, { error: "Route not found" });
  }
});

server.listen(PORT, () => {
  console.log("HTTP server running on http://localhost:" + PORT);
});
