#!/usr/bin/env node

const fs = require("fs");

const FILE = "tasks.json";

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];


function readTasks() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify([]));
  }

  const data = fs.readFileSync(FILE);
  return JSON.parse(data);
}


function saveTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}


function addTask(description) {
  if (!description) {
    console.log("Please provide a task description.");
    return;
  }

  const tasks = readTasks();

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    description: description,
    status: "todo",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  tasks.push(newTask);
  saveTasks(tasks);

  console.log(`Task added successfully (ID: ${newTask.id})`);
}


function listTasks(status) {
  const tasks = readTasks();

  let filteredTasks = tasks;

  if (status) {
    filteredTasks = tasks.filter(task => task.status === status);
  }

  if (filteredTasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  filteredTasks.forEach(task => {
    console.log(`${task.id} | ${task.status} | ${task.description}`);
  });
}

function updateTask(id, description) {
  if (!id || !description) {
    console.log("Usage: update <id> <new description>");
    return;
  }

  const tasks = readTasks();

  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("Task not found.");
    return;
  }

  task.description = description;
  task.updatedAt = new Date();

  saveTasks(tasks);

  console.log("Task updated successfully.");
}


function deleteTask(id) {
  if (!id) {
    console.log("Please provide a task ID.");
    return;
  }

  const tasks = readTasks();

  const newTasks = tasks.filter(t => t.id != id);

  if (tasks.length === newTasks.length) {
    console.log("Task not found.");
    return;
  }

  saveTasks(newTasks);

  console.log("Task deleted successfully.");
}


function markInProgress(id) {
  const tasks = readTasks();

  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("Task not found.");
    return;
  }

  task.status = "in-progress";
  task.updatedAt = new Date();

  saveTasks(tasks);

  console.log("Task marked as in progress.");
}

function markDone(id) {
  const tasks = readTasks();

  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("Task not found.");
    return;
  }

  task.status = "done";
  task.updatedAt = new Date();

  saveTasks(tasks);

  console.log("Task marked as done.");
}


switch (command) {
  case "add":
    addTask(arg1);
    break;

  case "list":
    listTasks(arg1);
    break;

  case "update":
    updateTask(arg1, arg2);
    break;

  case "delete":
    deleteTask(arg1);
    break;

  case "mark-in-progress":
    markInProgress(arg1);
    break;

  case "mark-done":
    markDone(arg1);
    break;

  default:
    console.log("Invalid command.");
}