# DevTodo

A TUI todo app for software developers. It uses
[Conventional Git Commit Messages]() syntax. It is written using
[Ink](https://github.com/vadimdemedes/ink) and
[Bun](https://github.com/oven-sh/bun). 

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
![Input field with text](./images/input-with-text.jpg)

Every new todo item is added to the list below the input field.

![Todo list with an item](./images/list-with-one-item.jpg)

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

![Focused todo item](./images/focused-list.jpg)

#### Navigation

- Moving down: press `tab`, `downArrow`, or `j` (Vim motion).
- Moving up: press `shift` + `tab`, `upArrow`, or `k` (Vim motion).

#### Update

You can update the status of the current todo item by pressing `u`. If the todo
item is not completed, it will marked as completed. If the todo item is 
completed, its status will be reset.

![List with completed todo item](./images/list-with-completed-todo-item.jpg)

#### Delete

You can delete the current todo item by pressing `d`.

## Configuration

You can configure a custom file for storing todo items. The default file used is
stored in the same location as the location of the app. The default filename is 
`todos.json`. To configure a custom file, set the environment variable 
`DEV_TODO` to the desired file location. The directory in which the file is 
stored has to exist before attempting to store items there.

### Example

On linux you can use the following configuration in `.bashrc`:

```sh
DEV_TODO=~/Documents/todos.json
```

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
