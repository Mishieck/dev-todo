# DevTodo

A TUI todo app for software developers. It uses
[Conventional Git Commit Messages]() syntax. It is written using
[Ink](https://github.com/vadimdemedes/ink) and
[Bun](https://github.com/oven-sh/bun). 

![App](https://github.com/user-attachments/assets/af20d4fc-f357-4412-820f-ef7da774ac1b)

## Installation

You can install the app using NPM. Run the following command to install:

```sh
npm i -g @mishieck/dev-todo
```

## Usage

### Running

You can run the app using the following command:

```sh
dev-todo
```

### Input

#### Add Todo

Enter text into the input field and press enter to submit. 
![Input field with text](https://github.com/user-attachments/assets/566ebc12-58f9-4b34-bf82-3e0e469273e2)

Every new todo item is added to the list below the input field.

![Todo list with an item](https://github.com/user-attachments/assets/59707d5a-9e58-4e95-892a-57576a247811)

#### Moving to the Todo List

Moving to the list will cause the input field to lose focus. This is indicated
by a dim border on the input.

To move to the first item in the list, do any of the following:

- press `tab`.
- press `downArrow`.
- Use Vim motions:
  - Press `esc`, or `ctrl` + `[` to make the input field lose focus.
  - Press `j`.

To move to the last item in the list, do any of the following:

- press `shift` + `tab`.
- press `upArrow`.
- Use Vim motions:
  - Press `esc`, or `ctrl` + `[` to make the input field lose focus.
  - Press `k`.

### Todo List

The currently focused todo item in the list will be underlined. When any item
in the todo list is focused, the todo list border will be bright, otherwise it
will be dim.

![Focused todo item](https://github.com/user-attachments/assets/25a968e8-8186-48dd-ad23-7ced64bcaf5a)

#### Navigation

- Moving down: press `tab`, `downArrow`, or `j` (Vim motion).
- Moving up: press `shift` + `tab`, `upArrow`, or `k` (Vim motion).

#### Update

You can update the status of the current todo item by pressing `u`. If the todo
item is not completed, it will marked as completed. If the todo item is 
completed, its status will be reset.

![List with completed todo item](https://github.com/user-attachments/assets/d0cdc1b5-71e5-4da1-971c-3b504fbfdbed)

#### Delete

You can delete the current todo item by pressing `d`.

## Conventional Git Commit Messages Syntax

Only single-line syntax is supported. The following syntax is used:

```
action(category): content
```

where

- `action` (optional): is any action associated with the todo item. In addition
  to the actions used in conventional commit messages, custom actions are 
  allowed. For example, if you would like to add a feature to a project, you can
  use `feat` as the action.
- `category` (optional): this is the category to which the todo item belongs.
  For example, you can use a project name and a project entity as the contents
  of a category. If you are working on a web app, for example, the category may
  be `portfolio/landing-page/header`.
- `content` (required): a description of the todo item. You can use any
  description format you like.

### Examples

The following todo item text are all valid:

- Only `content`: `Create portfolio website`
- With `action`: `feat: Update header hero on landing page of portfolio website`
- Width `action` and `category`: `fix(portfolio/landing-page/navbar): Hide social media links on mobile`

## Configuration

You can configure the path to the todo list file and colors associated with each
action. To configure a file, set the environment variable `DEV_TODO_CONFIG` to
the configuration file location. The file is a JSON file with the following
properties:

- `todoListFile`: the absolute path to a file that is used to store todo items.
- `actionColors`: the colors for action badges. It is an object where each key
  is an action and the value is an object with the following properties:

  - `background`: the background color of the badge.
  - `foreground`: the foreground color of the badge

  The values are the same as those supported by [chalk](). All properties are
  optional.

### Example

#### Environment Variable

On linux you can use the following configuration in `.bashrc`:

```sh
export DEV_TODO_CONFIG=~/Documents/todos/config.json
```

#### File

The file could contain the following configuration:

```json
{
  "todoListFile": "/home/username/~Documents/todos/todos.json",
  "actionColors": {
    "feat": {
      "background": "magenta", 
      "foreground": "white" 
    },
    "fix": {
      "background": "red", 
      "foreground": "white" 
    },
    "test": {
      "background": "yellow", 
      "foreground": "black" 
    }
  }
}
```
