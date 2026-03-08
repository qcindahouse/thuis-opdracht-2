# Task Tracker CLI

This project is a simple command line program that helps you keep track of your tasks.
You can add tasks, update them, delete them, and mark them as done or in progress.

The tasks are saved in a file called `tasks.json` so they stay saved even after closing the program.

## Requirements

You need **Node.js** installed on your computer.

Check if Node.js is installed by running:

node -v

If it is not installed, download it from https://nodejs.org

## How to Run the Program

Open your terminal and go to the project folder.

Example:

cd task-tracker-cli

Run commands using:

node task-cli.js

## Commands

### Add a Task

node task-cli.js add "Buy groceries"

### List All Tasks

node task-cli.js list

### Update a Task

node task-cli.js update 1 "Buy groceries and cook dinner"

### Delete a Task

node task-cli.js delete 1

### Mark a Task as In Progress

node task-cli.js mark-in-progress 1

### Mark a Task as Done

node task-cli.js mark-done 1

### List Tasks by Status

Show completed tasks:

node task-cli.js list done

Show tasks not started:

node task-cli.js list todo

Show tasks in progress:

node task-cli.js list in-progress

## Task File

All tasks are saved in `tasks.json`.

Each task has:

* id
* description
* status
* createdAt
* updatedAt

Example:

{
"id": 1,
"description": "Buy groceries",
"status": "todo"
}

## Summary

This program allows you to manage tasks from the command line and store them in a JSON file.

https://roadmap.sh/projects/task-tracker