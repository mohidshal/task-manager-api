// PART C + D - Express REST API
// Run: npm start
// Base URL: http://localhost:3000/api/v1/tasks

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware: lets Express read JSON from request body (req.body)
app.use(express.json());

// Our "database" (resets every time server restarts)
let tasks = [
  { id: 1, title: "Learn Node.js", description: "Finish week 1", completed: true },
  { id: 2, title: "Learn Express", description: "Build REST API", completed: false },
];
let nextId = 3;

// Home route (just to check server works)
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running. Use /api/v1/tasks" });
});

// ---------------------------------------------------------
// GET /api/v1/tasks  -> get all tasks (200)
// Optional filter: /api/v1/tasks?completed=true
// ---------------------------------------------------------
app.get("/api/v1/tasks", (req, res) => {
  const completed = req.query.completed; // comes as a string

  if (completed === "true") {
    return res.status(200).json(tasks.filter((t) => t.completed === true));
  }
  if (completed === "false") {
    return res.status(200).json(tasks.filter((t) => t.completed === false));
  }

  res.status(200).json(tasks);
});

// ---------------------------------------------------------
// GET /api/v1/tasks/:id  -> get one task (200 or 400 or 404)
// ---------------------------------------------------------
app.get("/api/v1/tasks/:id", (req, res) => {
  const id = Number(req.params.id); // params are always strings

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
});

// ---------------------------------------------------------
// POST /api/v1/tasks  -> create a task (201 or 400)
// ---------------------------------------------------------
app.post("/api/v1/tasks", (req, res) => {
  const { title, description } = req.body;

  // Validation: title must exist and must be a non-empty string
  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "title is required" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description || "",
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask); // 201 = Created
});

// ---------------------------------------------------------
// PUT /api/v1/tasks/:id  -> update a task (200, 400, 404)
// ---------------------------------------------------------
app.put("/api/v1/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const { title, description, completed } = req.body;

  // Validate only the fields that were sent
  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    return res.status(400).json({ error: "title must be a non-empty string" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "completed must be true or false" });
  }

  // Update only what the user sent
  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
});

// ---------------------------------------------------------
// DELETE /api/v1/tasks/:id  -> delete a task (200, 400, 404)
// ---------------------------------------------------------
app.delete("/api/v1/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deleted = tasks.splice(index, 1)[0]; // remove 1 item at index

  res.status(200).json({ message: "Task deleted", task: deleted });
});

// Unknown routes -> 404 (must be AFTER all other routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log("Express API running on http://localhost:" + PORT);
});
