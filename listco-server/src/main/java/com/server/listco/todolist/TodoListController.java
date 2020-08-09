package com.server.listco.todolist;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TodoListController {

    private final TodoListService todoListService;

    @PutMapping("/createTodoItem/{todoListId}")
    public ResponseEntity<TodoItem> createTodoItem(@PathVariable(value = "todoListId") Number todoListId) {
        Optional<TodoItem> todoItem = todoListService.createTodoItem(todoListId);
        if (todoItem.isPresent()) {
            System.out.println("Created todo item with ID " + todoItem.get().getId() + " on list " + todoListId);
            return new ResponseEntity<>(todoItem.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/removeTodoItem/{todoItemToRemoveId}/{todoListId}")
    public ResponseEntity removeTodoItem(@PathVariable(value = "todoItemToRemoveId") Number todoItemToRemoveId,
                                         @PathVariable(value = "todoListId") Number todoListId) {

        todoListService.removeTodoItem(todoItemToRemoveId, todoListId);
        System.out.println("Removed todo item");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/updateTodoItemText")
    public ResponseEntity updateTodoItemText(@RequestBody TodoItem todoItem) {

        Optional<TodoItem> updatedTodoItem = todoListService.updateTodoItemText(todoItem);
        if(updatedTodoItem.isPresent()) {
            System.out.println("Updated text of todo item" + todoItem.getId());
            return new ResponseEntity(updatedTodoItem.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/updateTodoItemCompletedStatus")
    public ResponseEntity updateTodoItemCompletedStatus(@RequestBody TodoItem todoItem) {

        Optional<TodoItem> updatedTodoItem = todoListService.updateTodoItemCompletedStatus(todoItem);
        if(updatedTodoItem.isPresent()) {
            System.out.println("Updated completed status of todo item" + todoItem.getId());
            return new ResponseEntity(updatedTodoItem.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/createTodoList")
    public ResponseEntity<TodoList> createTodoList() throws SQLException {
        Optional<TodoList> todoList = todoListService.createTodoList();
        System.out.println("Created todo list: " + todoList);
        if (todoList.isPresent()) {
            return new ResponseEntity<>(todoList.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getTodoList")
    public ResponseEntity<TodoList> getTodoList(@PathVariable(value = "listId") Number listId) {
        Optional<TodoList> todoList = todoListService.getTodoList(listId);
        System.out.println("Retrieved todo list: " + todoList);
        if(todoList.isPresent()) {
            return new ResponseEntity<>(todoList.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}