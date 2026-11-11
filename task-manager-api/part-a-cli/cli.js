// PART A - Command line tool
// Run:  node part-a-cli/cli.js "Buy milk"
// Run:  node part-a-cli/cli.js "Finish homework" high

// process.argv is an array:
// [0] = path of node, [1] = path of this file, [2...] = our arguments
const title = process.argv[2];
const priority = process.argv[3] || "normal";

// If user did not give a title, show how to use the tool
if (!title) {
  console.log("Please give a task title!");
  console.log('Usage: node part-a-cli/cli.js "Task title" [priority]');
  console.log('Example: node part-a-cli/cli.js "Buy milk" high');
  process.exit(1); // 1 means there was an error
}

// Create a task object (same shape we use in the API)
const task = {
  id: 1,
  title: title,
  priority: priority,
  completed: false,
  createdAt: new Date().toISOString(),
};

console.log("Task created successfully!");
console.log("-------------------------");
console.log("ID       :", task.id);
console.log("Title    :", task.title);
console.log("Priority :", task.priority);
console.log("Completed:", task.completed);
console.log("Created  :", task.createdAt);
