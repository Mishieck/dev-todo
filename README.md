# InkBunTodo

A TUI todo app written using [Ink](https://github.com/vadimdemedes/ink) and
[Bun](https://github.com/oven-sh/bun).

## Installation

## Usage

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

